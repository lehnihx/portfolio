import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/sonner"
import { ScrollProgress } from "@/components/scroll-progress"
import { LoadingProvider } from "@/articles/loading"
import { headers } from "next/headers"
import { ClickProvider } from "@/articles/click"

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `localStorage.removeItem('theme')` }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingProvider>
            <ClickProvider>
              {children}
            </ClickProvider>
          </LoadingProvider>
        </ThemeProvider>
        <Toaster />
        <ScrollProgress />
      </body>
    </html>
  )
}

export default Layout