import { Hono } from 'hono'
import { cors } from 'hono/cors'
import upload from './routes/upload'
import { getMyUploads, getMediaCount, searchMedia } from './routes/media'
import { authMiddleware } from './middleware/auth'

type Bindings = {
  R2_BUCKET_NAME: string
  DB: D1Database
  VECTOR_INDEX: VectorizeIndex
  AI: any
  GEMINI_API_KEY?: string
  API_SECRET?: string
  INTERNAL_PROXY_SIGNING_SECRET?: string
  CLERK_JWKS_URL?: string
  CLERK_ISSUER?: string
  CLERK_AUDIENCE?: string
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

// Protected API routes
app.use('/api/*', authMiddleware())
app.get('/api/media/my-uploads', getMyUploads)
app.get('/api/media/count', getMediaCount)
app.get('/api/media/search', searchMedia)

app.route('/upload', upload)

export default app
