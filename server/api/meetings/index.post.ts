import { defineEventHandler, readBody, createError } from 'h3'
import supabase from '../../utils/db'

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
  const {
    name, email, phone, company, subject, message,
    preferred_date, preferred_time,
    service_type, cnpj, role, city_state,
    urgency, equipment_type,
  } = body

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Nome e email obrigatórios' })
  }

  const id = generateId()

  const { error } = await supabase
    .from('meeting_requests')
    .insert({
      id,
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject,
      message,
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      service_type: service_type || 'meeting',
      cnpj: cnpj || null,
      responsible: name,
      role: role || null,
      city_state: city_state || null,
      urgency: urgency || 'low',
      equipment_type: equipment_type || null,
    })

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { ok: true, id }
})