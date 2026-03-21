import { cache } from "@/lib/cache"
import { Lang } from "@/lib/dictionaries"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Review } from "@/app/[lang]/page"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { ArrowUpRight, Verified } from "lucide-react"
import { Tooltip } from "../ui/tooltip-card"
import Image from "next/image"
import { HoverCard } from "radix-ui"

const UserProfile = ({
  name,
  username,
  avatar,
  banner,
  color,
  locale,
  verified,
  avatar_decoration,
  tag,
  badge,
}: Review) => (
  <HoverCard.Root openDelay={0}>
    <HoverCard.Trigger asChild>
      <Image className="rounded-full size-10" width={100} height={100} alt={name} src={avatar} />
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content style={{ backgroundColor: color ? `${color}` : undefined }} sideOffset={5}
        className="w-75 rounded-md bg-primary-foreground shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
      >
      <div className="flex flex-col gap-1.75">
      <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="relative h-20 z-2 rounded-tl-md rounded-tr-md"
      >
        <div className="absolute ml-5 -bottom-5 overflow-visible size-18">
          <Image src={avatar} alt={name} width={100} height={100}
            className="outline-2 h-[80%] w-[80%] absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
          />
          {avatar_decoration && (
            <Image alt={`${name} decoration`} width={100} height={100} src={avatar_decoration}
              className="pointer-events-none absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          )}
        </div>
        {locale && <Badge variant="outline" className="absolute right-1.5 top-1.5">{locale}</Badge>}
      </div>
        <div className="flex flex-col gap-3.75 p-5">
          <div className="flex ">
            <div className="m-0 text-[15px] font-medium text-mauve12">
              {name}
              {verified && <Tooltip content="This user has verified his email">
                <Badge variant="outline">
                  <Verified/>
                </Badge>
              </Tooltip>}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="m-0 text-[15px] text-mauve10 underline">{username}</div>
            {(badge && tag) &&  <Badge variant="secondary">
              <Image src={badge} alt={username} width={20} height={20}/>{tag}
            </Badge>}
          </div>
        </div>
      </div>
      <HoverCard.Arrow className="fill-foreground" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
)

export const SuspenseTestimonials = async ({
  lang, setTranslated, translated, dialog, original, translate
}: {
  lang: Lang
  setTranslated: React.Dispatch<React.SetStateAction<{ reviewId: number, translated: boolean }>>
  translated: { reviewId: number, translated: boolean }
  dialog: (url: string) => void
  original: string
  translate: string
}) => {
  const reviews = await cache.reviews(lang)
  return (
    <>
      {reviews.map((review, index) => (
        <React.Fragment key={`${review?.username}-${index}`} >
          {review && (() => {
          const { name, username, date, reviewLink, body, translation } = review
            return (
              <figure className={cn("relative h-full w-64 cursor-pointer overflow-hidden bg-accent p-6 rounded-md")}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-row items-end gap-2">
                    <UserProfile {...review}/>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium text-foreground">{name}</figcaption>
                      <p className="text-xs font-medium text-foreground/40">{username}</p>
                    </div>
                    <p className="text-xs font-medium text-foreground/40">{date}</p>
                  </div>
                  <Button variant={"secondary"} size={"icon"} className="rounded-full"
                    onClick={() => dialog(reviewLink)}
                  >
                    <ArrowUpRight/>
                  </Button>
                </div>
                <blockquote className="mt-2 text-sm">{translated.reviewId === index && translated.translated ? translation : body}</blockquote>
                <button
                  type="button"
                  onClick={() => setTranslated(prev => ({ reviewId: index, translated: !prev.translated }))}
                  className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {translated.reviewId === index && translated.translated ? original : translate}
                </button>
              </figure>
            )
          })()}
        </React.Fragment>
      ))}
    </>
  )
}