'use client'

import { cn } from '@/utilities/cn'
import React, { useEffect, useRef } from 'react'

import type { Media as MediaType } from '@/payload-types'

import type { Props as MediaProps } from './index'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { className, resource } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // handle suspend
      })
    }
  }, [])

  if (typeof resource === 'object' && resource !== null) {
    const { url } = resource

    return (
      <video
        autoPlay
        className={cn(className)}
        controls={false}
        loop
        muted
        playsInline
        ref={videoRef}
      >
        <source src={url || ''} />
      </video>
    )
  }

  return null
}
