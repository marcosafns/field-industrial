import { defineEventHandler, getCookie, getRouterParam, createError } from 'h3'
import { verifyToken } from '../../../utils/auth'
import supabase from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')

  const { error } = await supabase
    .from('meeting_requests')
    .update({ viewed_at: new Date().toISOString() })
    .eq('id', id)
    .is('viewed_at', null)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { ok: true }
})