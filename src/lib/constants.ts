import { langsBytes, commits } from "~/scripts/data.json"

export const EXCLUDED_LANGS = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript', 'Markdown', 'License', 'JSON', 'YAML', 'TOML', 'SVG']
export const filteredLangs = langsBytes.filter(lang => !EXCLUDED_LANGS.includes(lang.name))
export const totalBytes = filteredLangs.reduce((acc, lang) => acc + lang.bytes, 0)
export const STACK = [
  'Tauri',
  'Supabase',
  'Vite',
  'Node.js',
  'PostgresSql',
  'Expo',
  'Tailwind',
  'React',
  'Next.js',
]

export const ECO_SYSTEMS = [
  'LuaRocks',
  'FiveM',
  'MySql',
  'MariaDB',
  'Vercel',
  'ESLint',
  'Ngrok',
  'PNPM',
  'UML',
  'DavinciResolve',
  'Figma',
  'Replit',
]

export const EXPERIENCE = [
  'Rockstar Filming',
  'Trailer & Journey Production',
  'Scenarios Video Editing',
  'Tailored Scripts Programming',
  'FiveM Servers Consultation',
  'Problem Solving',
  'End-to-end FiveM Server Building',
]

export const QUOTES = [
  "Full Stack Is Just Where I Started",
  "College is one path, but not the only one ;)",
  "Going From Pixels To Silicon",
  "Your portfolio speaks louder than your diploma",
  "I Build The Tools Others Build With",
  "The best teacher is doing",
  "Certifications prove you passed a test, projects prove you can build",
  "The Stack Was Never The Destination",
  "It's not about where you start, it's where you finish",
  "I Write Code That Writes Code",
  "Skills pay the bills, not degrees",
  "Backend engineering is easy only at the beginning",
  "Focus on what you can do, not what paper says you can do",
]

export const INTRO = ["Self-taught developer. Started with Lua scripting, moved into TypeScript, React, Rust and systems programming. Building real products — desktop apps, web platforms, dev tools."]

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
