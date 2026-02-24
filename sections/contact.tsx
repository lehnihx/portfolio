import PlaceholdersAndVanishInputDemo from "@/components/placeholders-and-vanish-input-demo"
import { ContactForm } from "@/articles/form"

export const Contact = () => (
  <section className="w-screen flex flex-col items-center justify-center">
    <PlaceholdersAndVanishInputDemo/>
    <ContactForm/>
  </section>
)