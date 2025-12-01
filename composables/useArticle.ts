import type { Comment } from '~/types'

export interface ArticleConfig {
  allowSectionComments: boolean
  allowGeneralComments: boolean
}

export const useArticle = () => {
  const activeSection = useState<string | null>('activeSection', () => null)
  const isDrawerOpen = useState('isDrawerOpen', () => false)
  const comments = useState<Comment[]>('comments', () => [])
  const config = useState<ArticleConfig>('articleConfig', () => ({
    allowSectionComments: true,
    allowGeneralComments: true
  }))

  // Mock comment store
  const COMMENT_STORE: Record<string, Comment[]> = {
    '1-p1': [
      {
        id: 'c1',
        author: 'Sarah Drasner',
        avatar: 'https://ui-avatars.com/api/?name=Sarah&background=random',
        content: 'This is a crucial point! Zero bundle size changes everything.',
        timestamp: '2 hours ago'
      }
    ],
    '1-general': [
      {
        id: 'c2',
        author: 'Lee Robinson',
        avatar: 'https://ui-avatars.com/api/?name=Lee&background=random',
        content: 'Great summary of RSC architecture.',
        timestamp: '1 day ago'
      }
    ]
  }

  const loadComments = (articleId: number, sectionId: string | null) => {
    const key = `${articleId}-${sectionId || 'general'}`
    comments.value = COMMENT_STORE[key] || []
  }

  const openSection = (sectionId: string | null, articleId: number) => {
    activeSection.value = sectionId
    loadComments(articleId, sectionId)
    isDrawerOpen.value = true
  }

  const closeComments = () => {
    isDrawerOpen.value = false
    activeSection.value = null
  }

  const addComment = (text: string, articleId: number, sectionId: string | null) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Guest User',
      avatar: 'https://ui-avatars.com/api/?name=Guest&background=random',
      content: text,
      timestamp: 'Just now'
    }

    const key = `${articleId}-${sectionId || 'general'}`
    const updated = [...(COMMENT_STORE[key] || []), newComment]
    COMMENT_STORE[key] = updated
    comments.value = updated
  }

  const setConfig = (newConfig: Partial<ArticleConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  return {
    activeSection: computed(() => activeSection.value),
    isDrawerOpen: computed(() => isDrawerOpen.value),
    comments: computed(() => comments.value),
    config: computed(() => config.value),
    openSection,
    closeComments,
    addComment,
    setConfig
  }
}
