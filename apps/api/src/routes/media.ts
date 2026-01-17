import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq, desc } from 'drizzle-orm'
import { getSession } from '@auth0/nextjs-auth0/edge'

interface Env {
    DB: D1Database
}

// Create a media table schema for querying
// This mirrors the schema from packages/db but adapted for API use
const media = {
    id: 'id',
    key: 'key',
    title: 'title',
    description: 'description',
    language: 'language',
    location_lat: 'location_lat',
    location_lng: 'location_lng',
    user_id: 'user_id',
    created_at: 'created_at',
    processed: 'processed',
}

export const getMyUploads = async (c: Context<{ Bindings: Env }>) => {
    try {
        // Get authenticated user from Auth0
        const session = await getSession()

        if (!session || !session.user) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const userId = session.user.sub // Auth0 user ID

        const db = drizzle(c.env.DB)

        // Query media table for user's uploads
        const uploads = await db
            .select()
            .from('media')
            .where(`user_id = ?`, [userId])
            .orderBy('created_at DESC')
            .all()

        return c.json({
            uploads,
            count: uploads.length,
        })
    } catch (error) {
        console.error('Failed to fetch uploads:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
