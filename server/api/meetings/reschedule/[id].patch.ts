import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import supabase from '../../../utils/db'

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

  const { error } = await supabase
    .from('meeting_requests')
    .update({
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      service_type: service_type || 'meeting',
      cnpj: cnpj || null,
      role: role || null,
      city_state: city_state || null,
      urgency: urgency || 'low',
      equipment_type: equipment_type || null,
      subject,
      message,
      status: 'pending',
      admin_response: null,
      responded_at: null,
      viewed_at: null,
    })
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { ok: true }
})