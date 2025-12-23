import React from 'react'

import type { CallToActionBlock as CallToActionBlockProps } from '@/payload-types'

import { cn } from '@/utilities/cn'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type Props = CallToActionBlockProps & {
  className?: string
}

export const CallToActionBlockComponent: React.FC<Props> = ({ className, links, richText }) => {
  return (
    <div className={cn('container', className)}>
      <div className="bg-card rounded border border-border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
