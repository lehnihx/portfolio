"use client"

import { Locales } from '@/app/dictionaries';
import { Tooltip } from '@/components/tooltip';
import { useDialog } from '@/lib/dialog';
import { useDict } from '@/lib/dict';
import { Fiverr, Grey, Qoder } from '@/lib/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";

const referrals = [
  {
    key: 'fiverr' satisfies keyof Locales,
    Icon: Fiverr,
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    key: 'qoder' satisfies keyof Locales,
    Icon: Qoder,
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    key: 'grey' satisfies keyof Locales,
    Icon: Grey,
    url: 'https://greyapp.page.link/jixhVD5wH6mdykEY7',
  },
] as const

const Referrals = () => {
  const Dialog = useDialog()
  const Dict = useDict()
  const { systemTheme } = useTheme()
  const [gradientColor, setGradientColor] = useState('black')

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
    setGradientColor(value)
  }, [systemTheme])
  return (
    <Marquee autoFill pauseOnHover gradient gradientColor={gradientColor}>
      {referrals.map(({ key, Icon, url }, index) =>
        <Tooltip tooltip={Dict[key]}>
          <Icon 
            key={index}
            className={`${systemTheme === 'light' ? 'text-black' : 'text-white/70'} size-20 mx-10 cursor-pointer! duration-300 hover:scale-105`}
            onClick={() => Dialog(url)}
          />
        </Tooltip>
      )}
    </Marquee>
  )
}

export { Referrals }
