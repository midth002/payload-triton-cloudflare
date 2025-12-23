import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const heroTypes = ['none', 'lowImpact', 'mediumImpact', 'highImpact'] as const

export type HeroType = (typeof heroTypes)[number]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'High Impact', value: 'highImpact' },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => ['lowImpact', 'mediumImpact', 'highImpact'].includes(type),
      },
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => ['lowImpact', 'mediumImpact', 'highImpact'].includes(type),
        },
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact', 'highImpact'].includes(type),
      },
      relationTo: 'media',
    },
  ],
  label: false,
}
