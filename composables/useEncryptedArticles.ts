interface UnlockedArticle {
  content: string
  title: string
  excerpt?: string
  tags?: string[]
  date?: string
  readTime?: string
  unlockedAt: string
}

interface UnlockedArticles {
  [slug: string]: UnlockedArticle
}

const STORAGE_KEY = 'unlocked-articles'

export const useEncryptedArticles = () => {
  const unlockedArticles = useState<UnlockedArticles>('unlockedArticles', () => ({}))

  // Load from localStorage on client side
  const loadFromStorage = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          unlockedArticles.value = JSON.parse(stored)
        }
      } catch (error) {
        console.error('Failed to load unlocked articles from localStorage:', error)
      }
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedArticles.value))
      } catch (error) {
        console.error('Failed to save unlocked articles to localStorage:', error)
      }
    }
  }

  // Check if article is unlocked
  const isUnlocked = (slug: string): boolean => {
    return !!unlockedArticles.value[slug]
  }

  // Get unlocked article content
  const getUnlockedArticle = (slug: string): UnlockedArticle | null => {
    return unlockedArticles.value[slug] || null
  }

  // Unlock article by verifying password
  const unlockArticle = async (slug: string, password: string) => {
    try {
      const response = await $fetch<{
        success: boolean
        article?: any
        error?: string
      }>('/api/articles/unlock', {
        method: 'POST',
        body: { slug, password },
      })

      if (response.success && response.article) {
        // Store in state
        unlockedArticles.value[slug] = {
          ...response.article,
          unlockedAt: new Date().toISOString(),
        }

        // Persist to localStorage
        saveToStorage()

        return { success: true }
      } else {
        return {
          success: false,
          error: response.error || 'Failed to unlock article',
        }
      }
    } catch (error: any) {
      console.error('Error unlocking article:', error)
      return {
        success: false,
        error: error.data?.message || 'Failed to unlock article',
      }
    }
  }

  // Clear all unlocked articles
  const clearUnlocked = () => {
    unlockedArticles.value = {}
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Clear specific article
  const lockArticle = (slug: string) => {
    delete unlockedArticles.value[slug]
    saveToStorage()
  }

  // Initialize on mount
  if (process.client) {
    loadFromStorage()
  }

  return {
    unlockedArticles: computed(() => unlockedArticles.value),
    isUnlocked,
    getUnlockedArticle,
    unlockArticle,
    clearUnlocked,
    lockArticle,
  }
}
