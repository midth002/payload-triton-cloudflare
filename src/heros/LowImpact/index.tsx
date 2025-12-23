import React from 'react'

import type { Page } from '@/payload-types'

import { RichText } from '@/components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
