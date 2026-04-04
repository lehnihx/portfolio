import { ECO_SYSTEMS, fade, STACK } from '@/lib/constants'
import { motion } from 'motion/react'
import { Badge } from './ui/badge'

export const Stack = () => (
	<div className='flex flex-col gap-5'>
		<motion.div {...fade(0.25)} className='flex flex-col items-center gap-2'>
			<p className='text-[11px] tracking-[3px] text-foreground/40 uppercase'>
				Stack
			</p>
			<div className='flex flex-wrap gap-2'>
				{STACK.map(tech => (
					<Badge
						key={tech}
						variant="outline"
						className='text-foreground/50'
					>{tech}</Badge>
				))}
			</div>
		</motion.div>
		<motion.div {...fade(0.25)} className='flex flex-col items-center gap-2'>
			<p className='text-[11px] tracking-[3px] text-foreground/40 uppercase'>
				Ecosystem
			</p>
			<div className='flex flex-wrap gap-2'>
				{ECO_SYSTEMS.map(eco => (
					<Badge
						key={eco}
						variant="outline"
						className='text-foreground/50'
					>{eco}</Badge>
				))}
			</div>
		</motion.div>
	</div>
)
