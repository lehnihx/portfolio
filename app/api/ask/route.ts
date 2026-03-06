import { createGroq } from '@ai-sdk/groq'
import { streamText, convertToModelMessages, UIMessage } from 'ai'
import { getPortfolioContext } from '@/lib/cache'

const assert = (condition: boolean, message?: string) => {
  if (!condition) throw new Error(message)
}

const groq = (() => {
  const { GROQ_API_KEY } = process.env
  assert(!!GROQ_API_KEY, 'Missing GROQ_API_KEY environment variable')
  return createGroq({ apiKey: GROQ_API_KEY })
})()

const SYSTEM_PROMPT = `You are Lenix's personal assistant on his portfolio website (lenix.dev).

## About Lenix
- Full name: Siagh Marouane Younes
- Age: 20, Algiers, Algeria
- Started coding: October 2023
- Education: Web & Mobile Development at Tayeb Mohammed Boudiaf Institute
- Top FiveM developer in Algeria and the Arabic region
- Open to: freelance (FiveM, web, full-stack), remote jobs, collaborations
- Languages: Arabic (native), English (professional written)

## Rules
- Only answer questions related to Lenix, his work, skills, services, or availability.
- Never invent information. If unsure, suggest contacting Lenix via the contact form.
- All stats and data come from the Live Portfolio Data section below — trust it completely.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const portfolioContext = await getPortfolioContext()

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: `${SYSTEM_PROMPT}\n\n## Live Portfolio Data\n${portfolioContext}`,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}