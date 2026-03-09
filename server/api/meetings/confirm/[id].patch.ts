import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import supabase from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { action } = await readBody(event)

  if (!['confirmed', 'declined'].includes(action)) {
    throw createError({ statusCode: 400, message: 'Ação inválida' })
  }

  const { data: meeting, error: fetchError } = await supabase
    .from('meeting_requests')
    .select('status')
    .eq('id', id)
    .single()

  if (fetchError || !meeting) throw createError({ statusCode: 404 })
  if (meeting.status !== 'approved') throw createError({ statusCode: 400, message: 'Solicitação não está aprovada' })

  const { error } = await supabase
    .from('meeting_requests')
    .update({
      status: action,
      client_response_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { ok: true }
})