export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { insights } = await import('@/lib/insights')
    const { fetchReviews } = await import('@/lib/reviews')
    await Promise.all([
      insights(),
      fetchReviews('en'),
      fetchReviews('fr'),
      fetchReviews('ar'),
      fetchReviews('de'),
    ]).catch(console.error)
  }
}