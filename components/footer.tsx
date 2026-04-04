import { isContact } from '@/lib/utils'

export const Footer = () => {
	const contact = isContact()
	return (
		<div className='border-t border-foreground/10 flex items-center justify-between gap-10'>
			<p className='text-[11px] text-foreground/20'>
				© {new Date().getFullYear()} Lenix
			</p>
			<div className='flex gap-4'>
				{[
					{
						label: contact ? 'Back' : 'Contact',
						url: contact ? 'https://lenix.dev' : 'https://contact.lenix.dev',
						replace: true,
					},
					{ label: 'GitHub', url: 'https://github.com/lenixdev' },
				].map(({ label, url, replace }) => (
					<a
						key={label}
						href={url}
						target={replace === true ? '_self' : '_blank'}
						rel='noopener noreferrer'
						className='text-[11px] tracking-[2px] uppercase text-foreground/20 hover:text-foreground transition-colors'
					>
						{label}
					</a>
				))}
			</div>
		</div>
	)
}
