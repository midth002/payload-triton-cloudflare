import type { FieldHook } from 'payload'

export const populatePublishedAt: FieldHook = ({ data, operation, value }) => {
  if (operation === 'create' || operation === 'update') {
    if (data && !value && data._status === 'published') {
      return new Date()
    }
  }

  return value
}
