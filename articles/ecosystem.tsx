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
import { motion } from "motion/react"
import { ANIMATION } from "@/lib/utils"
import { useIsInView } from "@/hooks/useIsInView"

export function Ecosystem() {
  const { resolvedTheme } = useTheme()
  const color = resolvedTheme === 'dark' ? '#ffffff' : '#000000'
  const { ref, visible , height } = useIsInView()
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
    <div ref={ref} style={{ minHeight: height }} >
      {visible && (
        <motion.article {...ANIMATION} className="relative flex h-full items-center justify-center overflow-hidden">
          <IconCloud color={color} icons={icons} />
        </motion.article>
      )}
    </div>
  )
}
