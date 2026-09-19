export const useTheme = () => {
  // Default to light theme to prevent dark flash on SSR
  // The theme will be corrected by the script in nuxt.config
  const isDark = useState('isDark', () => false)

  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches

      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const toggleTheme = () => {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        isDark.value = false
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        isDark.value = true
      }
    }
  }

  return {
    isDark: computed(() => isDark.value),
    initTheme,
    toggleTheme,
  }
}
