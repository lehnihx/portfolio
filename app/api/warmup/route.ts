import { cachedInsights } from "@/lib/insights"
import cachedReviews from "@/lib/reviews"
import { NextResponse } from "next/server"

export const GET = async () => {
  await Promise.all([
    cachedInsights(),
    cachedReviews("en"),
    cachedReviews("fr"),
    cachedReviews("ar"),
    cachedReviews("de"),
  ])
  return NextResponse.json({ ok: true })
}