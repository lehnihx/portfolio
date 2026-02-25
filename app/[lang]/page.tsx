import Home from "@/app/(page)"
import { Dictionary, hasLang } from "../../lib/dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/hooks/useDict"
import { DialogProvider } from "@/hooks/useDialog"
import getReviews from "@/lib/reviews"

export interface Review {
  name: string
  username: string
  body: string
  avatar: string
  reviewLink: string
  banner: string | undefined
  color: string | null
  locale: string | undefined
  verified: boolean | undefined
  avatar_decoration: string | undefined
  tag: string | null | undefined
  badge: string | undefined
  date: string
}

export default async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params
  
  if (!hasLang(lang)) notFound()

  const dict = await Dictionary(lang)
  const reviews = await getReviews(lang)

  return (
    <DictProvider dict={dict}>
      <DialogProvider>
        <Home {...{ reviews }} />
      </DialogProvider>
    </DictProvider>
  )
}