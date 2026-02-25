import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import pool from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const {
    name, email, phone, company, subject, message,
    preferred_date, preferred_time,
    service_type, cnpj, role, city_state,
    urgency, equipment_type,
  } = body

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Nome e email obrigatórios' })
  }

  await pool.query(
    `UPDATE meeting_requests SET
      preferred_date = ?, preferred_time = ?,
      service_type = ?, cnpj = ?, role = ?,
      city_state = ?, urgency = ?, equipment_type = ?,
      subject = ?, message = ?,
      status = 'pending', admin_response = NULL,
      responded_at = NULL, viewed_at = NULL
    WHERE id = ?`,
    [
      preferred_date || null, preferred_time || null,
      service_type || 'meeting', cnpj || null, role || null,
      city_state || null, urgency || 'low', equipment_type || null,
      subject, message, id,
    ]
  )

  return { ok: true }
})