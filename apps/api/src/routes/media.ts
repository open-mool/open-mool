import { Context } from 'hono'

interface Env {
    DB: D1Database
}

export const getMyUploads = async (c: Context<{ Bindings: Env }>) => {
    try {
        // TODO: Add proper auth when implementing user authentication
        // For now, return all media (will be secured later)

        const { results } = await c.env.DB.prepare(
            `SELECT * FROM media ORDER BY created_at DESC LIMIT 50`
        ).all()

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
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
