import { defineEventHandler, getRouterParam, createError } from 'h3'
import supabase from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const { data, error } = await supabase
    .from('meeting_requests')
    .select('name, email, phone, company, subject, message, preferred_date, preferred_time, status, service_type, cnpj, role, city_state, urgency, equipment_type, meeting_link, proposal_value')
    .eq('id', id)
    .single()

  if (error || !data) throw createError({ statusCode: 404, message: 'Não encontrado' })

  return data
})