import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => ([
  {
    url: 'https://lenix.dev/en',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        en: 'https://lenix.dev/en',
        fr: 'https://lenix.dev/fr',
        ar: 'https://lenix.dev/ar',
        de: 'https://lenix.dev/de',
      },
    },
  },
])

export default sitemap