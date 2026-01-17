import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Open Mool API is running', status: 'healthy' })
})

export default app
