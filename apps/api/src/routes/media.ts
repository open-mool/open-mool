import { Context } from 'hono'
import { getGeminiEmbedding } from '../lib/embeddings'

interface Env {
    DB: D1Database
    STORAGE: R2Bucket
    VECTOR_INDEX: VectorizeIndex
    AI: any
    API_SECRET?: string
    GEMINI_API_KEY?: string
}

export const getMyUploads = async (c: Context<{ Bindings: Env }>) => {
    try {
        // Extract user ID from custom header
        const userId = c.req.header('x-user-id')

        if (!userId) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        // Validate API secret to ensure request is from trusted Next.js proxy
        const apiSecret = c.req.header('x-api-secret')
        const expectedSecret = c.env.API_SECRET
        
        if (expectedSecret && apiSecret !== expectedSecret) {
            console.warn('API secret mismatch or missing for my-uploads')
            return c.json({ error: 'Unauthorized' }, 401)
        }

        // Select only necessary columns for performance
        const { results } = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription, deities, places, botanicals
             FROM media
             WHERE user_id = ?
             ORDER BY created_at DESC
             LIMIT 50`
        ).bind(userId).all()

        return c.json({
            uploads: results,
            count: results.length,
        })
    } catch (error) {
        console.error('Failed to fetch uploads:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const getMediaCount = async (c: Context<{ Bindings: Env }>) => {
    try {
        const userId = c.req.query('userId')

        if (!userId) {
            return c.json({ error: 'userId is required' }, 400)
        }

        const result = await c.env.DB.prepare(
            `SELECT COUNT(*) as count FROM media WHERE user_id = ?`
        ).bind(userId).first() as { count: number } | undefined

        if (!result) {
            return c.json({ count: 0 })
        }

        return c.json({ count: result.count })
    } catch (error) {
        console.error('Failed to fetch media count:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const searchMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const query = c.req.query('q')
        if (!query) {
            return c.json({ error: 'Query parameter "q" is required' }, 400)
        }

        const geminiApiKey = c.env.GEMINI_API_KEY
        if (!geminiApiKey) {
            return c.json({ error: 'Search is currently unavailable' }, 503)
        }

        // Generate embedding for the query
        const embedding = await getGeminiEmbedding(query, geminiApiKey)

        // Search vector index
        const vectorResults = await c.env.VECTOR_INDEX.query(embedding, {
            topK: 10,
            returnValues: false,
            returnMetadata: true
        })

        if (vectorResults.matches.length === 0) {
            return c.json({ results: [] })
        }

        // Fetch full metadata from D1
        const ids = vectorResults.matches.map(m => parseInt(m.id))
        const placeholders = ids.map(() => '?').join(',')
        
        const { results } = await c.env.DB.prepare(
            `SELECT * FROM media WHERE id IN (${placeholders})`
        ).bind(...ids).all()

        // Sort results by similarity score from vector search
        const sortedResults = results.sort((a: any, b: any) => {
            const scoreA = vectorResults.matches.find(m => parseInt(m.id) === a.id)?.score || 0
            const scoreB = vectorResults.matches.find(m => parseInt(m.id) === b.id)?.score || 0
            return scoreB - scoreA
        })

        return c.json({
            results: sortedResults,
            count: sortedResults.length
        })
    } catch (error) {
        console.error('Search failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const getPublicMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        // Fetch processed media for the public gallery
        // In the future, we could add a 'curated' flag to the schema
        const { results } = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription, deities, places, botanicals
             FROM media
             WHERE processed = 1
             ORDER BY created_at DESC
             LIMIT 40`
        ).all()

        return c.json({
            media: results,
            count: results.length,
        })
    } catch (error) {
        console.error('Failed to fetch public media:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const serveMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const key = c.req.param('key')
        if (!key) {
            return c.json({ error: 'Key is required' }, 400)
        }

        const object = await c.env.STORAGE.get(key)

        if (!object) {
            return c.json({ error: 'Media not found' }, 404)
        }

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cache-Control', 'public, max-age=31536000') // Cache for 1 year

        return new Response(object.body, {
            headers,
        })
    } catch (error) {
        console.error('Failed to serve media:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
