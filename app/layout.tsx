import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { LoadingProvider } from "@/components/loading"
import { headers } from "next/headers"
import { ClickProvider } from "@/components/ui/click"
import { SlowScroll } from "@/components/scroll"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
              <SlowScroll>
                {children}
                <SpeedInsights/>
              </SlowScroll>
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