import { Locale } from "@/app/dictionaries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/lib/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import React from "react"
import { ArrowUpRight, HomeIcon, PencilIcon } from "lucide-react"
import { Button, buttonVariants } from "@/lib/ui/button"
import { Separator } from "@/lib/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip"
import { Dock, DockIcon } from "@/lib/ui/dock"
import { useDict } from "@/lib/dict"
import { DropdownMenuTrigger } from "../lib/ui/dropdown-menu"
import { useDialog } from "@/components/dialog"
import { AnimatedThemeToggler } from "@/lib/ui/animated-theme-toggler"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"

export const SocialDock = () => {
  const Dict = useDict()
  const Dialog = useDialog()
  const router = useRouter()
  const changeDict = (locale: Locale) => {
    router.push(`/${locale}#footer`)
    toast.promise(
      () => new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: Dict.changing_language,
        success: Dict.language_changed,
        error: Dict.failed_language_change,
        position: "top-right"
      }
    )
  }

  const socials = [
    {
      name: Dict.github,
      url: "https://github.com/lenixdev",
      Icon: SiGithub,
    },
    {
      name: Dict.linkedin,
      url: "https://www.linkedin.com/in/lenixdev",
      Icon: SiLinkedin,
    },
    {
      name: Dict.twitter,
      url: "https://x.com/lenixdev",
      Icon: SiX,
    },
  ]

  const Docks = {
    home: (
      <DockIcon key="home">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
              <HomeIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{Dict.home}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    ),
    socials: socials.map(({ name, url, Icon }) => (
      <DockIcon key={name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full" onClick={() => Dialog(url)}>
              <Icon/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center">{name} <ArrowUpRight size={16}/></p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    )),
    dicts: (
      <DockIcon key="dicts">
        <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="rounded-full">
                  <PencilIcon />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent><p>{Dict.locales}</p></TooltipContent>
            <DropdownMenuContent className="w-full" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{Dict.locales}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => changeDict("en")}>
                  English
                  <DropdownMenuShortcut>🇬🇧</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("fr")}>
                  Français ({Dict.not_recommended})
                  <DropdownMenuShortcut>🇫🇷</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("ar")}>
                  العربية ({Dict.not_recommended})
                  <DropdownMenuShortcut>🇩🇿</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("de")}>
                  Deutsche ({Dict.not_recommended})
                  <DropdownMenuShortcut>🇩🇪</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Tooltip>
      </DockIcon>
    ),
    preferences: (
      <DockIcon key="preferences">
        <Tooltip>
          <TooltipTrigger asChild>
            <AnimatedThemeToggler className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full" })} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center">{Dict.theme}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    ),
  }

  return (
    <article className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle" className="m-0">
          {Object.entries(Docks).flatMap(([key, section], index) => [
            ...(Array.isArray(section) ? section : [section]),
            ...(!["preferences", "dicts"].includes(key) ? [<Separator key={`sep-${key}`} orientation="vertical" className="h-full" />] : [])
          ])}
        </Dock>
      </TooltipProvider>
    </article>
  )
}