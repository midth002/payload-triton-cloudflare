import React from 'react'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'

import { generateMeta } from '@/utilities/generateMeta'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return notFound()
  }

  const { title, heroImage, content, publishedAt, authors, categories } = post

  return (
    <article className="pt-16 pb-24">
      <div className="container">
        <div className="max-w-[48rem] mx-auto">
          <div className="mb-8">
            {categories && categories.length > 0 && (
              <div className="flex gap-2 mb-4">
                {categories.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    return (
                      <span
                        key={index}
                        className="text-sm bg-secondary px-2 py-1 rounded"
                      >
                        {category.title}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex gap-4 text-muted-foreground text-sm">
              {publishedAt && <time>{formatDateTime(publishedAt)}</time>}
              {authors && authors.length > 0 && (
                <span>
                  by{' '}
                  {authors
                    .map((author) => {
                      if (typeof author === 'object' && author !== null) {
                        return author.name || author.email
                      }
                      return null
                    })
                    .filter(Boolean)
                    .join(', ')}
                </span>
              )}
            </div>
          </div>

          {heroImage && typeof heroImage === 'object' && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Media fill imgClassName="object-cover" priority resource={heroImage} />
            </div>
          )}

          {content && <RichText content={content} enableGutter={false} />}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs?.map(({ slug }) => {
    return { slug }
  })

  return params
}

async function queryPostBySlug({ slug }: { slug: string }) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}
