import { ref, computed } from 'vue'

const AUTH_KEY = 'engineer_auth'

export const useEngineerAuth = () => {
  const isAuthenticated = ref(false)

  if (process.client) {
    const saved = localStorage.getItem(AUTH_KEY)
    isAuthenticated.value = saved === '1'
  }

  const login = () => {
    isAuthenticated.value = true
    if (process.client) {
      localStorage.setItem(AUTH_KEY, '1')
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    if (process.client) {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    logout
  }
}
