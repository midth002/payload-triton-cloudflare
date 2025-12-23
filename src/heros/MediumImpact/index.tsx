import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="max-w-[48rem]">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex gap-4">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} {...link} />
              })}
            </div>
          )}
        </div>
        {media && typeof media === 'object' && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Media fill imgClassName="object-cover" priority resource={media} />
          </div>
        )}
      </div>
    </div>
  )
}
