import type { Comment } from '~/types'

export const useArticle = () => {
  const activeSection = useState<string | null>('activeSection', () => null)
  const isDrawerOpen = useState('isDrawerOpen', () => false)
  const comments = useState<Comment[]>('comments', () => [])

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

  return {
    activeSection: computed(() => activeSection.value),
    isDrawerOpen: computed(() => isDrawerOpen.value),
    comments: computed(() => comments.value),
    openSection,
    closeComments,
    addComment
  }
}
