import { commits, loc } from "~/scripts/data.json"
import { commitsData, fade } from "@/lib/constants"
import { motion } from "motion/react"
import { Count } from "./ui/count"

export const Stats = () => (
  <motion.div {...fade(0.1)} className="grid grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-lg overflow-hidden mb-16">
    {[
      { label: 'Commits', value: commits.length, sub: 'last 12 months' },
      { label: 'Lines implemented', value: Math.round(loc.added / 1000), sub: 'all time' },
      { label: 'Average commits per commit-day', value: (commits.length / commitsData.length).toFixed(1), sub: 'last 12 months' },
      { label: 'Lines refactored', value: Math.round(loc.deleted / 1000), sub: 'all time' },
    ].map(({ label, value, sub }) => (
      <div key={label} className="bg-zinc-950 px-5 py-6 text-center">
        <p className="text-2xl font-semibold text-white tabular-nums"><Count value={Number(value)} />{label !== 'Commits' && label !== 'Average commits per commit-day' && 'k'}</p>
        <p className="text-[11px] text-zinc-400 mt-1">{label}</p>
        <p className="text-[10px] text-zinc-600 mt-0.5">{sub}</p>
      </div>
    ))}
  </motion.div>
)