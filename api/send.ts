import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"

// eslint-disable-next-line no-undef
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { name, email, message, subscribe, subject } = req.body
  console.debug(name, email, message, subscribe, subject)
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string")
    return res.status(400).json({ error: "Invalid request" })

  const { error } = await resend.emails.send({
    from: "Lenix <portfolio@lenix.dev>",
    to: "somenoemail@gmail.com",
    subject: `Message from ${name.trim() ? name : "Anonymous"}`,
    text: `${message}\n\nReply to: ${email}`,
  })

  if (error) return res.status(500).json({ error })
  res.status(200).json({ ok: true })
  return undefined
}