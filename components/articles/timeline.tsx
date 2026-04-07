import { HugeiconsIcon } from '@hugeicons/react'
import { Tick02Icon } from '@hugeicons/core-free-icons'
import { TimelineLayout } from '../timeline'

export const Timeline = () => (
	<TimelineLayout
		animate
		className='min-h-[600px] w-full max-w-full flex items-center justify-center'
		connectorColor='primary'
		iconColor='primary'
		items={[
			{
				id: 1,
				date: '2008-01-01',
				title: 'Hello world',
				description: 'Get into computers world.',
				icon: <HugeiconsIcon icon={Tick02Icon} />,
				color: 'success',
			},
			{
				id: 2,
				date: '2023-10-18',
				title: 'Revival States Foundation',
				description:
					'Start building a FiveM server by copy pasting some scripts from the community and try to invite as much staff and players as possible.',
				icon: <HugeiconsIcon icon={Tick02Icon} />,
				color: 'success',
			},
			{
				id: 3,
				date: '2024-02-05',
				title: 'Trippler Scripts Foundation',
				description:
					'Open an enterprise dedicated to the FiveM community that focuses on creating clean, efficient, and reliable scripts that make server management easier and more sustainable.',
				icon: <HugeiconsIcon icon={Tick02Icon} />,
				color: 'success',
			},
			{
				id: 4,
				date: '2024-09-17',
				title: 'Lenix Studio Foundation',
				description:
					'Launch a volunteered project focused on FiveM development that helps students, developers, programmers and server owners to achieve their goals and provide services such as end-to-end server building, tailored scripts, rockstar filming, trailer & journey production, scenario video editing, problem solving, support, teaching new students, etc.',
				icon: <HugeiconsIcon icon={Tick02Icon} />,
				color: 'success',
			},
		]}
		size='md'
	/>
)
