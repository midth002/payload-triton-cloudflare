import { cn } from '@/utilities/cn'
import React, { Fragment } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export interface Props {
  className?: string
  htmlElement?: React.ElementType | null
  imgClassName?: string
  priority?: boolean
  resource?: MediaType | string | number | null
  size?: string
  src?: string
  alt?: string
  fill?: boolean
}

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource, imgClassName } = props

  const isVideo =
    typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia {...props} />
      ) : (
        <ImageMedia {...props} imgClassName={imgClassName} />
      )}
    </Tag>
  )
}
