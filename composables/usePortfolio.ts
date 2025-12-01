export const usePortfolio = () => {
  const currentView = useState('currentView', () => 'home')
  const activeArticleId = useState<number | null>('activeArticleId', () => null)
  const unlockedIds = useState<number[]>('unlockedIds', () => [])

  const navigate = (view: string) => {
    currentView.value = view
    if (view !== 'article') {
      activeArticleId.value = null
    }
  }

  const viewArticle = (id: number) => {
    activeArticleId.value = id
    currentView.value = 'article'
  }

  const unlockArticle = (id: number) => {
    if (!unlockedIds.value.includes(id)) {
      unlockedIds.value = [...unlockedIds.value, id]
    }
  }

  return {
    currentView: computed(() => currentView.value),
    activeArticleId: computed(() => activeArticleId.value),
    unlockedIds: computed(() => unlockedIds.value),
    navigate,
    viewArticle,
    unlockArticle
  }
}
