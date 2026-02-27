import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { hasLang } from '../lib/dictionaries'

const page = async () => {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? 'en'
  const lang = acceptLanguage.split(',')[0].split('-')[0]
  redirect(`/${hasLang(lang) ? lang : 'en'}`)
}

export default page