import { EXPERIENCE, fade, INTRO } from '@/lib/constants'
import { motion } from 'motion/react'
import RotatingText from './ui/swap'
import { TypingAnimation } from './ui/typing'
// import { Referrals } from "./referrals"

export const Hero = () => (
	<motion.div {...fade(0)} className='flex flex-col justify-center gap-2'>
		<p className='text-[11px] tracking-[3px] text-foreground/30 uppercase mb-5'>
			Full Stack Developer - Senior FiveM Scripting Engineer
		</p>
		<h1 className='text-5xl font-semibold tracking-tight text-foreground mb-3'>
			Lenix
		</h1>
		<div className='relative w-full max-w-4xl px-4'>
			<div className='invisible text-sm text-foreground/50 leading-relaxed'>
				{INTRO.reduce((acc, itr) => (acc.length > itr.length ? acc : itr))}
			</div>
			<TypingAnimation
				as='div'
				words={INTRO}
				cursorStyle='line'
				typeSpeed={50}
				loop
				deleteSpeed={10}
				className='absolute inset-0 text-sm text-foreground/50 leading-relaxed'
			/>
		</div>
		<div className='text-foreground/30'>
			<span>I used to do </span>
			<RotatingText
				texts={EXPERIENCE}
				mainClassName='inline-flex flex-wrap whitespace-normal align-baseline'
			/>
		</div>
	</motion.div>
)
