import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PostsPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      heroImage: true,
      publishedAt: true,
      categories: true,
    },
  })

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.docs.map((post) => {
          const { slug, title, heroImage, publishedAt } = post

          return (
            <Link
              key={post.id}
              href={`/posts/${slug}`}
              className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              {heroImage && typeof heroImage === 'object' && (
                <div className="aspect-video relative overflow-hidden">
                  <Media
                    className="absolute inset-0"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    resource={heroImage}
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                {publishedAt && (
                  <time className="text-sm text-muted-foreground">
                    {formatDateTime(publishedAt)}
                  </time>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
