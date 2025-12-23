'use client'

import { cn } from '@/utilities/cn'
import NextImage from 'next/image'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import type { Props as MediaProps } from './index'

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: string = srcFromProps || ''

  if (typeof resource === 'object' && resource !== null) {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth ?? undefined
    height = fullHeight ?? undefined
    alt = altFromResource || ''

    src = url || ''
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      priority={priority}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
    />
  )
}
