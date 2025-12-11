<template>
  <main class="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-2 text-[#1D1D1B]">
        Login do engenheiro
      </h1>
      <p class="text-sm text-gray-600 mb-6">
        Faça login para visualizar e aprovar solicitações.
      </p>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="engenheiro@empresa.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full mt-4 px-4 py-3 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Entrar
        </button>

        <p v-if="erro" class="text-sm text-red-500 mt-3">
          {{ erro }}
        </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const auth = useEngineerAuth()

const email = ref('')
const password = ref('')
const erro = ref('')

const onSubmit = async () => {
  erro.value = ''

  if (!email.value || !password.value) {
    erro.value = 'Preencha e-mail e senha.'
    return
  }

  try {
    // chama a API de login no backend
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        senha: password.value
      }
    })

    // se chegou aqui, login ok -> marca como autenticado no front
    auth.login()

    const redirect = route.query.redirect || '/'
    const redirectPath =
      typeof redirect === 'string' ? redirect : String(redirect)

    router.push(redirectPath)
  } catch (err) {
    console.error(err)
    const msg =
      (err && err.data && err.data.statusMessage) ||
      'Erro ao fazer login. Tente novamente.'
    erro.value = msg
  }
}
</script>
