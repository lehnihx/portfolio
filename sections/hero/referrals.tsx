"use client"

import { Tooltip } from '@/components/tooltip';
import { useDialog } from '@/lib/dialog';
import { Fiverr, Grey, Qoder } from '@/lib/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";

const referrals = [
  {
    Icon: Fiverr,
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    Icon: Qoder,
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    Icon: Grey,
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
      {referrals.map(({ Icon, url }, index) =>
        <Tooltip tooltip={url}>
          <Icon 
            key={index}
            className={`${systemTheme === 'light' && 'fill-black'} size-20 mx-10 cursor-pointer! duration-300 hover:scale-105`}
            onClick={() => Dialog(url)}
          />
        </Tooltip>
      )}
    </Marquee>
  )
}

export { Referrals }
