import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/sonner"
import { ScrollProgress } from "@/components/scroll-progress"
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

const Layout = async ({ children }: { children: Readonly<React.ReactNode> }) => {
  const heads = await headers()
  const lang = (heads.get('x-pathname') ?? '').split('/')[1] ?? 'en'
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="">
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

export default Layout