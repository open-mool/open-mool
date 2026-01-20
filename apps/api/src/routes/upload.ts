import { Hono } from 'hono'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { authMiddleware, getAuthUserId } from '../middleware/auth'

type Bindings = {
    DB: D1Database
    STORAGE: R2Bucket
    R2_ACCOUNT_ID: string
    R2_ACCESS_KEY_ID: string
    R2_SECRET_ACCESS_KEY: string
    AUTH0_DOMAIN: string
    AUTH0_AUDIENCE: string
}

const upload = new Hono<{ Bindings: Bindings }>()

upload.use('/complete', authMiddleware())

// Generate Presigned URL
upload.post('/presigned', async (c) => {
    const { filename, contentType } = await c.req.json()

    if (!filename || !contentType) {
        return c.json({ error: 'Missing filename or contentType' }, 400)
    }

    const accountId = c.env.R2_ACCOUNT_ID
    const accessKeyId = c.env.R2_ACCESS_KEY_ID
    const secretAccessKey = c.env.R2_SECRET_ACCESS_KEY

    if (!accountId || !accessKeyId || !secretAccessKey) {
        return c.json({ error: 'R2 credentials not configured' }, 500)
    }

    const S3 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    })

    // Use a unique key to prevent collisions
    const key = `${crypto.randomUUID()}-${filename}`

    const command = new PutObjectCommand({
        Bucket: 'open-mool-storage',
        Key: key,
        ContentType: contentType,
    })

    // Expires in 1 hour
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 })

    return c.json({ url, key })
})

// Complete Upload (Save Metadata)
upload.post('/complete', async (c) => {
    const { key, title, description, language, location } = await c.req.json()

    if (!key || !title) {
        return c.json({ error: 'Missing required fields' }, 400)
    }

    const userId = getAuthUserId(c)
    if (!userId) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    try {
        const { success } = await c.env.DB.prepare(
            `INSERT INTO media (key, title, description, language, location_lat, location_lng, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            key,
            title,
            description,
            language,
            location?.lat || null,
            location?.lng || null,
            new Date().toISOString(),
            userId
        ).run()

        if (!success) {
            return c.json({ error: 'Failed to save metadata' }, 500)
        }

        return c.json({ success: true })
    } catch (e) {
        console.error(e)
        return c.json({ error: 'Database error' }, 500)
    }
})

// Multipart Upload: Create
upload.post('/multipart/create', async (c) => {
    const { filename, contentType } = await c.req.json()
    const key = `${Date.now()}-${filename}`

    try {
        const multipartUpload = await c.env.STORAGE.createMultipartUpload(key, {
            httpMetadata: {
                contentType: contentType || 'application/octet-stream'
            }
        })

        return c.json({
            uploadId: multipartUpload.uploadId,
            key
        })
    } catch (error) {
        console.error('Failed to create multipart upload:', error)
        return c.json({ error: 'Failed to initiate multipart upload' }, 500)
    }
})

// Multipart Upload: Upload Part
upload.put('/multipart/:uploadId/part', async (c) => {
    const { uploadId } = c.req.param()
    const { partNumber, key } = await c.req.json()
    const body = await c.req.arrayBuffer()

    if (!body || body.byteLength === 0) {
        return c.json({ error: 'Empty part body' }, 400)
    }

    try {
        const multipartUpload = c.env.STORAGE.resumeMultipartUpload(key, uploadId)
        const uploadedPart = await multipartUpload.uploadPart(partNumber, body)

        return c.json({
            partNumber,
            etag: uploadedPart.etag
        })
    } catch (error) {
        console.error('Failed to upload part:', error)
        return c.json({ error: 'Failed to upload part' }, 500)
    }
})

// Multipart Upload: Complete
upload.post('/multipart/:uploadId/complete', async (c) => {
    const { uploadId } = c.req.param()
    const { key, parts } = await c.req.json()

    if (!parts || !Array.isArray(parts)) {
        return c.json({ error: 'Parts array required' }, 400)
    }

    try {
        const multipartUpload = c.env.STORAGE.resumeMultipartUpload(key, uploadId)
        await multipartUpload.complete(parts)

        return c.json({
            key,
            success: true
        })
    } catch (error) {
        console.error('Failed to complete multipart upload:', error)
        return c.json({ error: 'Failed to complete upload' }, 500)
    }
})

// Multipart Upload: Abort
upload.delete('/multipart/:uploadId/abort', async (c) => {
    const { uploadId } = c.req.param()
    const { key } = await c.req.json()

    try {
        const multipartUpload = c.env.STORAGE.resumeMultipartUpload(key, uploadId)
        await multipartUpload.abort()

        return c.json({ success: true })
    } catch (error) {
        console.error('Failed to abort multipart upload:', error)
        return c.json({ error: 'Failed to abort upload' }, 500)
    }
})

export default upload
