"use client"
import { Dict } from '@/lib/dictionaries'
import { useDialog } from '@/hooks/useDialog'
import { Fiverr, Grey, Qoder } from '@/lib/icons'
import { useTheme } from 'next-themes'
import Marquee from "react-fast-marquee"
import { useIsInView } from '@/hooks/useIsInView'

const referrals = [
  {
    key: 'fiverr' satisfies keyof Dict,
    Icon: Fiverr,
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    key: 'qoder' satisfies keyof Dict,
    Icon: Qoder,
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    key: 'grey' satisfies keyof Dict,
    Icon: Grey,
    url: 'https://greyapp.page.link/jixhVD5wH6mdykEY7',
  },
] as const

export const Referrals = () => {
  const { ref, height, visible } = useIsInView()
  const dialog = useDialog()
  const { resolvedTheme } = useTheme()

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {visible && (
        <article>
          <Marquee className='overflow-hidden' autoFill pauseOnHover gradient gradientColor={'var(--background)'}>
            {referrals.map(({ key, Icon, url }, index) =>
              <Icon key={`${key}-${index}`} onClick={() => dialog(url)}
                className={`${resolvedTheme === 'light' ? 'text-foreground/33 hover:text-foreground' : 'text-foreground/70 hover:text-foreground'} size-20 mx-10 cursor-pointer! duration-300 hover:scale-105`}
              />
            )}
          </Marquee>
        </article>
      )}
    </div>
  )
}