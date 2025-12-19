import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        title: z.string(),
        excerpt: z.string().optional(),
        date: z.string(),
        readTime: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
