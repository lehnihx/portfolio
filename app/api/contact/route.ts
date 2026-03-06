import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()
  const { error } = await resend.emails.send({
    from: 'Portfolio <contact@lenix.dev>',
    to: 'mariolenix0@gmail.com',
    subject: `New message from ${name}`,
    text: `${message}\n\nFrom: ${email}`,
  })
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true })
}