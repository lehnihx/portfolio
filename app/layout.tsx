import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) =>
<html lang="en" suppressHydrationWarning>
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="">
      {children}
    </ThemeProvider>
  </body>
</html>

export default RootLayout