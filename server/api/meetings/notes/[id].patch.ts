import pool from '../../../utils/db'
import { verifyToken } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  const { internal_notes } = await readBody(event)

  await pool.query(
    'UPDATE meeting_requests SET internal_notes = ? WHERE id = ?',
    [internal_notes, id]
  )
  return { ok: true }
})