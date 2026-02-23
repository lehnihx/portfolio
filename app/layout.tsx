import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/lib/ui/sonner"
import { ScrollProgress } from "@/lib/ui/scroll-progress"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default async ({
  children, params
}: {
  children: Readonly<React.ReactNode>
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="">
          {children}
        </ThemeProvider>
        <Toaster />
        <ScrollProgress />
      </body>
    </html>
  )
}