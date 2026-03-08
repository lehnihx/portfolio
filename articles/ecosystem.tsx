"use client"
import { useTheme } from "next-themes"
import { IconCloud } from "@/components/ui/icon-cloud"
import { IconBrandCSharp } from "@tabler/icons-react"
import {
  SiClaude,
  SiCplusplus,
  SiCss3,
  SiDavinciresolve,
  SiDotnet,
  SiEslint,
  SiFigma,
  SiFivem,
  SiGit,
  SiGithub,
  SiGnubash,
  SiHtml5,
  SiLua,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiNgrok,
  SiNpm,
  SiPhp,
  SiPnpm,
  SiPostgresql,
  SiReact,
  SiReplit,
  SiRust,
  SiTailwindcss,
  SiTypescript,
  SiUml,
  SiVercel,
  SiVite,
  SiZsh
} from "react-icons/si"

export function Ecosystem() {
  const { resolvedTheme } = useTheme()
  const color = resolvedTheme === 'dark' ? '#ffffff' : '#000000'
  const icons = [
    SiDotnet,
    SiCplusplus,
    SiTypescript,
    SiTailwindcss,
    SiNpm,
    SiMysql,
    SiLua,
    SiReact,
    SiNextdotjs,
    SiFigma,
    SiGithub,
    SiGit,
    SiUml,
    SiPostgresql,
    SiRust,
    IconBrandCSharp,
    SiClaude,
    SiCss3,
    SiDavinciresolve,
    SiEslint,
    SiFivem,
    SiGnubash,
    SiHtml5,
    SiMariadb,
    SiNgrok,
    SiPhp,
    SiPnpm,
    SiReplit,
    SiVercel,
    SiVite,
    SiZsh,
  ].map((Icon, index) => <Icon key={`ecosystem-icon-${index}`} />)
  return (
    <article className="relative flex h-1/2 items-center justify-center overflow-hidden">
      <IconCloud color={color} icons={icons} />
    </article>
  )
}
