import pool from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { name, email, phone, company, subject, message, preferred_date, preferred_time } = body

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Nome e email obrigatórios' })
  }

  await pool.query(
    `UPDATE meeting_requests 
    SET preferred_date = ?, preferred_time = ?, status = 'pending', 
        admin_response = NULL, responded_at = NULL, viewed_at = NULL
    WHERE id = ?`,
    [preferred_date, preferred_time, id]
  )

  return { ok: true }
})