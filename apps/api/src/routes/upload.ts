import { Hono } from 'hono'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { authMiddleware, getAuthUserId } from '../middleware/auth'
import { processMedia } from '../lib/refinery'

type Bindings = {
    DB: D1Database
    STORAGE: R2Bucket
    VECTOR_INDEX: VectorizeIndex
    AI: any
    R2_ACCOUNT_ID: string
    R2_ACCESS_KEY_ID: string
    R2_SECRET_ACCESS_KEY: string
    AUTH0_DOMAIN: string
    AUTH0_AUDIENCE: string
    R2_BUCKET_NAME: string
    API_SECRET?: string
    GEMINI_API_KEY?: string
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
        Bucket: c.env.R2_BUCKET_NAME,
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
        const mediaRecord = await c.env.DB.prepare(
            `INSERT INTO media (key, title, description, language, location_lat, location_lng, user_id, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             RETURNING id`
        ).bind(
            key,
            title,
            description,
            language,
            location?.lat || null,
            location?.lng || null,
            userId,
            new Date().toISOString()
        ).first<{ id: number }>()

        if (!mediaRecord) {
            return c.json({ error: 'Failed to save metadata' }, 500)
        }

        // --- THE REFINERY: Background AI Processing Pipeline ---
        // Trigger background processing and return early
        c.executionCtx.waitUntil(
            processMedia(
                mediaRecord.id,
                key,
                title,
                description,
                userId,
                {
                    DB: c.env.DB,
                    STORAGE: c.env.STORAGE,
                    VECTOR_INDEX: c.env.VECTOR_INDEX,
                    AI: c.env.AI,
                    GEMINI_API_KEY: c.env.GEMINI_API_KEY
                }
            )
        )

        return c.json({ success: true, id: mediaRecord.id })
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
    const partNumber = parseInt(c.req.query('partNumber') || '0', 10)
    const key = c.req.query('key')

    // Check if metadata is valid
    if (!partNumber || !key) {
        return c.json({ error: 'Missing partNumber or key in query params' }, 400)
    }

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