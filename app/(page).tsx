"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Review } from "@/lib/types"

const Page = ({ reviews }: { reviews: Review[] }) => (
  <main>
    <Nav/>
    <Hero reviews={reviews}/>
    <Footer/>
  </main>
)

export default Page