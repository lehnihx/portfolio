import { useRef, useState, type SyntheticEvent } from "react"
import { motion } from "motion/react"
import { fade } from "@/lib/constants"
import { Footer } from "@/components/footer"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupText, InputGroupButton } from "@/components/ui/input-group"
import { raise } from "lenix"
import { Required } from "@/components/articles/required"
import { Spinner } from "@/components/ui/spinner"
import { ArrowRight02FreeIcons, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

// eslint-disable-next-line max-lines-per-function
export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [value, setValue] = useState("")
  const abortRef = useRef<AbortController | null>(null)

  const handleCancel = () => { abortRef.current?.abort() }

  const handleSubmit = async (event: Readonly<SyntheticEvent<HTMLFormElement>>) => {
    abortRef.current = new AbortController()
    event.preventDefault()
    setStatus("loading")
    const body = new FormData(event.currentTarget)
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body,
        signal: abortRef.current.signal,
      })
      setStatus(res.ok ? "done" : "error")
    } catch (err) {
      setStatus(err instanceof DOMException && err.name === "AbortError" ? "idle" : "error")
    } finally {
      setTimeout(() => { setStatus("idle") }, 3000)
    }
  }

  return (
    <div className="bg-background flex flex-col items-center">
      <div className="min-h-screen flex flex-col justify-between min-w-2/5 items-center">
        <motion.div {...fade(0)} className="flex flex-col gap-10 h-full w-full justify-center py-16 flex-1">
        <div>
          <p className="text-[11px] tracking-[3px] text-foreground/30 uppercase mb-5">Get in touch</p>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground">Contact</h1>
        </div>
        <form onSubmit={(event) => { handleSubmit(event).catch(raise) }}>
          <FieldSet>
            <FieldGroup>
              <FieldGroup className="flex flex-row">
                <Field>
                  <FieldLabel htmlFor="name">Name <Required /></FieldLabel>
                  <Input required id="name" name="name" autoComplete="off" placeholder="Lenix Dev" defaultValue="An Anonymous" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email <Required /></FieldLabel>
                  <Input required name="email" type='email' id="email" placeholder="contact@lenix.dev" />
                </Field>
              </FieldGroup>
              <Field>
                <FieldLabel htmlFor="subject">Subject <Required /></FieldLabel>
                <Input required name="subject" type='text' id="email" placeholder="Interest" defaultValue="Unsubjected message" />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message <Required /></FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    value={value}
                    required
                    id="message"
                    name="message"
                    placeholder="Write a message..."
                    onChange={event => { setValue(event.target.value) }}
                  />
                  <InputGroupAddon align="block-end" className="justify-between">
                    <InputGroupText>{value.length}/1000</InputGroupText>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {status === 'idle'
                    ? <InputGroupButton
                      aria-invalid={value.length > 1000}
                      disabled={value.length > 1000}
                      type="submit" variant="default" size="sm"
                    >
                      Send <HugeiconsIcon icon={ArrowRight02FreeIcons} />
                    </InputGroupButton>
                    // eslint-disable-next-line no-nested-ternary
                    : status === 'loading'
                    ? <InputGroupButton type="button" variant="default" size="sm" onClick={handleCancel} className="group">
                      <span className="group-hover:hidden flex items-center gap-1">Sending... <Spinner /></span>
                      <span className="hidden group-hover:inline">Cancel</span>
                    </InputGroupButton>
                    : status === 'done'
                    ? <InputGroupButton disabled type="button" variant="default" size="sm">
                      Sent <HugeiconsIcon icon={CheckmarkCircle01Icon} />
                    </InputGroupButton>
                    : <InputGroupButton disabled type="button" variant="default" size="sm">
                      Failed
                    </InputGroupButton>}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="files">Files</FieldLabel>
                <Input id="files" name='files' type="file" multiple />
                <FieldDescription>Select files to upload.</FieldDescription>
              </Field>
              <Field orientation="horizontal">
                <Switch name="subscribe" id="newsletter" />
                <FieldLabel htmlFor="subscribe">Subscribe to the newsletter</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
          {/* 
          <form
            onSubmit={(event) => { handleSubmit(event).catch(raise) }}
            className="grid grid-cols-2 portrait:grid-cols-1 gap-px border border-foreground/10 overflow-hidden"
          >
            {[
              { name: "name", type: "text", placeholder: "Name" },
              { name: "email", type: "email", placeholder: "Email" },
            ].map(({ name, type, placeholder }) => (
              <input
                key={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className="px-5 py-6 bg-transparent text-sm text-foreground placeholder:text-foreground/20 outline-none border-b border-foreground/10"
              />
            ))}
            <textarea
              name="message"
              required
              placeholder="Message"
              rows={5}
              className="col-span-2 portrait:col-span-1 px-5 py-6 bg-transparent text-sm text-foreground placeholder:text-foreground/20 outline-none resize-none border-b border-foreground/10"
            />
            <div className="col-span-2 portrait:col-span-1 px-5 py-6 flex items-center justify-center">
              <p className="text-[11px] text-foreground/20">
                {status === "done" && "Sent!"}
                {status === "error" && "Failed. Try again."}
              </p>
              <button
                type="submit"
                disabled={status === "loading" || status === "done"}
                className="text-[11px] tracking-[2px] uppercase text-foreground/50 hover:text-foreground transition-colors disabled:opacity-30"
              >
                {status === "loading" ? "Sending…" : "Send"}
              </button>
            </div>
          </form> */}
        </motion.div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}