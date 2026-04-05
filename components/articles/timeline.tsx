import { HugeiconsIcon } from '@hugeicons/react'
import { Check, GitBranch, Github } from '@hugeicons/core-free-icons'
import { TimelineLayout } from '../timeline'

export const Timeline = () => (
  <TimelineLayout
    animate
    className="min-h-[600px] w-full max-w-2xl mx-auto p-8 flex items-center justify-center"
    connectorColor="primary"
    iconColor="primary"
    items={[
      {
        color: undefined,
        date: '2024-01-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: <HugeiconsIcon icon={Check} />,
        id: 1,
        status: 'completed',
        title: 'First event'
      },
      {
        color: undefined,
        date: '2024-02-01',
        description: 'Aut eius excepturi ex recusandae eius est minima molestiae.',
        icon: <HugeiconsIcon icon={Github} />,
        id: 2,
        status: 'in-progress',
        title: 'Second event'
      },
      {
        color: undefined,
        date: '2024-03-01',
        description: 'Sit culpa quas ex nulla animi qui deleniti minus.',
        icon: <HugeiconsIcon icon={GitBranch} />,
        id: 3,
        status: 'pending',
        title: 'Third event'
      }
    ]}
    size="md"
  />
)