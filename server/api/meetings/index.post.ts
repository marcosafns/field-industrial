import pool from '../../utils/db'

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'FI-'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, phone, company, subject, message, preferred_date, preferred_time } = body

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Nome e email obrigatórios' })
  }

  const id = generateId()

  await pool.query(
    `INSERT INTO meeting_requests (id, name, email, phone, company, subject, message, preferred_date, preferred_time)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, email, phone, company, subject, message, preferred_date, preferred_time]
  )

  return { ok: true, id }
})