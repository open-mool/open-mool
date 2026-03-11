import { Context } from 'hono'
import { getWorkersAiEmbedding } from '../lib/embeddings'
import { getAuthUserId } from '../middleware/auth'
import { parseArchiveMetadata } from '../lib/parser'

interface Env {
    DB: D1Database
    STORAGE: R2Bucket
    VECTOR_INDEX: VectorizeIndex
    AI: any
    API_SECRET?: string
}

type MediaRow = {
    id: number
    key: string
    title: string
    description: string | null
    language: string | null
    location_lat: number | null
    location_lng: number | null
    created_at: string
    processed: number | boolean
    user_id: string | null
    transcription: string | null
}

const enrichMediaRow = (row: MediaRow) => {
    const ai = parseArchiveMetadata({
        key: row.key,
        title: row.title,
        description: row.description,
        transcription: row.transcription,
        language: row.language,
    })

    return {
        ...row,
        processed: Boolean(row.processed),
        ai,
    }
}

export const getMyUploads = async (c: Context<{ Bindings: Env }>) => {
    try {
        const userId = getAuthUserId(c)

        if (!userId) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const { results } = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription, deities, places, botanicals
             FROM media
             WHERE user_id = ?
             ORDER BY created_at DESC
             LIMIT 50`
        ).bind(userId).all<MediaRow>()

        const uploads = (results || []).map(enrichMediaRow)

        return c.json({
            uploads,
            count: uploads.length,
        })
    } catch (error) {
        console.error('Failed to fetch uploads:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const getMediaCount = async (c: Context<{ Bindings: Env }>) => {
    try {
        const userId = getAuthUserId(c)

        if (!userId) {
            return c.json({ error: 'Unauthorized' }, 401)
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

        const ai = c.env.AI
        if (!ai) {
            return c.json({ error: 'Search is currently unavailable' }, 503)
        }

        const embedding = await getWorkersAiEmbedding(query, ai)

        const vectorResults = await c.env.VECTOR_INDEX.query(embedding, {
            topK: 10,
            returnValues: false,
            returnMetadata: true,
        })

        if (vectorResults.matches.length === 0) {
            return c.json({ results: [] })
        }

        const ids = vectorResults.matches.map((match) => Number.parseInt(match.id, 10))
        const placeholders = ids.map(() => '?').join(',')

        const { results } = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription
             FROM media
             WHERE id IN (${placeholders})`
        ).bind(...ids).all<MediaRow>()

        const sortedResults = (results || []).sort((left, right) => {
            const scoreA = vectorResults.matches.find((match) => Number.parseInt(match.id, 10) === left.id)?.score || 0
            const scoreB = vectorResults.matches.find((match) => Number.parseInt(match.id, 10) === right.id)?.score || 0
            return scoreB - scoreA
        }).map(enrichMediaRow)

        return c.json({
            results: sortedResults,
            count: sortedResults.length,
        })
    } catch (error: any) {
        console.error('Search failed:', error)
        return c.json({ error: error.message || 'Internal Server Error', stack: error.stack }, 500)
    }
}

export const getExploreMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const query = (c.req.query('q') || '').trim()
        const language = (c.req.query('language') || '').trim().toLowerCase()
        const mediaType = (c.req.query('mediaType') || '').trim().toLowerCase()
        const page = Math.max(1, Number.parseInt(c.req.query('page') || '1', 10) || 1)
        const limit = Math.min(48, Math.max(1, Number.parseInt(c.req.query('limit') || '24', 10) || 24))

        const params: Array<string | number> = []
        const whereClauses: string[] = ['processed = 1']

        if (language) {
            whereClauses.push('LOWER(language) = ?')
            params.push(language)
        }

        if (query) {
            whereClauses.push('(LOWER(title) LIKE ? OR LOWER(COALESCE(description, "")) LIKE ? OR LOWER(COALESCE(transcription, "")) LIKE ?)')
            const likeQuery = `%${query.toLowerCase()}%`
            params.push(likeQuery, likeQuery, likeQuery)
        }

        const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''
        const offset = (page - 1) * limit

        const { results } = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription
             FROM media
             ${whereSql}
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?`
        ).bind(...params, limit + 12, offset).all<MediaRow>()

        let enrichedResults = (results || []).map(enrichMediaRow)

        if (mediaType) {
            enrichedResults = enrichedResults.filter((item) => item.ai.mediaType === mediaType)
        }

        const finalResults = enrichedResults.slice(0, limit)

        return c.json({
            results: finalResults,
            page,
            limit,
            hasMore: enrichedResults.length > limit,
            count: finalResults.length,
        })
    } catch (error) {
        console.error('Explore fetch failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const getPublicMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
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
        headers.set('Cache-Control', 'public, max-age=31536000')

        return new Response(object.body, {
            headers,
        })
    } catch (error) {
        console.error('Failed to serve media:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const getMediaById = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = Number.parseInt(c.req.param('id'), 10)
        if (Number.isNaN(id)) {
            return c.json({ error: 'Invalid media ID' }, 400)
        }

        const row = await c.env.DB.prepare(
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id, transcription, deities, places, botanicals
             FROM media
             WHERE id = ? AND processed = 1`
        ).bind(id).first<MediaRow>()

        if (!row) {
            return c.json({ error: 'Media not found' }, 404)
        }

        return c.json({
            media: enrichMediaRow(row)
        })
    } catch (error) {
        console.error('Failed to fetch media by id:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
