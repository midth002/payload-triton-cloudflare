import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

import { Button, type ButtonProps } from '@/components/ui/button'

type CMSLinkType = {
  appearance?: 'default' | 'outline' | 'link' | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'default',
    children,
    className,
    label,
    newTab,
    reference,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) {
    return (
      <span className={className}>
        {label}
        {children}
      </span>
    )
  }

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'default' || appearance === 'outline' || appearance === 'link') {
    return (
      <Button asChild className={className} variant={appearance} size={appearance === 'link' ? 'clear' : 'default'}>
        <Link href={href} {...newTabProps}>
          {label}
          {children}
        </Link>
      </Button>
    )
  }

  return (
    <Link className={cn(className)} href={href} {...newTabProps}>
      {label}
      {children}
    </Link>
  )
}
