import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import pool from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { action } = await readBody(event) // 'confirmed' ou 'declined'

  if (!['confirmed', 'declined'].includes(action)) {
    throw createError({ statusCode: 400, message: 'Ação inválida' })
  }

  const [rows] = await pool.query('SELECT * FROM meeting_requests WHERE id = ?', [id]) as any
  const meeting = rows[0]

  if (!meeting) throw createError({ statusCode: 404 })
  if (meeting.status !== 'approved') throw createError({ statusCode: 400, message: 'Solicitação não está aprovada' })

  await pool.query(
    'UPDATE meeting_requests SET status = ?, client_response_at = NOW() WHERE id = ?',
    [action, id]
  )

  return { ok: true }
})