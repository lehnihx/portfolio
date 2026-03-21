import { CommitsChart, CommitsShell } from "@/articles/commits"
import { cache } from "@/lib/cache"
import { Suspense } from "react"
import { SkeletonLOC } from "../skeletons/loc"

const CommitsData = async () => {
  const insights = await cache.insights()
  console.log(insights)
  return <CommitsChart commits={insights.commits} />
}

export const Commits = () => (
  <CommitsShell>
    <Suspense fallback={<SkeletonLOC />}>
      <CommitsData />
    </Suspense>
  </CommitsShell>
)