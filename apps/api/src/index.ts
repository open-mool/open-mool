import { Hono } from 'hono'
import { cors } from 'hono/cors'
import upload from './routes/upload'
import { getExploreMedia, getMyUploads, getMediaCount, searchMedia, getPublicMedia, serveMedia, getMediaById } from './routes/media'
import { authMiddleware } from './middleware/auth'
import { adminAuthMiddleware, adminListMedia, adminApproveMedia, adminRejectMedia, adminDeleteMedia, adminBackfillEmbeddings } from './routes/admin'

type Bindings = {
  R2_BUCKET_NAME: string
  DB: D1Database
  STORAGE: R2Bucket
  VECTOR_INDEX: VectorizeIndex
  AI: any
  GEMINI_API_KEY?: string
  API_SECRET?: string
  INTERNAL_PROXY_SIGNING_SECRET?: string
  CLERK_JWKS_URL?: string
  CLERK_ISSUER?: string
  CLERK_AUDIENCE?: string
  ADMIN_USER_IDS?: string
  LOCAL_DEV_AUTH_BYPASS?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())

app.get('/', (c) => {
  const isStaging = c.env.R2_BUCKET_NAME?.includes('staging');
  return c.json({
    message: 'Open Mool API is running',
    status: 'healthy',
    mode: isStaging ? 'remote (staging)' : 'local (emulated)',
    bucket: c.env.R2_BUCKET_NAME
  })
})

// Public discovery endpoints
app.get('/media/explore', getExploreMedia)
app.get('/api/media/explore', getPublicMedia)
app.get('/api/media/file/:key', serveMedia)
app.get('/api/media/search', searchMedia)
app.get('/api/media/:id', getMediaById)

// Protected API routes
app.use('/api/*', authMiddleware())
app.get('/api/media/my-uploads', getMyUploads)
app.get('/api/media/count', getMediaCount)

app.route('/upload', upload)

// Admin routes (auth + admin role required)
app.use('/api/admin/*', authMiddleware())
app.use('/api/admin/*', adminAuthMiddleware())
app.get('/api/admin/media', adminListMedia)
app.patch('/api/admin/media/:id/approve', adminApproveMedia)
app.patch('/api/admin/media/:id/reject', adminRejectMedia)
app.delete('/api/admin/media/:id', adminDeleteMedia)
app.post('/api/admin/backfill', adminBackfillEmbeddings)

export default app
