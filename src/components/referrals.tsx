import { Fiverr, Grey, Qoder } from '@/lib/icons'
import Marquee from "react-fast-marquee"

const referrals = [
  {
    key: 'fiverr',
    Icon: Fiverr,
    url: 'https://www.fiverr.com/pe/YRNR08z',
  },
  {
    key: 'qoder',
    Icon: Qoder,
    url: 'https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb',
  },
  {
    key: 'grey',
    Icon: Grey,
    url: 'https://greyapp.page.link/jixhVD5wH6mdykEY7',
  },
] as const

export const Referrals = () => {
  return (
    <Marquee className='overflow-hidden' autoFill pauseOnHover gradient gradientColor={'var(--background)'}>
      {referrals.map(({ key, Icon, url }, index) =>
        <Icon key={`${key}-${index}`} onClick={() => window.open(url, '_blank')}
          className={`size-20 mx-10 cursor-pointer! duration-300 hover:scale-105`}
        />
      )}
    </Marquee>
  )
}