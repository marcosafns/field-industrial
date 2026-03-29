import { defineEventHandler, getCookie, getRouterParam, createError } from 'h3'
import { verifyToken } from '../../utils/auth'
import supabase from '../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const id = getRouterParam(event, 'id')

  const { data, error } = await supabase
    .from('meeting_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) throw createError({ statusCode: 404, message: 'Não encontrado' })

  return data
})