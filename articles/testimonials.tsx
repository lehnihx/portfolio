import { cn } from "@/lib/utils"
import { Marquee } from "@/lib/ui/marquee"
import { useDialog } from "@/components/dialog"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/lib/ui/button"
import { ProfileCard } from "@/components/profile"
import { Review } from "@/app/[lang]/page"
import Image from "next/image"
import SpotlightCard from "@/components/SpotlightCard";
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

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
          <ProfileCard
            openDelay={0}
            review={review}
          >
            <Image className="rounded-full size-10" width={100} height={100} alt={name} src={avatar} />
          </ProfileCard>
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
    <article className="relative flex w-full h-screen flex-col items-center justify-center">
      <Marquee pauseOnHover className="[--duration:90s]">
        {reviews.map((review, index) => (
          <SpotlightCard key={`${review?.username}-${index}`} spotlightColor="var(--muted)">
            <ReviewCard {...{ review }} />
          </SpotlightCard>
        ))}
      </Marquee>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-1/5'
        direction='left'
        blurIntensity={0.5}
        blurLayers={5}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-1/5'
        direction='right'
        blurIntensity={0.5}
        blurLayers={5}
      />
    </article>
  )
}

export { Testimonials }