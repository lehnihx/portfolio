"use client"
import { useDict } from "@/hooks/useDict"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { Button } from "@/components/ui/stateful-button"
import { toast } from "sonner"
import { useRef, useState } from "react"
import { Paperclip, X } from "lucide-react"

export const ContactForm = () => {
  const { contact, lenix, name, email, mail, mail_placeholder, send } = useDict()
  const { failed_message, success_message } = useDict()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleClick = async () => {
    const form = document.getElementById("contact-form") as HTMLFormElement
    if (!form.checkValidity()) return form.reportValidity()
    const res = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
    })
    if (!res.ok) {
      toast.error(failed_message)
      throw new Error("Failed")
    }
    toast.success(success_message)
    form.reset()
    setFile(null)
  }

  return (
    <motion.article {...ANIMATION} className="w-full flex items-center justify-center my-16 px-8 landscape:max-w-2/3 portrait:min-w-full md:px-4">
      <form id="contact-form" className="w-full max-w-[560px]" onSubmit={e => e.preventDefault()}>
        <FieldSet>
          <FieldLabel className="text-3xl">{contact} {lenix}</FieldLabel>
          <FieldGroup>
            <div className="flex gap-4 portrait:flex-col">
              <Field>
                <FieldLabel htmlFor="input-name">{name}</FieldLabel>
                <Input name="name" id="input-name" type="text" placeholder={lenix} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="input-email">{email}</FieldLabel>
                <Input name="email" id="input-email" type="email" placeholder="contact@lenix.dev" required />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="mail-user-message">{mail}</FieldLabel>
              <Textarea name="message" id="mail-user-message" placeholder={mail_placeholder} required className="min-h-[120px] resize-none" />
            </Field>
            <Field>
              <input
                ref={fileRef}
                type="file"
                name="file"
                className="hidden"
                onChange={e => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <button
                  type="button"
                  onClick={e => { e.preventDefault(); setFile(null); if (fileRef.current) fileRef.current.value = "" }}
                  className="flex items-center gap-2 text-sm text-muted-foreground border border-dashed border-border rounded-md px-3 py-2 w-fit hover:text-foreground transition-colors"
                >
                  <Paperclip className="size-3.5" />
                  {file.name}
                  <X className="size-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={e => { e.preventDefault(); fileRef.current?.click() }}
                  className="flex items-center gap-2 text-sm text-muted-foreground border border-dashed border-border rounded-md px-3 py-2 w-fit hover:text-foreground transition-colors"
                >
                  <Paperclip className="size-3.5" />
                  Attach a file (optional)
                </button>
              )}
            </Field>
            <div className="flex items-center justify-between">
              <Button onClick={handleClick}>{send}</Button>
              <span className="text-xs text-muted-foreground">contact@lenix.dev</span>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </motion.article>
  )
}