import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lenix Dev',
    short_name: 'Lenix',
    description: "Lenix Dev's portfolio — Full Stack Developer",
    start_url: '/en',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}