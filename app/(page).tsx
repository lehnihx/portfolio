"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Reviews } from "@/lib/types"

const Home = ({ reviews }: { reviews: Reviews[] }) => (
  <main>
    <Nav/>
    <Hero reviews={reviews}/>
    <Footer/>
  </main>
)

export default Home