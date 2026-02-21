import pool from '../../utils/db'
import { verifyToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const [rows] = await pool.query('SELECT id, name, email FROM admins') as any
  return rows
})