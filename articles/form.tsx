import { useDict } from "@/lib/dict"
import { Button } from "@/lib/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/lib/ui/field"
import { Input } from "@/lib/ui/input"
import { Textarea } from "@/lib/ui/textarea"

const InputField = ({ id, label, placeholder, type }: {
  id: string
  label: string
  placeholder: string
  type: string
}) => (
  <Field className="min-w-md">
    <FieldLabel htmlFor={`input-${id}`}>{label}</FieldLabel>
    <Input id={`input-${id}`} type={type} placeholder={placeholder} required />
  </Field>
)

export const ContactForm = () => {
  const Dict = useDict()
  return (
    <form action="">
      <FieldSet className="w-full">
        <FieldLabel className="text-3xl">{Dict.contact} {Dict.lenix}</FieldLabel>
        <FieldGroup className="flex items-center justify-center">
          <InputField id="name" label={Dict.name} placeholder={Dict.lenix} type="text" />
          <InputField id="email" label={Dict.email} placeholder="contact@lenix.dev" type="email" />
          <Field className="min-w-md">
            <FieldLabel htmlFor="mail-user-message">{Dict.mail}</FieldLabel>
            <Textarea className="max-h-[calc(100vh/3)]" placeholder={Dict.mail_placeholder} required />
          </Field>
          <Field >
            <Button variant="outline" type="submit">{Dict.send}</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}