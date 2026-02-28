"use client"
import { Lang } from "@/lib/dictionaries"
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
import { useDict } from "@/hooks/useDict"
import { DropdownMenuTrigger } from "../lib/ui/dropdown-menu"
import { useDialog } from "@/hooks/useDialog"
import { AnimatedThemeToggler } from "@/lib/ui/animated-theme-toggler"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"
import { animate } from "motion/react"
import { wait } from "lenix"

export const Accessibility = () => {
  const dict = useDict()
  const dialog = useDialog()
  const router = useRouter()
  
  const changeDict = (locale: Lang | "") => {
    router.push(`/${locale}`)
    toast.promise(
      () => wait(2000),
      {
        loading: dict.changing_language,
        success: dict.language_changed,
        error: dict.failed_language_change,
        position: "top-right",
        finally: () => scrollToById("footer").then(() => { }),
      },
    )
  }

  const scrollToById = (id: string) => animate(window.scrollY, document.getElementById(id)!.offsetTop, {
    duration: 2,
    ease: 'easeInOut',
    onUpdate: v => window.scrollTo(0, v)
  })

  const socials = [
    {
      name: dict.github,
      url: "https://github.com/lenixdev",
      Icon: SiGithub,
    },
    {
      name: dict.linkedin,
      url: "https://www.linkedin.com/in/lenixdev",
      Icon: SiLinkedin,
    },
    {
      name: dict.twitter,
      url: "https://x.com/lenixdev",
      Icon: SiX,
    },
  ]

  const Docks = {
    home: (
      <DockIcon key="home">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full" onClick={() => scrollToById("hero")}>
              <HomeIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{dict.home}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    ),
    socials: socials.map(({ name, url, Icon }) => (
      <DockIcon key={name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full" onClick={() => dialog(url)}>
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
            <TooltipContent><p>{dict.locales}</p></TooltipContent>
            <DropdownMenuContent className="w-full" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{dict.locales}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => changeDict("")}>
                  English
                  <DropdownMenuShortcut>🇬🇧</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("fr")}>
                  Français ({dict.not_recommended})
                  <DropdownMenuShortcut>🇫🇷</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("ar")}>
                  العربية ({dict.not_recommended})
                  <DropdownMenuShortcut>🇩🇿</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDict("de")}>
                  Deutsche ({dict.not_recommended})
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
            <div>
              <AnimatedThemeToggler className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full" })} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center">{dict.theme}</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    ),
  }

  return (
    <article className="flex flex-col items-center justify-center flex-1/3">
      <TooltipProvider>
        <Dock direction="middle" className="m-0">
          {Object.entries(Docks).flatMap(([key, section]) => [
            ...(Array.isArray(section) ? section : [section]),
            ...(!["preferences", "dicts"].includes(key) ? [<Separator key={`sep-${key}`} orientation="vertical" className="h-full" />] : [])
          ])}
        </Dock>
      </TooltipProvider>
    </article>
  )
}