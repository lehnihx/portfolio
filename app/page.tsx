"use client"
import ContactForm from "@/components/contact"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "next-themes"
import Image from "next/image"

const Home = () => {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="https://r2.fivemanage.com/COKMc8Wcmk9K5dp547rEw/Lenix_924.png"
          alt="Lenix logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50">
            To get started, edit the page.tsx file.
          </h1>
        </div>
        <Toggle {...{
          variant: "outline",
          onClick: () => setTheme(theme === "dark" ? "light" : "dark")
        }}>Toggle</Toggle>
        <ContactForm />
      </main>
    </div>
  )
}

export default Home