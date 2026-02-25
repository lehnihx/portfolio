"use client"
import { PlaceholdersAndVanishInput } from "@/lib/ui/placeholders-and-vanish-input"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

export const Ask = () => {
  const dict = useDict()
  const placeholders = [
    "Are you willing to collaborate?",
    "How tall you are?",
    "Where do you live?",
    "What is your real name?",
    "How did you become a software engineering this fast?",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitted")
  }
  return (
    <motion.article {...ANIMATION} className="my-16 flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-foreground">
        {dict.ask}
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </motion.article>
  )
}
