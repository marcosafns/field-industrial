import { defineEventHandler, createError } from 'h3'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID não informado' })
  }

  const db = getDb()
  const [rows]: any = await db.query(
    'SELECT * FROM solicitacoes WHERE id = ?',
    [id]
  )

  if (!rows || rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Solicitação não encontrada' })
  }

  return rows[0]
})
