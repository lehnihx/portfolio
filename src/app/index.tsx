import { commits, langsBytes, loc } from "~/scripts/data.json"
import { motion } from "motion/react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"
import { useState } from "react"

const EXCLUDED_LANGS = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript', 'Markdown', 'License', 'JSON', 'YAML', 'TOML', 'SVG']

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay }
})

const commitsData = (() => {
  const grouped = new Map<string, number>()
  for (const date of commits) grouped.set(date, (grouped.get(date) ?? 0) + 1)
  return [...grouped.entries()]
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, count]) => ({ date, count }))
})()

const filteredLangs = langsBytes.filter(l => !EXCLUDED_LANGS.includes(l.name)).slice(0, 8)
const totalBytes = filteredLangs.reduce((a, l) => a + l.bytes, 0)

const Divider = () => <div className="h-px bg-stone-200 my-20" />

export const App = () => (
  <div className="w-screen min-h-screen bg-[#f5f0e8]">
    <div className="max-w-3xl mx-auto px-8 py-20">

      {/* Header */}
      <motion.div {...fade(0)} className="mb-20">
        <p className="text-[10px] tracking-[4px] text-stone-400 uppercase mb-6">
          Portfolio · {new Date().getFullYear()}
        </p>
        <h1 className="text-[clamp(64px,10vw,96px)] font-black tracking-[-3px] leading-none text-stone-900 mb-4">
          LENIX
        </h1>
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase mb-8">
          Full Stack Developer
        </p>
        <div className="h-px bg-stone-200" />
      </motion.div>

      {/* Stats */}
      <motion.div {...fade(0.1)} className="grid grid-cols-3 divide-x divide-stone-200 border border-stone-200 mb-20">
        {[
          { label: 'Commits', value: commits.length.toLocaleString(), sub: 'last 12 months' },
          { label: 'Lines Written', value: `${(loc / 1000).toFixed(0)}k+`, sub: 'all time additions' },
          { label: 'Repos', value: '30+', sub: 'across 3 orgs' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="p-8 group">
            <div className="text-[clamp(32px,5vw,48px)] font-black text-stone-900 leading-none tabular-nums">
              {value}
            </div>
            <div className="text-[10px] tracking-[2px] uppercase text-stone-500 mt-3">{label}</div>
            <div className="text-[10px] text-stone-400 mt-1">{sub}</div>
          </div>
        ))}
      </motion.div>

      {/* About */}
      <motion.div {...fade(0.15)} className="mb-20">
        <p className="text-[10px] tracking-[4px] text-stone-400 uppercase mb-6">About</p>
        <p className="text-stone-600 leading-relaxed text-sm max-w-lg">
          Self-taught full stack developer from Algeria. Started with Lua scripting for FiveM,
          moved into TypeScript, React, Rust and systems programming.
          Building real products — from FiveM servers to Tauri desktop apps.
        </p>
      </motion.div>

      <Divider />

      {/* Commit Activity */}
      <motion.div {...fade(0.2)} className="mb-20">
        <div className="flex items-baseline justify-between mb-6">
          <p className="text-[10px] tracking-[4px] text-stone-400 uppercase">Commit Activity</p>
          <p className="text-[10px] text-stone-400">last 12 months</p>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={commitsData}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#111', border: 'none', borderRadius: 2, fontSize: 11, padding: '6px 10px' }}
              labelStyle={{ color: '#999', marginBottom: 2 }}
              itemStyle={{ color: '#fff' }}
              cursor={{ stroke: '#ddd' }}
            />
            <Line type="monotone" dataKey="count" stroke="#111" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: '#111' }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <Divider />

      {/* Languages */}
      <motion.div {...fade(0.25)} className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[10px] tracking-[4px] text-stone-400 uppercase">Languages</p>
          <p className="text-[10px] text-stone-400">by bytes</p>
        </div>
        <div className="flex flex-col gap-3">
          {filteredLangs.map((lang, i) => {
            const pct = (lang.bytes / totalBytes) * 100
            return (
              <div key={lang.name} className="flex items-center gap-4">
                <div className="w-24 text-right text-[11px] text-stone-500 shrink-0">{lang.name}</div>
                <div className="flex-1 h-px bg-stone-200 relative">
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-stone-900 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-10 text-[11px] text-stone-400 tabular-nums">{pct.toFixed(0)}%</div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <Divider />

      {/* Stack */}
      <motion.div {...fade(0.3)} className="mb-20">
        <p className="text-[10px] tracking-[4px] text-stone-400 uppercase mb-8">Stack</p>
        <div className="flex flex-wrap gap-2">
          {['TypeScript', 'React', 'Next.js', 'Rust', 'Tauri', 'Supabase', 'Lua', 'FiveM', 'Tailwind', 'Vite'].map(tech => (
            <span key={tech} className="border border-stone-200 text-stone-600 text-[11px] tracking-wider px-3 py-1.5">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <Divider />

      {/* Contact */}
      <motion.div {...fade(0.35)}>
        <p className="text-[10px] tracking-[4px] text-stone-400 uppercase mb-8">Contact</p>
        <ContactForm />
      </motion.div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-stone-200 flex items-center justify-between">
        <p className="text-[10px] text-stone-400">© {new Date().getFullYear()} Lenix</p>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', url: 'https://github.com/lenixdev' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/lenixdev' },
            { label: 'Twitter', url: 'https://x.com/lenixdev' },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="text-[10px] tracking-[2px] uppercase text-stone-400 hover:text-stone-900 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>

    </div>
  </div>
)

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(e.currentTarget) })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-transparent border-b border-stone-200 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 font-[inherit] focus:border-stone-400 transition-colors"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
      <input name="name" type="text" placeholder="Name" required className={inputClass} />
      <input name="email" type="email" placeholder="Email" required className={inputClass} />
      <textarea name="message" placeholder="Message" required rows={4} className={`${inputClass} resize-none`} />
      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === 'sending' || status === 'sent'}
          className="bg-stone-900 text-[#f5f0e8] px-8 py-3 text-[10px] tracking-[3px] uppercase cursor-pointer hover:bg-stone-700 transition-colors disabled:opacity-50">
          {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent' : 'Send'}
        </button>
        {status === 'error' && <p className="text-[11px] text-red-500">Something went wrong</p>}
      </div>
    </form>
  )
}