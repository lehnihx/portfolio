import { cache } from "@/lib/cache"
import { NumberTicker } from "@/components/ui/number-ticker"

export const SuspenseLOC = async () => {
  const insights = await cache.insights()
  return <NumberTicker value={insights?.loc || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-foreground" />
}