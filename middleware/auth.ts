export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSupabaseSession()
  if (!session.value) {
    return
  }

  if (
    to.path === '/auth/login' ||
    to.path === '/auth/confirm' ||
    to.path === '/auth/signup'
  ) {
    return navigateTo('/service')
  }
})
