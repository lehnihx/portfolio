"use client"

import { useDialog } from '@/lib/dialog';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";

const referrals = [
  {
    src: '/fiverr.svg',
    darksrc: '/fiverr-dark.svg',
    alt: 'Fiverr',
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    src: '/qoder.svg',
    darksrc: '/qoder-dark.svg',
    alt: 'Qoder',
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    src: '/grey.svg',
    darksrc: '/grey-dark.svg',
    alt: 'Grey',
    url: 'https://greyapp.page.link/jixhVD5wH6mdykEY7',
  },
]

const Referrals = () => {
  const Dialog = useDialog()
  const { systemTheme } = useTheme()
  const [gradientColor, setGradientColor] = useState('black')

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
    setGradientColor(value)
  }, [])
  return (
    <Marquee autoFill pauseOnHover gradient gradientColor={gradientColor}>
      {referrals.map(({ src, alt, url, darksrc }, index) => (
        <Image
          key={`${alt}-${index}`}
          src={systemTheme === 'dark' ? src : darksrc || src}
          alt={alt}
          width={100}
          height={100}
          className="mx-10 cursor-pointer! duration-300 hover:scale-105"
          onClick={() => Dialog(url)}
        />
      ))}
    </Marquee>
  )
}

export { Referrals }
