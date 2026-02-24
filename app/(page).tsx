"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Review } from "./[lang]/page"
import { About } from "@/sections/about"
import { ContactForm } from "@/sections/contact"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <Nav/>
    <main>
      <Hero/>
      <About reviews={reviews}/>
      <ContactForm/>
    </main>
    <Footer/>
  </>
)