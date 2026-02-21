import pool from '../../../utils/db'
import { verifyToken } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  await pool.query(
    'UPDATE meeting_requests SET viewed_at = NOW() WHERE id = ? AND viewed_at IS NULL',
    [id]
  )
  return { ok: true }
})