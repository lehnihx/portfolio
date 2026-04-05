import { ECO_SYSTEMS, STACK } from '@/lib/constants'
import { motion } from 'motion/react'
import { Badge } from '../ui/badge'
import { fade } from '@/lib/utils'

export const Skills = () => (
	<div className='flex flex-col gap-5'>
		<div className='flex flex-col items-center gap-2'>
			<motion.p
				{...fade(0.125)}
				className='text-[11px] tracking-[3px] text-foreground/40 uppercase'
			>
				Stack
			</motion.p>
			<motion.div {...fade(0.1251)} className='flex flex-wrap gap-2'>
				{STACK.map(tech => (
					<Badge key={tech} variant='outline' className='text-foreground/50'>
						{tech}
					</Badge>
				))}
			</motion.div>
		</div>
		<div className='flex flex-col items-center gap-2'>
			<motion.p
				{...fade(0.125)}
				className='text-[11px] tracking-[3px] text-foreground/40 uppercase'
			>
				Ecosystem
			</motion.p>
			<motion.div {...fade(0.125)} className='flex flex-wrap gap-2'>
				{ECO_SYSTEMS.map(eco => (
					<Badge key={eco} variant='outline' className='text-foreground/50'>
						{eco}
					</Badge>
				))}
			</motion.div>
		</div>
	</div>
)
