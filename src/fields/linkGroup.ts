import type { ArrayField, Field } from 'payload'

import { link, type LinkAppearances } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [link({ appearances })],
    ...overrides,
  }

  return generatedLinkGroup
}
