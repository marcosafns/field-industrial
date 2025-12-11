export default defineNuxtRouteMiddleware((to) => {
  const auth = useEngineerAuth()

  if (!auth.isAuthenticated.value) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
