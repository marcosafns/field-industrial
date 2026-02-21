
import { verifyToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token) throw createError({ statusCode: 401 })

  const payload = verifyToken(token) as any
  if (!payload) throw createError({ statusCode: 401 })

  return { name: payload.name, email: payload.email }
})