import { verifyToken } from '../../utils/auth'
import pool from '../../utils/db'
import { sendEmail } from '../../utils/mailer'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token || !verifyToken(token)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { status, admin_response } = body

  await pool.query(
    'UPDATE meeting_requests SET status = ?, admin_response = ?, responded_at = NOW() WHERE id = ?',
    [status, admin_response, id]
  )

  const [rows] = await pool.query('SELECT * FROM meeting_requests WHERE id = ?', [id]) as any
  const meeting = rows[0]

  if (meeting?.email && (admin_response || status === 'approved')) {
    const statusColors: Record<string, string> = {
      approved: '#16a34a',
      rejected: '#dc2626',
      completed: '#2563eb',
      pending: '#d97706',
    }

    const statusLabel: Record<string, string> = {
      approved: 'Aprovada ✅',
      rejected: 'Recusada ❌',
      completed: 'Concluída ✔️',
      pending: 'Pendente ⏳',
    }

    const rescheduleButton = status === 'rejected' ? `
      <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
        <tr>
          <td style="background-color:#f17b21;border-radius:50px;padding:14px 32px;text-align:center;">
            <a href="http://localhost:3000/agendar-reuniao?reagendar=${meeting.id}" style="color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
              📅 Reagendar Reunião
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:0 0 28px;font-size:13px;color:#9ca3af;text-align:center;line-height:1.6;">
        Acesse nosso site e escolha uma nova data e horário que funcione melhor para você.
      </p>` : ''

    const responseBox = admin_response ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="background-color:#fff8f3;border-left:4px solid #f17b21;border-radius:0 12px 12px 0;padding:20px 24px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#f17b21;text-transform:uppercase;letter-spacing:1px;">Resposta da equipe</p>
            <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">${admin_response}</p>
          </td>
        </tr>
      </table>` : ''

    const approvedMessage = status === 'approved' && !admin_response ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="background-color:#f0fdf4;border-left:4px solid #16a34a;border-radius:0 12px 12px 0;padding:20px 24px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">Boa notícia!</p>
            <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">Sua solicitação foi aprovada! Em breve nossa equipe entrará em contato para confirmar os detalhes da reunião.</p>
          </td>
        </tr>
      </table>` : ''

    await sendEmail(
      meeting.email,
      `Atualização da sua solicitação — Field Industrial`,
      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Field Industrial</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#111827;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">FI<span style="color:#fff3e0;">⚙</span>LD</div>
              <div style="font-size:11px;color:#ffe0b2;letter-spacing:6px;text-transform:uppercase;margin-top:4px;">INDUSTRIAL</div>
            </td>
          </tr>
          <tr>
            <td style="background:linear-gradient(90deg,#f17b21,#ff9a3c,#f17b21);height:3px;"></td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:40px;">
              <p style="margin:0 0 8px;font-size:13px;color:#f17b21;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Atualização de Solicitação</p>
              <h1 style="margin:0 0 24px;font-size:26px;font-weight:800;color:#111827;line-height:1.3;">Olá, ${meeting.name}!</h1>
              <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.7;">Sua solicitação de reunião foi atualizada pela nossa equipe técnica.</p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:${statusColors[status] ?? '#6b7280'}20;border:1.5px solid ${statusColors[status] ?? '#6b7280'};border-radius:50px;padding:10px 24px;">
                    <span style="font-size:15px;font-weight:700;color:${statusColors[status] ?? '#6b7280'};">Status: ${statusLabel[status] ?? status}</span>
                  </td>
                </tr>
              </table>
              ${responseBox}
              ${approvedMessage}
              ${rescheduleButton}
              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 28px;" />
              <p style="margin:0 0 6px;font-size:13px;color:#9ca3af;line-height:1.6;">📅 <strong>Data preferencial:</strong> ${meeting.preferred_date ?? '—'}</p>
              <p style="margin:0 0 24px;font-size:13px;color:#9ca3af;line-height:1.6;">🏢 <strong>Empresa:</strong> ${meeting.company ?? '—'}</p>
              <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.7;">Caso tenha dúvidas, entre em contato conosco.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#111827;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 12px;font-size:12px;color:#9ca3af;line-height:1.6;">Engenharia com excelência e precisão</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="padding:0 8px;"><a href="https://www.instagram.com/fieldindustrial/" style="font-size:12px;color:#f17b21;text-decoration:none;">Instagram</a></td>
                  <td style="color:#4b5563;font-size:12px;">|</td>
                  <td style="padding:0 8px;"><a href="https://www.linkedin.com/company/fieldindustrial/" style="font-size:12px;color:#f17b21;text-decoration:none;">LinkedIn</a></td>
                </tr>
              </table>
              <p style="margin:0;font-size:11px;color:#4b5563;">© 2026 Field Industrial — Todos os direitos reservados.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    )
  }

  return { ok: true }
})