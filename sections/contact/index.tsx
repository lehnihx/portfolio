import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/lib/ui/field"
import { Input } from "@/lib/ui/input"
import { Button } from "@/lib/ui/button"
import { Textarea } from "@/lib/ui/textarea"

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

const ContactForm = () => (
  <div className="w-full max-w-md">
    <form action="">
      <FieldSet className="w-full">
        <FieldLabel className="text-3xl">Contact Lenix</FieldLabel>
        <FieldGroup>
          <InputField id="name" label="Name" placeholder="Lenix" type="text" />
            <InputField id="email" label="Email" placeholder="contact@lenix.dev" type="email" />
          <Field>
            <FieldLabel {...{ htmlFor: "mail-user-message" }}>Mail</FieldLabel>
            <Textarea placeholder="Hello Lenix, I would like to know more about you." required />
          </Field>
          <Field >
            <Button variant="outline" type="submit">Send</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  </div>
)

export { ContactForm }