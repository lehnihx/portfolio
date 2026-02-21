import { Tooltip } from '@ark-ui/react/tooltip'
import { useCallback, useRef } from 'react'

export const FollowingTooltip = ({ tooltip, children }: { tooltip: React.ReactNode; children: React.ReactNode }) => {
  const anchorRect = useRef<DOMRect | null>(null)
  const getAnchorRect = useCallback(() => anchorRect.current, [])

  return (
    <Tooltip.Root
      openDelay={0}
      positioning={{
        gutter: 4,
        placement: 'top-start',
        getAnchorRect,
      }}
    >
      <Tooltip.Context>
        {(tootlip) => (
          <Tooltip.Trigger
            onPointerMove={(e) => {
              anchorRect.current = new DOMRect(e.clientX, e.clientY, 1, 1)
              tootlip.reposition()
            }}
          >
            {children}
          </Tooltip.Trigger>
        )}
      </Tooltip.Context>
      <Tooltip.Positioner>
        <Tooltip.Content className='text-sm bg-accent/50 px-2 py-1 rounded-md'>{tooltip}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

export { FollowingTooltip as Tooltip }