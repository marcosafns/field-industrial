<template>
  <header class="w-full bg-[#f8f6f2] border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo + título (lado esquerdo) -->
      <div class="flex items-center gap-3">
        <img
          src="/img/svg/logo.svg"
          alt="Field Industrial"
          class="h-8 w-auto"
        />
        <div class="leading-tight">
          <p class="text-sm font-semibold text-[#1D1D1B]">
            Field Industrial
          </p>
          <p class="text-xs text-gray-500">
            Painel de agendamentos
          </p>
        </div>
      </div>

      <!-- Navegação + botão sair (lado direito) -->
      <div class="flex items-center gap-6">
        <nav class="hidden sm:flex items-center gap-4 text-sm">
          <NuxtLink
            to="/painel/solicitacoes"
            class="text-gray-600 hover:text-gray-900"
          >
            Solicitações
          </NuxtLink>
          <NuxtLink
            to="/painel/calendario"
            class="text-gray-600 hover:text-gray-900"
          >
            Calendário
          </NuxtLink>
        </nav>

        <button
          @click="handleLogout"
          class="px-4 py-2 rounded-lg text-xs font-semibold border border-gray-300
                 text-gray-700 bg-white hover:bg-gray-100 transition"
        >
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const router = useRouter()
const auth = useEngineerAuth()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
