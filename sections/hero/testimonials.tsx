import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { useDialog } from "@/lib/dialog"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HoverProfileCard from "@/components/profile"
import { Review } from "@/app/[lang]/page"
import Image from "next/image"

const ReviewCard = ({ review }: { review: Review }) => {
  if (!review) return
  const {
    name,
    username,
    body,
    avatar,
    reviewLink,
    date
  } = review
  const Dialog = useDialog()
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/10 bg-gray-950/10 hover:bg-gray-950/5",
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-end gap-2">
          <HoverProfileCard
            openDelay={0}
            review={review}
          >
            <Image className="rounded-full size-10" width={100} height={100} alt={name} src={avatar} />
          </HoverProfileCard>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
          <p className="text-xs font-medium dark:text-white/40">{date}</p>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
          onClick={() => Dialog(reviewLink)}
        >
          <ArrowUpRight/>
        </Button>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

const Testimonials = ({ reviews }: { reviews: Review[] }) => {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review?.username}-${index}`} {...{ review }} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={`${review?.username}-${index}`} review={review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  )
}

export { Testimonials }