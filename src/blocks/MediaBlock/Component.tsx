import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'

type Props = MediaBlockProps & {
  className?: string
}

export const MediaBlockComponent: React.FC<Props> = (props) => {
  const { className, media, position = 'default' } = props

  return (
    <div
      className={cn(
        {
          container: position === 'default',
        },
        className,
      )}
    >
      {media && typeof media === 'object' && (
        <Media
          className={cn('rounded-lg overflow-hidden', {
            'aspect-video': position === 'default',
          })}
          imgClassName="w-full h-full object-cover"
          resource={media}
        />
      )}
    </div>
  )
}
