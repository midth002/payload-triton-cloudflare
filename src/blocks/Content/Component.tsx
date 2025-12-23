import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { cn } from '@/utilities/cn'
import { RichText } from '@/components/RichText'

type Props = ContentBlockProps & {
  className?: string
}

export const ContentBlockComponent: React.FC<Props> = ({ className, columns }) => {
  const colsSpanClasses: Record<string, string> = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className={cn('container', className)}>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`)}
                key={index}
              >
                {richText && <RichText content={richText} enableGutter={false} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
