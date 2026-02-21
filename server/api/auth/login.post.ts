import bcrypt from 'bcrypt'
import pool from '../../utils/db'
import { signToken } from '../../utils/auth'
import { sendEmail } from '../../utils/mailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email e senha obrigatórios' })
  }

  const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]) as any
  const admin = rows[0]

  if (!admin) {
    throw createError({ statusCode: 401, message: 'Credenciais inválidas' })
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Credenciais inválidas' })
  }

  const token = signToken({ id: admin.id, email: admin.email, name: admin.name })

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/',
  })

  return { ok: true, name: admin.name }
})