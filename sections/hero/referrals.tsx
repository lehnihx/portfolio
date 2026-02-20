import LogoLoop from '@/components/ui/LogoLoop'
import Image from 'next/image'
import { SiFiverr } from 'react-icons/si'
import Grey from '@/public/grey.svg'

const techLogos = [
  { node: <SiFiverr/>, title: "Fiverr", href: "https://www.fiverr.com/pe/YRNR08z" },
  { node: <Image src="https://img.alicdn.com/imgextra/i2/O1CN01js79rH1mt5nkV0kEl_!!6000000005011-55-tps-640-180.svg" alt="Qoder" width={100} height={100} />, title: "Qoder", href: "https://qoder.com/referral?referral_code=oyPcpnNF4QB2Rw2tjdglEkanB6w5RpTb" },
  { node: <Image src={Grey} alt="Grey" width={100} height={100} />, title: "Grey", href: "https://greyapp.page.link/jixhVD5wH6mdykEY7" },
]

const Referrals = () => (
  <div style={{ height: 'fit-content', position: 'relative', overflow: 'hidden' }} className='dark:bg-neutral-900'>
    <LogoLoop
      logos={techLogos}
      speed={10}
      direction="left"
      logoHeight={60}
      gap={60}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel="Referrals"
    />
  </div>
)

export { Referrals }
