import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = (() => {
  const { RESEND_API_KEY } = process.env
  if (!RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY Key')
  return new Resend(RESEND_API_KEY)
})()

export const POST = async (req: NextRequest) => {
  const form = await req.formData()
  const name = form.get('name') as string
  const email = form.get('email') as string
  const message = form.get('message') as string
  const file = form.get('file') as File | null

  const attachments = file ? [{
    filename: file.name,
    content: Buffer.from(await file.arrayBuffer())
  }] : []

  const { error } = await resend.emails.send({
    from: 'Portfolio <contact@lenix.dev>',
    to: 'mariolenix0@gmail.com',
    subject: `New message from ${name}`,
    text: `${message}\n\nFrom: ${email}`,
    attachments
  })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true })
}