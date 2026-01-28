import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth0Webhook } from './webhooks/auth0'
import upload from './routes/upload'
import { getMyUploads, getMediaCount, searchMedia, getPublicMedia, serveMedia } from './routes/media'

type Bindings = {
  R2_BUCKET_NAME: string
  DB: D1Database
  STORAGE: R2Bucket
  VECTOR_INDEX: VectorizeIndex
  AI: any
  GEMINI_API_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  const isStaging = c.env.R2_BUCKET_NAME?.includes('staging');
  return c.json({
    message: 'Open Mool API is running',
    status: 'healthy',
    mode: isStaging ? 'remote (staging)' : 'local (emulated)',
    bucket: c.env.R2_BUCKET_NAME
  })
})

app.post('/webhooks/auth0', auth0Webhook)
app.get('/api/media/my-uploads', getMyUploads)
app.get('/api/media/count', getMediaCount)
app.get('/api/media/search', searchMedia)
app.get('/api/media/explore', getPublicMedia)
app.get('/api/media/file/:key', serveMedia)

app.use('/*', cors())
app.route('/upload', upload)

export default app
