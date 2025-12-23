import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ArchiveBlock as ArchiveBlockProps, Post } from '@/payload-types'

import { cn } from '@/utilities/cn'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import { Media } from '@/components/Media'

type Props = ArchiveBlockProps & {
  className?: string
}

export const ArchiveBlockComponent: React.FC<Props> = async (props) => {
  const { className, introContent, limit = 3, populateBy, selectedDocs, relationTo, categories } =
    props

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo || 'posts',
      depth: 1,
      limit: limit || 3,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs as Post[]
  } else {
    if (selectedDocs?.length) {
      posts = selectedDocs
        .map((doc) => {
          if (typeof doc.value === 'object') return doc.value
          return null
        })
        .filter((post): post is Post => post !== null)
    }
  }

  return (
    <div className={cn('container', className)}>
      {introContent && (
        <div className="mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          const { slug, title, heroImage } = post

          return (
            <Link
              key={index}
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
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
