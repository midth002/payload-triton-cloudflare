import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument<T extends Collection>(
  collection: T,
  slug: string,
  depth = 0,
): Promise<Config['collections'][T] | null> {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (page.docs[0] as Config['collections'][T]) || null
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = <T extends Collection>(collection: T, slug: string, depth = 0) =>
  unstable_cache(async () => getDocument<T>(collection, slug, depth), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
