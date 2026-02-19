"use client"

import { Locale } from "@/app/dictionaries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { useDict } from "@/lib/dict"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DropdownMenuDemo({ children }: { children: Readonly<React.ReactNode> }) {
  const dict = useDict()
  const router = useRouter()
  const changeDict = (locale: Locale) => {
    router.push(`/${locale}#footer`)
    const tst = toast("Event has been created", { position: "top-left" })
    console.log(tst)
  }
  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent className="w-full" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{dict.locales}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => changeDict("en")}>
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
  )
}
