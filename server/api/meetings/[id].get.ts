import { verifyToken } from '../../utils/auth'
import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const id = getRouterParam(event, 'id')
  const [rows] = await pool.query('SELECT * FROM meeting_requests WHERE id = ?', [id]) as any

  if (!rows[0]) throw createError({ statusCode: 404, message: 'Não encontrado' })

  return rows[0]
})