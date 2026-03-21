import { SuspenseCommits } from "@/articles/commits"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

export const Commits = async () => {
  const insights = await cache.insights()
  return (
    <Suspense fallback={<SuspenseCommits insights={insights} />}>
      <SkeletonCommits />
    </Suspense>
  )
}