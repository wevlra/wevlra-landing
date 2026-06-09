"use server"

import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

function buildEmailHtml(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#18181b;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:600;">New Contact Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#71717a;">From</p>
                    <p style="margin:0;font-size:15px;color:#18181b;">${name} &lt;${email}&gt;</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#71717a;">Subject</p>
                    <p style="margin:0;font-size:15px;color:#18181b;">${subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#71717a;">Message</p>
                    <div style="margin-top:8px;padding:16px;background-color:#fafafa;border-radius:8px;border:1px solid #e4e4e7;">
                      <p style="margin:0;font-size:14px;line-height:1.6;color:#27272a;white-space:pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e4e7;padding-top:16px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#a1a1aa;">You can reply directly to this email to respond to ${name}.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:11px;color:#a1a1aa;text-align:center;">Sent via WEVLRA contact form</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message } = validatedFields.data

  const fromAddress =
    process.env.RESEND_FROM_EMAIL || "WEVLRA <onboarding@resend.dev>"
  const toAddress = process.env.RESEND_TO_EMAIL || "wevlratech@gmail.com"

  try {
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: buildEmailHtml(name, email, subject, message),
      text: `New contact from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    })

    return {
      success: true,
      message: "Pesan berhasil dikirim! Kami akan membalas dalam 1×24 jam.",
    }
  } catch {
    return {
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
    }
  }
}
