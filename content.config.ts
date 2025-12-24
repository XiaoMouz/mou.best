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
        // 自定义头图
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        // 自定义主题配置
        theme: z.object({
          primaryColor: z.string().optional(),
          backgroundColor: z.string().optional(),
          textColor: z.string().optional(),
          fontSize: z.enum(['sm', 'base', 'lg', 'xl']).optional(),
          fontFamily: z.enum(['sans', 'serif', 'mono', 'custom']).optional(),
          fontWeight: z.enum(['light', 'normal', 'medium', 'semibold', 'bold']).optional(),
          lineHeight: z.enum(['tight', 'normal', 'relaxed', 'loose']).optional(),
        }).optional(),
      }),
    }),
  },
})
