import { langsBytes } from "~/scripts/data.json"
import { commits } from "~/scripts/data.json"

export const EXCLUDED_LANGS = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript', 'Markdown', 'License', 'JSON', 'YAML', 'TOML', 'SVG']
export const filteredLangs = langsBytes.filter(lang => !EXCLUDED_LANGS.includes(lang.name))
export const totalBytes = filteredLangs.reduce((a, l) => a + l.bytes, 0)
export const STACK = [
  'React',
  'Next.js',
  'Tauri',
  'Supabase',
  'Tailwind',
  'Vite',
  'Expo',
  'Node.js',
  'PostgresSql',
]

export const ECO_SYSTEMS = [
  'DavinciResolve',
  'EsLint',
  'Figma',
  'FiveM',
  'LuaRocks',
  'MySql',
  'MariaDB',
  'Vercel',
  'UML',
  'Replit',
  'PNPM',
  'Ngrok',
]

export const commitsData = (() => {
  const grouped = new Map<string, number>()
  for (const date of commits) grouped.set(date, (grouped.get(date) ?? 0) + 1)
  return [...grouped.entries()]
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, count]) => ({ date, count }))
})()

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})