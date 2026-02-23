import { cn } from "@/lib/utils"
import { Marquee } from "@/lib/ui/marquee"
import { useDialog } from "@/components/dialog"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/lib/ui/button"
import HoverProfileCard from "@/components/profile"
import { Review } from "@/app/[lang]/page"
import Image from "next/image"
import SpotlightCard from "@/components/SpotlightCard";

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
        "relative h-full w-64 cursor-pointer overflow-hidden",
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
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:90s]">
        {reviews.map((review, index) => (
          <SpotlightCard key={`${review?.username}-${index}`} spotlightColor="var(--muted)">
            <ReviewCard {...{ review }} />
          </SpotlightCard>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
    </div>
  )
}

export { Testimonials }