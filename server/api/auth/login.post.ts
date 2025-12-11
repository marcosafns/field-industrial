import { defineEventHandler, readBody, createError } from 'h3'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = (body.email || '').toString().trim()
  const senha = (body.senha || '').toString().trim()

  if (!email || !senha) {
    throw createError({
      statusCode: 400,
      statusMessage: 'E-mail e senha são obrigatórios.'
    })
  }

  const db = getDb()

  const [rows] = await db.query(
    'SELECT * FROM engenheiros WHERE email = ? LIMIT 1',
    [email]
  )

  // mysql2/promise retorna [rows, fields]
  const lista = rows as any[]

  if (!lista || lista.length === 0) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas.'
    })
  }

  const engenheiro = lista[0]

  // ⚠️ DEV ONLY: comparando senha em texto puro
  if (engenheiro.senha !== senha) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas.'
    })
  }

  // se chegou aqui, login ok
  return {
    ok: true,
    id: engenheiro.id,
    nome: engenheiro.nome,
    email: engenheiro.email,
    is_admin: !!engenheiro.is_admin
  }
})
