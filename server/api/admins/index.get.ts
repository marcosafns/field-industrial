import { defineEventHandler, getCookie, createError } from 'h3'
import { verifyToken } from '../../utils/auth'
import supabase from '../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) throw createError({ statusCode: 401 })

  const { data, error } = await supabase
    .from('admins')
    .select('id, name, email')

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data
})