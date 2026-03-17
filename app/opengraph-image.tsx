import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Lenix Dev — Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const Image = async () => {
  const interSemiBold = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 80, fontWeight: 700, color: '#ffffff' }}>Lenix</span>
        <span style={{ fontSize: 28, color: '#888888' }}>Full Stack Developer</span>
        <span style={{ fontSize: 20, color: '#555555' }}>lenix.dev</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interSemiBold, style: 'normal', weight: 600 }],
    }
  )
}

export default Image