import { cache } from "@/lib/cache"
import { Lang } from "@/lib/dictionaries"
import { TestimonialCard } from "./card"

export const SuspenseTestimonials = async ({ lang }: { lang: Lang }) => {
  const reviews = await cache.reviews(lang)
  return (
    <>
      {reviews.map((review, index) => (
        <TestimonialCard key={`${review.username}-${index}`} review={review} />
      ))}
    </>
  )
}