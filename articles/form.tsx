"use client"
import { ShinyButton } from "@/stock/ui/shiny-button"
import { useDict } from "@/hooks/useDict"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

const InputField = ({ id, label, placeholder, type }: {
  id: string
  label: string
  placeholder: string
  type: string
}) => (
  <Field>
    <FieldLabel htmlFor={`input-${id}`}>{label}</FieldLabel>
    <Input id={`input-${id}`} type={type} placeholder={placeholder} required />
  </Field>
)

export const ContactForm = () => {
  const { contact, lenix, name, email, mail, mail_placeholder, send } = useDict()
  return (
    <motion.article {...ANIMATION} className="w-full flex items-center justify-center my-16 px-8 landscape:max-w-1/2 portrait:min-w-full md:px-4">
      <form action="" className="w-full">
        <FieldSet>
          <FieldLabel className="text-3xl">{contact} {lenix}</FieldLabel>
          <FieldGroup className="flex items-center justify-center">
            <InputField id="name" label={name} placeholder={lenix} type="text" />
            <InputField id="email" label={email} placeholder="contact@lenix.dev" type="email" />
            <Field>
              <FieldLabel htmlFor="mail-user-message">{mail}</FieldLabel>
              <Textarea placeholder={mail_placeholder} required />
            </Field>
            <Field >
              <ShinyButton  {...{ type: "submit" }}>{send}</ShinyButton>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </motion.article>
  )
}