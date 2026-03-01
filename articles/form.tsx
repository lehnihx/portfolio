"use client"
import { ShinyButton } from "@/stock/ui/shiny-button"
import { useDict } from "@/hooks/useDict"
import { Button } from "@/components/ui/button"
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
  const dict = useDict()
  return (
    <motion.div {...ANIMATION} className="w-full my-16 px-8 landscape:max-w-1/2 portrait:min-w-full">
      <form action="">
        <FieldSet>
          <FieldLabel className="text-3xl">{dict.contact} {dict.lenix}</FieldLabel>
          <FieldGroup className="flex items-center justify-center">
            <InputField id="name" label={dict.name} placeholder={dict.lenix} type="text" />
            <InputField id="email" label={dict.email} placeholder="contact@lenix.dev" type="email" />
            <Field>
              <FieldLabel htmlFor="mail-user-message">{dict.mail}</FieldLabel>
              <Textarea placeholder={dict.mail_placeholder} required />
            </Field>
            <Field >
              <ShinyButton  {...{ type: "submit" }}>{dict.send}</ShinyButton>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </motion.div>
  )
}