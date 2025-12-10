import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = crypto.randomUUID()

  const tipoLabelMap = {
    reuniao: 'Reunião',
    visita_tecnica: 'Visita Técnica',
    execucao_servico: 'Execução de Serviço'
  }

  const tipoPretty = tipoLabelMap[body.tipo] || body.tipo
  const tipoUpper = (tipoPretty || '').toUpperCase()
  const empresaUpper = (body.empresa || '').toUpperCase()
  const assuntoUpper = (body.assunto || '').toUpperCase()
  const nomeUpper = (body.nome || '').toUpperCase()
  const cargoUpper = (body.cargo || '').toUpperCase()
  const localUpper = (body.local || '').toUpperCase()
  const cpfFormatted = body.cpf
  const email = body.email

  const solicitacaoUrl = `${process.env.SITE_URL}/solicitacao/${id}`

  const subject = `SOLICITAÇÃO DE ${tipoUpper} - ${empresaUpper}`

  const html = `
  <html>
  <body style="font-family:Arial, sans-serif; background:#f5f5f5; padding:40px;">
    <table style="max-width:600px; margin:auto; background:white; padding:32px; border-radius:12px;">
      <tr><td style="font-size:22px; font-weight:bold; padding-bottom:16px;">
        Nova solicitação de agendamento
      </td></tr>

      <tr><td style="font-size:14px; color:#444; padding-bottom:12px;">
        Prezados,<br><br>
        Segue abaixo uma nova solicitação enviada pelo site:
      </td></tr>

      <tr><td style="font-weight:600; padding-bottom:4px;">Dados do agendamento</td></tr>
      <tr><td style="font-size:14px; color:#444; padding-bottom:16px;">
        • Data: <strong>${body.date}</strong><br/>
        • Assunto: <strong>${assuntoUpper}</strong>
      </td></tr>

      <tr><td style="font-weight:600; padding-bottom:4px;">Dados do solicitante</td></tr>
      <tr><td style="font-size:14px; color:#444; padding-bottom:24px;">
        • Nome: <strong>${nomeUpper}</strong><br/>
        • CPF: <strong>${cpfFormatted}</strong><br/>
        • Cargo: <strong>${cargoUpper}</strong><br/>
        • Empresa: <strong>${empresaUpper}</strong><br/>
        • Local: <strong>${localUpper}</strong><br/>
        • E-mail: <strong>${email}</strong>
      </td></tr>

      <tr><td style="padding-bottom:24px;">
        <a href="${solicitacaoUrl}"
           style="display:inline-block; padding:14px 32px; background:#0b2c5e; color:white; text-decoration:none;
                  border-radius:999px; font-weight:bold;">
          Ver solicitação
        </a>
      </td></tr>

      <tr><td style="font-size:14px; color:#666;">
        Atenciosamente,<br>Portal de Agendamentos
      </td></tr>
    </table>
  </body>
  </html>
  `

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: 'vi.tinho20@hotmail.com',
    subject,
    html
  })

  return { ok: true, id }
})
