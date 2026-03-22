import { commits, langsBytes, loc } from "~/scripts/data.json"
import { motion } from "motion/react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"

const EXCLUDED_LANGS = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript', 'Markdown', 'License', 'JSON', 'YAML', 'TOML', 'SVG']

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }

const commitsData = (() => {
  const grouped = new Map<string, number>()
  for (const date of commits) grouped.set(date, (grouped.get(date) ?? 0) + 1)
  return [...grouped.entries()]
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, count]) => ({ date, count }))
})()

const filteredLangs = langsBytes
  .filter(l => !EXCLUDED_LANGS.includes(l.name))
  .slice(0, 8)

const totalBytes = filteredLangs.reduce((a, l) => a + l.bytes, 0)

const COLORS = ['#111', '#333', '#555', '#777', '#888', '#999', '#aaa', '#bbb']

export const App = () => (
  <div className="w-full min-h-screen flex justify-center bg-[#e8f5f5]">
    <div className="landscape:w-1/2 mx-auto px-6 py-20">

      {/* Header */}
      <motion.div {...fade} className="border-b border-stone-200 pb-10 mb-16">
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase mb-4">
          Portfolio · {new Date().getFullYear()}
        </p>
        <h1 className="text-[clamp(48px,8vw,80px)] font-black tracking-tight leading-none text-stone-900 mb-3">
          LENIX
        </h1>
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase">
          Full Stack Developer
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div {...fade} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-3 gap-px bg-stone-200 border border-stone-200 mb-16">
        {[
          { label: 'Commits', value: commits.length.toLocaleString(), sub: 'last 12 months' },
          { label: 'Lines Written', value: loc.toLocaleString(), sub: 'all time' },
          { label: 'Repos', value: '30+', sub: 'across 3 orgs' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-[#e8f5f5] p-8">
            <div className="text-[clamp(28px,4vw,40px)] font-black text-stone-900 leading-none">{value}</div>
            <div className="text-[11px] tracking-[2px] uppercase text-stone-900 mt-2">{label}</div>
            <div className="text-[11px] text-stone-400 mt-1">{sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Commits Chart */}
      <motion.div {...fade} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16">
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase mb-6">Commit Activity</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={commitsData}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#111', border: 'none', borderRadius: 4, fontSize: 12 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="count" stroke="#111" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="h-px bg-stone-200 mb-16" />

      {/* Languages */}
      <motion.div {...fade} transition={{ duration: 0.6, delay: 0.3 }} className="mb-16">
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase mb-6">Languages</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={filteredLangs} layout="vertical" barSize={16}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} width={100} />
            <Tooltip
              formatter={(v: number) => [`${((v / totalBytes) * 100).toFixed(1)}%`, '']}
              contentStyle={{ background: '#111', border: 'none', borderRadius: 4, fontSize: 12 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="bytes" radius={2}>
              {filteredLangs.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="h-px bg-stone-200 mb-16" />

      {/* Contact */}
      <motion.div {...fade} transition={{ duration: 0.6, delay: 0.4 }}>
        <p className="text-[11px] tracking-[3px] text-stone-400 uppercase mb-6">Contact</p>
        <ContactForm />
      </motion.div>
    </div>
  </div>
)

const ContactForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    await fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    form.reset()
  }

  const inputClass = "w-full bg-transparent border-b border-stone-200 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 font-[inherit]"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <input name="name" type="text" placeholder="Name" required className={inputClass} />
      <input name="email" type="email" placeholder="Email" required className={inputClass} />
      <textarea name="message" placeholder="Message" required rows={4}
        className={`${inputClass} resize-none`} />
      <button type="submit"
        className="self-start bg-stone-900 text-[#e8f5f5] px-8 py-3 text-[11px] tracking-[2px] uppercase cursor-pointer hover:bg-stone-700 transition-colors">
        Send
      </button>
    </form>
  )
}