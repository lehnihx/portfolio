"use client"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

export const Ask = () => {
  const { ask, questions } = useDict()

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
        {ask}
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={questions}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </motion.article>
  )
}