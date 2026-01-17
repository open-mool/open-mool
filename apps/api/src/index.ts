import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth0Webhook } from './webhooks/auth0'
import upload from './routes/upload'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Open Mool API is running', status: 'healthy' })
})

app.post('/webhooks/auth0', auth0Webhook)

app.use('/*', cors())
app.route('/upload', upload)

export default app
