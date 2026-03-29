import { defineEventHandler, getCookie, getRouterParam, readBody, createError } from 'h3'
import { verifyToken } from '../../../utils/auth'
import supabase from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  const { internal_notes } = await readBody(event)

  const { error } = await supabase
    .from('meeting_requests')
    .update({ internal_notes })
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { ok: true }
})