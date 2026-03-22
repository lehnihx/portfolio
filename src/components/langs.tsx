import { fade, filteredLangs, totalBytes } from "@/constants"
import { motion } from "motion/react"

export const Langs = () => (
  <motion.div {...fade(0.2)} className="mb-16">
    <div className="flex items-center justify-between mb-6">
      <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase">Languages</p>
      <p className="text-[11px] text-zinc-600">by bytes</p>
    </div>
    <div className="flex flex-col gap-3">
      {filteredLangs.map((lang, i) => {
        const pct = (lang.bytes / totalBytes) * 100
        return (
          <div key={lang.name} className="flex items-center gap-4">
            <p className="w-24 text-right text-[12px] text-zinc-400 shrink-0">{lang.name}</p>
            <div className="flex-1 h-px bg-zinc-800 relative">
              <motion.div
                className="absolute hover:bg-zinc-300 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="w-8 text-[11px] text-zinc-600 tabular-nums">{pct.toFixed(1)}%</p>
          </div>
        )
      })}
    </div>
  </motion.div>
)