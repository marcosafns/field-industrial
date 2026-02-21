import pool from '../../../utils/db'
import { verifyToken } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  const payload = token ? verifyToken(token) as any : null
  if (!payload) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  const { admin_id } = await readBody(event)

  const finalId = admin_id === 'me' ? payload.id : admin_id

  await pool.query(
    'UPDATE meeting_requests SET assigned_to = ?, assigned_at = NOW() WHERE id = ?',
    [finalId, id]
  )
  return { ok: true }
})