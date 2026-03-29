import { defineEventHandler, getCookie, getRouterParam, readBody, createError } from 'h3'
import { verifyToken } from '../../../utils/auth'
import supabase from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  const payload = token ? verifyToken(token) as any : null
  if (!payload) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  const { admin_id } = await readBody(event)

  const finalId = admin_id === 'me' ? payload.id : admin_id

  // Busca nome do admin
  let assignedName = payload.name || null
  if (admin_id !== 'me') {
    const { data: admin } = await supabase
      .from('admins')
      .select('name')
      .eq('id', finalId)
      .single()
    assignedName = admin?.name || null
  }

  // Log para debug
  console.log('[assign] finalId:', finalId, '| assignedName:', assignedName, '| meeting id:', id)

  // Primeiro tenta com assigned_name
  const { error, data } = await supabase
    .from('meeting_requests')
    .update({
      assigned_to: finalId,
      assigned_name: assignedName,
      assigned_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    console.error('[assign] Error with assigned_name:', error.message, error.code, error.details)

    // Fallback: tenta sem assigned_name (coluna pode não existir)
    const { error: error2 } = await supabase
      .from('meeting_requests')
      .update({
        assigned_to: finalId,
        assigned_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error2) {
      console.error('[assign] Fallback error:', error2.message, error2.code, error2.details)
      throw createError({ statusCode: 500, message: error2.message })
    }
  }

  return { ok: true }
})