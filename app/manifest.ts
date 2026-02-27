import type { MetadataRoute } from 'next'
 
const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: 'https://lenix.dev',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://lenix.dev/en',
          fr: 'https://lenix.dev/fr',
          ar: 'https://lenix.dev/ar',
          de: 'https://lenix.dev/de',
        },
      },
    },
  ]
}

export default sitemap