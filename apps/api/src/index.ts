import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth0Webhook } from './webhooks/auth0'
import upload from './routes/upload'
import { getMyUploads, getMediaCount } from './routes/media'

type Bindings = {
  R2_BUCKET_NAME: string
  DB: D1Database
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
app.get('/media/my-uploads', getMyUploads)
app.get('/media/count', getMediaCount)

app.use('/*', cors())
app.route('/upload', upload)

export default app
