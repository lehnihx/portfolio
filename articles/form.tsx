"use client"
import { useDict } from "@/hooks/useDict"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { Button } from "@/components/ui/stateful-button"
import { toast } from "sonner"

const InputField = ({ id, label, placeholder, type }: {
  id: string
  label: string
  placeholder: string
  type: string
}) => (
  <Field>
    <FieldLabel htmlFor={`input-${id}`}>{label}</FieldLabel>
    <Input name={id}  id={`input-${id}`} type={type} placeholder={placeholder} required />
  </Field>
)

export const ContactForm = () => {
  const { contact, lenix, name, email, mail, mail_placeholder, send } = useDict()

  const handleClick = async () => {
    const form = document.getElementById("contact-form") as HTMLFormElement
    if (!form.checkValidity()) return form.reportValidity()
    const data = Object.fromEntries(new FormData(form))
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      toast.error("Failed to send message")
      throw new Error("Failed")
    }
    toast.success("Message sent!")
  }

  return (
    <motion.article {...ANIMATION} className="w-full flex items-center justify-center my-16 px-8 landscape:max-w-1/2 portrait:min-w-full md:px-4">
      <form id="contact-form" className="w-full" onSubmit={e => e.preventDefault()}>
        <FieldSet>
          <FieldLabel className="text-3xl">{contact} {lenix}</FieldLabel>
          <FieldGroup className="flex items-center justify-center">
            <InputField id="name" label={name} placeholder={lenix} type="text" />
            <InputField id="email" label={email} placeholder="contact@lenix.dev" type="email" />
            <Field>
              <FieldLabel htmlFor="mail-user-message">{mail}</FieldLabel>
              <Textarea name="message" placeholder={mail_placeholder} required />
            </Field>
            <Field>
              <Button onClick={handleClick}>{send}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </motion.article>
  )
}