import pool from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const [rows] = await pool.query(
    'SELECT name, email, phone, company, subject, message FROM meeting_requests WHERE id = ?',
    [id]
  ) as any

  if (!rows[0]) throw createError({ statusCode: 404, message: 'Não encontrado' })

  return rows[0]
})