import { fade } from '@/lib/constants'
import { motion } from 'motion/react'

export const Download = () => (
	<motion.div {...fade(0.1)}>
		<p className='text-[11px] tracking-[3px] text-foreground/30 uppercase mb-5'>
			Downloads
		</p>
		<div className='grid grid-cols-2 portrait:grid-cols-1 gap-px border border-foreground/10 rounded-lg overflow-hidden'>
			<a
				href='/resume.pdf'
				download
				className='px-5 py-6 text-center text-[11px] tracking-[2px] uppercase text-foreground/30 hover:text-foreground transition-colors'
			>
				Resume
			</a>
		</div>
	</motion.div>
)
