import { defineEventHandler, setHeader } from 'h3'
import supabase from '../../utils/db'

const clients = new Set<(data: string) => void>()
const lastCheck = new Map<string, string>()

async function pollAndBroadcast() {
  try {
    const { data: rows } = await supabase
      .from('meeting_requests')
      .select('id, name, email, company, subject, status, viewed_at, created_at')
      .order('created_at', { ascending: false })

    if (!rows) return

    const newUnviewed = rows.filter(r => !r.viewed_at).length
    const ids = rows.map(r => `${r.id}:${r.status}:${r.viewed_at}`).join(',')

    if (ids !== lastCheck.get('state')) {
      lastCheck.set('state', ids)
      const payload = JSON.stringify({
        unviewed: newUnviewed,
        meetings: rows,
        timestamp: Date.now(),
      })
      clients.forEach(send => send(`data: ${payload}\n\n`))
    }
  } catch {}
}

setInterval(pollAndBroadcast, 3000)

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'X-Accel-Buffering', 'no')

  const res = event.node.res

  const send = (data: string) => {
    try { res.write(data) } catch {}
  }

  clients.add(send)
  send(`data: ${JSON.stringify({ connected: true })}\n\n`)

  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n') } catch {}
  }, 15000)

  res.on('close', () => {
    clients.delete(send)
    clearInterval(heartbeat)
  })

  await new Promise(() => {})
})