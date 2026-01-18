import { Context } from 'hono'

interface Env {
    DB: D1Database
    API_SECRET?: string
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
            `SELECT id, key, title, description, language, location_lat, location_lng, created_at, processed, user_id
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
