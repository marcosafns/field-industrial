import { defineEventHandler, getCookie, getQuery, createError } from 'h3'
import { verifyToken } from '../../utils/auth'
import supabase from '../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const query = getQuery(event)
  const { status, date } = query

  let q = supabase
    .from('meeting_requests')
    .select(`*, assigned_name:admins!meeting_requests_assigned_to_fkey(name)`)
    .order('created_at', { ascending: false })

  if (status) q = q.eq('status', status as string)
  if (date) q = q.eq('preferred_date', date as string)

  const { data, error } = await q

  if (error) throw createError({ statusCode: 500, message: error.message })

  return (data || []).map((m: any) => ({
    ...m,
    assigned_name: m.assigned_name?.name ?? null,
  }))
})