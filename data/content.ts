import type { ContentItem } from '~/types'

// Simplified content data - full interactive components will be in Vue components
export const contentData: ContentItem[] = [
  {
    id: 1,
    title: "Understanding React Server Components",
    excerpt: "A deep dive into the architecture of RSC and how it changes the way we build Next.js applications.",
    date: "Oct 12, 2023",
    category: "Development",
    readTime: "5 min read",
    isLocked: false,
  },
  {
    id: 2,
    title: "Material Design 3 深度指南",
    excerpt: "探索 Material Design 3 的设计理念、色彩系统和组件实现。",
    date: "Sep 28, 2023",
    category: "Design",
    readTime: "8 min read",
    isLocked: false,
  },
  {
    id: 3,
    title: "TypeScript 高级类型技巧",
    excerpt: "掌握 TypeScript 中的高级类型技巧，提升代码质量和开发效率。",
    date: "Sep 15, 2023",
    category: "Development",
    readTime: "6 min read",
    isLocked: true,
    unlockCode: "typescript2023",
  },
  {
    id: 4,
    title: "WebGL 性能优化实战",
    excerpt: "从实战角度出发，分享 WebGL 应用的性能优化技巧和最佳实践。",
    date: "Aug 30, 2023",
    category: "Graphics",
    readTime: "10 min read",
    isLocked: true,
    unlockCode: "webgl",
  },
]
