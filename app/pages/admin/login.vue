<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/img/svg/logo3.svg" alt="Field Industrial" class="h-12 mx-auto mb-4" />
        <p class="text-gray-400 text-sm">Área administrativa</p>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <h1 class="text-gray-900 font-bold text-xl mb-6">Entrar</h1>

        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div>
            <label class="text-sm text-gray-600 mb-1 block font-medium">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="admin@fieldindustrial.com.br"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600 mb-1 block font-medium">Senha</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#f17b21] text-white font-semibold py-3 rounded-xl hover:bg-[#d96a10] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>

      <p class="text-center text-xs text-gray-300 mt-6">
        © 2026 Field Industrial — Todos os direitos reservados.
      </p>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, ssr: false })

const form = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form.value,
    })
    await navigateTo('/admin')
  } catch (e) {
    error.value = 'E-mail ou senha inválidos.'
  } finally {
    loading.value = false
  }
}
</script>