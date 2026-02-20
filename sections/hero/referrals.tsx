"use client"

import { InfiniteSlider } from '@/components/core/infinite-slider'
import { Dialog } from '@/components/dialog'
import { useDict } from '@/lib/dict'
import Image from 'next/image'

const referrals = [
  {
    src: '/fiverr.svg',
    alt: 'Fiverr',
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    src: '/qoder.svg',
    alt: 'Qoder',
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    src: '/grey.svg',
    alt: 'Grey',
    url: 'https://greyapp.page.link/jixhVD5wH6mdykEY7',
  },
]

const Referrals = () => {
  const dict = useDict()

  return (
    
  )
}

export { Referrals }
