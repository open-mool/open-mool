import { Context } from 'hono'
import { getAuthUserId } from '../middleware/auth'

interface Env {
    DB: D1Database
    STORAGE: R2Bucket
    ADMIN_USER_IDS?: string
}

const isAdminUser = (userId: string | null, env: Env): boolean => {
    if (!userId) return false
    const adminIds = (env.ADMIN_USER_IDS || '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
    // In local dev with bypass, allow the dummy user if no admins are configured
    if (adminIds.length === 0 && userId === 'dev_dummy_user') return true
    return adminIds.includes(userId)
}

export const adminAuthMiddleware = () => {
    return async (c: Context<{ Bindings: Env }>, next: () => Promise<void>) => {
        const userId = getAuthUserId(c)
        if (!isAdminUser(userId, c.env)) {
            return c.json({ error: 'Forbidden' }, 403)
        }
        return next()
    }
}

// GET /admin/media — list all media with pagination
export const adminListMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const page = Math.max(1, Number.parseInt(c.req.query('page') || '1', 10) || 1)
        const limit = Math.min(100, Math.max(1, Number.parseInt(c.req.query('limit') || '50', 10) || 50))
        const filter = (c.req.query('filter') || 'all').toLowerCase()
        const offset = (page - 1) * limit

        let processedFilter = ''
        if (filter === 'pending') processedFilter = 'WHERE processed = 0'
        if (filter === 'approved') processedFilter = 'WHERE processed = 1'

        const { results } = await (c.env.DB as any)
            .prepare(
                `SELECT id, key, title, description, language, location_lat, location_lng,
                        created_at, processed, user_id, transcription
                 FROM media
                 ${processedFilter}
                 ORDER BY created_at DESC
                 LIMIT ? OFFSET ?`
            )
            .bind(limit, offset)
            .all()

        const countRow = await (c.env.DB as any)
            .prepare(`SELECT COUNT(*) as total FROM media ${processedFilter}`)
            .first() as { total: number } | null

        return c.json({
            media: results || [],
            total: countRow?.total ?? 0,
            page,
            limit,
        })
    } catch (error) {
        console.error('Admin list failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

// PATCH /admin/media/:id/approve
export const adminApproveMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = Number.parseInt(c.req.param('id'), 10)
        if (Number.isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

        await (c.env.DB as any)
            .prepare('UPDATE media SET processed = 1 WHERE id = ?')
            .bind(id)
            .run()

        return c.json({ success: true, id, processed: true })
    } catch (error) {
        console.error('Admin approve failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

// PATCH /admin/media/:id/reject
export const adminRejectMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = Number.parseInt(c.req.param('id'), 10)
        if (Number.isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

        await (c.env.DB as any)
            .prepare('UPDATE media SET processed = 0 WHERE id = ?')
            .bind(id)
            .run()

        return c.json({ success: true, id, processed: false })
    } catch (error) {
        console.error('Admin reject failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

// DELETE /admin/media/:id
export const adminDeleteMedia = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = Number.parseInt(c.req.param('id'), 10)
        if (Number.isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

        // Fetch the key first so we can delete from R2
        const row = await (c.env.DB as any)
            .prepare('SELECT key FROM media WHERE id = ?')
            .bind(id)
            .first() as { key: string } | null

        if (!row) return c.json({ error: 'Not found' }, 404)

        // Delete from D1
        await (c.env.DB as any)
            .prepare('DELETE FROM media WHERE id = ?')
            .bind(id)
            .run()

        // Best-effort delete from R2 (don't fail if object is missing)
        try {
            await c.env.STORAGE.delete(row.key)
        } catch {
            console.warn(`R2 delete failed for key: ${row.key}`)
        }

        return c.json({ success: true, id })
    } catch (error) {
        console.error('Admin delete failed:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
