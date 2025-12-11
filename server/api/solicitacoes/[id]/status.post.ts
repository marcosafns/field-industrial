import { defineEventHandler, readBody, createError } from 'h3'
import { getDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID não informado' })
  }

  const body = await readBody(event)
  const status = body.status as string
  const novaData = body.novaData as string | undefined

  const allowed = ['PENDENTE', 'APROVADO', 'REJEITADO', 'REAGENDAR']
  if (!allowed.includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Status inválido' })
  }

  const db = getDb()

  if (novaData) {
    await db.query(
      `UPDATE solicitacoes
       SET status = ?, data_agendamento = STR_TO_DATE(?, '%d/%m/%Y')
       WHERE id = ?`,
      [status, novaData, id]
    )
  } else {
    await db.query(
      `UPDATE solicitacoes
       SET status = ?
       WHERE id = ?`,
      [status, id]
    )
  }

  return { ok: true }
})
