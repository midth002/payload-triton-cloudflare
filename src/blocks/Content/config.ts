import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'One Third', value: 'oneThird' },
            { label: 'Half', value: 'half' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          editor: defaultLexical,
        },
      ],
    },
  ],
  labels: {
    plural: 'Content Blocks',
    singular: 'Content Block',
  },
}
