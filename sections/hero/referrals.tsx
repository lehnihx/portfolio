"use client"

import { Locales } from '@/app/dictionaries';
import { Dialog } from '@/components/dialog';
import { useDict } from '@/lib/dict'
import Image from 'next/image'
import Marquee from "react-fast-marquee";

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

const Referral = ({ name, src, dict, url }: {
  name: string; src: string; dict: Locales, url: string
}) => (
  <Dialog
    metadata={{ name, url }}
    dict={dict}
  >
    <Image src={src} alt={name} width={100} height={100} className="mx-8"/>
  </Dialog>
)

const Referrals = () => {
  const dict = useDict()

  return (
    <Marquee>
      {referrals.map(({ src, alt, url }) => (
        <Referral key={alt} {...{ dict, src, url, name: alt }} />
      ))}
    </Marquee>
  )
}

export { Referrals }
