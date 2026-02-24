"use client"

import { Header } from "@/sections/header"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Review } from "./[lang]/page"
import { About } from "@/sections/about"
import { ContactForm } from "@/sections/contact"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <Header/>
    <main>
      <Hero/>
      <About reviews={reviews}/>
      <ContactForm/>
    </main>
    <Footer/>
  </>
)