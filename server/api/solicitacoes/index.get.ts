import { defineEventHandler, createError } from 'h3'
import { getDb } from '../../utils/db'

export default defineEventHandler(async () => {
  const db = getDb()

  try {
    const [rows] = await db.query(
      'SELECT id, data_agendamento, nome, empresa, status FROM solicitacoes ORDER BY created_at DESC'
    )
    return rows
  } catch (err) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar solicitações.'
    })
  }
})
