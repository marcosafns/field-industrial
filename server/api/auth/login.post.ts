import { defineEventHandler, readBody, createError, setCookie } from 'h3'
import bcrypt from 'bcrypt'
import supabase from '../../utils/db'
import { signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email e senha obrigatórios' })
  }

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !admin) {
    throw createError({ statusCode: 401, message: 'Credenciais inválidas' })
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Credenciais inválidas' })
  }

  const token = signToken({ id: admin.id, email: admin.email, name: admin.name })

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return { ok: true, name: admin.name }
})