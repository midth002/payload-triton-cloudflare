import type { Block } from 'payload'

export const RelatedPosts: Block = {
  slug: 'relatedPosts',
  interfaceName: 'RelatedPostsBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
    },
    {
      name: 'docs',
      type: 'relationship',
      hasMany: true,
      relationTo: 'posts',
    },
  ],
  labels: {
    plural: 'Related Posts Blocks',
    singular: 'Related Posts Block',
  },
}
