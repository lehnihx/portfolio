import Home from "@/app/(page)"
import { getDictionary, hasLocale } from "./dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/lib/dict-context"

const Page = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <DictProvider dict={dict}>
      <Home />
    </DictProvider>
  )
}

export default Page