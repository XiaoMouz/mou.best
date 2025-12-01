import { translations } from '~/data/translations'

type Language = 'en' | 'zh'

export const useLanguage = () => {
  const language = useState<Language>('language', () => 'en')

  const toggleLanguage = () => {
    language.value = language.value === 'en' ? 'zh' : 'en'
  }

  const setLanguage = (lang: Language) => {
    language.value = lang
  }

  const t = (path: string): any => {
    const keys = path.split('.')
    let current: any = translations[language.value]

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`)
        return path
      }
      current = current[key]
    }
    return current
  }

  return {
    language: computed(() => language.value),
    toggleLanguage,
    setLanguage,
    t
  }
}
