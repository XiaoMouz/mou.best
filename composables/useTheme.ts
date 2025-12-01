export const useTheme = () => {
  const isDark = useState('isDark', () => true)
  const navbarTheme = useState<any>('navbarTheme', () => null)

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

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
    if (process.client) {
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

  const setNavbarTheme = (theme: any) => {
    navbarTheme.value = theme
  }

  const resetNavbarTheme = () => {
    navbarTheme.value = null
  }

  return {
    isDark: computed(() => isDark.value),
    navbarTheme: computed(() => navbarTheme.value),
    initTheme,
    toggleTheme,
    setNavbarTheme,
    resetNavbarTheme
  }
}
