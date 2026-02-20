import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { Dialog } from "@/components/dialog"
import { ArrowUpRight } from "lucide-react"
import { useDict } from "@/lib/dict"
import { Reviews } from "@/lib/types"

const ReviewCard = ({
  img,
  name,
  username,
  body,
  url
}: {
  img: string
  name: string
  username: string
  body: string
  url: string
}) => {
  const Dict = useDict()
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/10 bg-gray-950/10 hover:bg-gray-950/5",
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <Dialog
          metadata={{ name, url }}
          dict={Dict}
          additionalClasses="cursor-pointer hover:bg-background"
        >
          <ArrowUpRight/>
        </Dialog>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

const Testimonials = ({ reviews }: { reviews: Reviews[] }) => {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review.username}-${index}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={`${review.username}-${index}`} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  )
}

export { Testimonials }