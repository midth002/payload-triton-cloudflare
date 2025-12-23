'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const data = useRowLabel<{ link?: { label?: string } }>()

  const label = data?.data?.link?.label || 'Nav Item'

  return <div>{label}</div>
}
