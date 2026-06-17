import { isContact } from '@/lib/utils'
import { ArrowUpRight } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export const Footer = () => {
	const contact = isContact()
	return (
		<div className='border-t border-foreground/10 flex items-center justify-between gap-10'>
			<p className='text-[11px] text-foreground/20'>
				© {new Date().getFullYear()} Lenix
			</p>
			<div className='flex gap-4'>
				{[
					{ label: 'GitHub', url: 'https://github.com/lehnhix' },
					{
						label: contact ? 'Back' : 'Contact',
						url: contact ? 'https://lenix.dev' : 'https://contact.lenix.dev',
						replace: true,
					},
				].map(({ label, url, replace }) => (
					<a
						key={label}
						href={url}
						target={replace === true ? '_self' : '_blank'}
						rel='noopener noreferrer'
						className='text-[11px] tracking-[2px] uppercase text-foreground/20 hover:text-foreground transition-colors group flex items-center gap-1'
					>
						{label}
						{!replace && <HugeiconsIcon icon={ArrowUpRight} size={15} className='opacity-0 group-hover:opacity-100' />}
					</a>
				))}
			</div>
		</div>
	)
}
