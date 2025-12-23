import type { Metadata } from 'next'

import type { Media, Page, Post } from '@/payload-types'

import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | null) => {
  if (!image) return null

  const url = image.url

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image as Media | null)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  return {
    description: doc?.meta?.description,
    openGraph: {
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    },
    title,
  }
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    description: 'An open-source website built with Payload and Next.js.',
    images: [
      {
        url: `${getServerSideURL()}/website-template-OG.webp`,
      },
    ],
    siteName: 'Payload Website Template',
    title: 'Payload Website Template',
    type: 'website',
    ...og,
  }
}
