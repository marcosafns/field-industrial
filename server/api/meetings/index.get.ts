import { verifyToken } from '../../utils/auth'
import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const query = getQuery(event)
  const { status, date } = query

  let sql = 'SELECT * FROM meeting_requests WHERE 1=1'
  const params: any[] = []

  if (status) {
    sql += ' AND status = ?'
    params.push(status)
  }

  if (date) {
    sql += ' AND DATE(created_at) = ?'
    params.push(date)
  }

  sql += ' ORDER BY created_at DESC'

  const [rows] = await pool.query(`
    SELECT m.*, a.name as assigned_name 
    FROM meeting_requests m
    LEFT JOIN admins a ON m.assigned_to = a.id
    ORDER BY m.created_at DESC
  `) as any
  return rows
})