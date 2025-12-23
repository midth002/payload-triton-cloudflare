import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { Plugin } from 'payload'

import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { getServerSideURL } from '@/utilities/getURL'

import type { Page, Post } from '@/payload-types'

const generateTitle = ({ doc }: { doc: Partial<Page> | Partial<Post> }): string => {
  return doc?.title ? `${doc.title} | Payload Website` : 'Payload Website'
}

const generateURL = ({ doc }: { doc: Partial<Page> | Partial<Post> }): string => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                ...('admin' in field ? field.admin : {}),
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        }) as typeof defaultFields
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
