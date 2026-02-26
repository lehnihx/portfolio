import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/lib/ui/sonner"
import { ScrollProgress } from "@/lib/ui/scroll-progress"
import { LoadingScreen } from "@/articles/loading"
import { headers } from "next/headers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default async ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { get } = await headers()
  const { split } = get('x-pathname') ?? ''
  const lang = split('/')[1] ?? 'en'
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingScreen>
            {children}
          </LoadingScreen>
        </ThemeProvider>
        <Toaster />
        <ScrollProgress />
      </body>
    </html>
  )
}