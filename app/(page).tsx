"use client"

import { Header } from "@/sections/header"
import { Hero } from "@/sections/hero"
import { Review } from "./[lang]/page"
import { About } from "@/sections/about"
import { Contact } from "@/sections/contact"
import { Footer } from "@/sections/footer"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <Header/>
    <main>
      <Hero/>
      <About reviews={reviews}/>
      <Contact/>
    </main>
    <Footer/>
  </>
)