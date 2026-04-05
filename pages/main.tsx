import { Introduc } from '@/components/articles/introduct'
import { Stats } from '@/components/articles/insights'
import { Activity } from '@/components/articles/activity'
import { Langs } from '@/components/articles/langs'
import { Footer } from '@/components/articles/footer'
import { Quotes } from '@/components/articles/quote'
import { DataProvider } from '@/lib/context'
import { Skills } from '@/components/articles/skills'
import { Timeline } from '@/components/articles/timeline'

export const Main = () => (
	<DataProvider>
		<div className='w-full flex justify-evenly bg-background text-foreground'>
			<div className='landscape:w-2/3 portrait:w-6/7 h-full flex flex-col gap-20'>
				<div className='h-screen portrait:min-h-[150vh] flex flex-col justify-between'>
					<div className='min-h-5/10 flex items-end'>
						<Introduc />
					</div>
					<div className='min-h-5/10 flex flex-col justify-center'>
						<Skills />
					</div>
				</div>
				<div className='min-h-screen flex flex-col justify-evenly'>
					<Stats />
					<Activity />
					<Langs />
				</div>
				<Timeline />
				<div>
					<Quotes />
				</div>
				<div className='mt-12'>
					<Footer />
				</div>
			</div>
		</div>
	</DataProvider>
)
