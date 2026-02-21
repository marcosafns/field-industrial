<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Notificação popout -->
    <Transition name="notif">
      <div
        v-if="notification.show"
        class="fixed top-6 right-6 z-[100] w-80 bg-white border border-orange-100 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div class="h-1 bg-gradient-to-r from-[#f17b21] to-orange-300" />
        <div class="p-4 flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#f17b21] flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:bell" class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-900">Nova solicitação!</p>
            <p class="text-xs text-gray-500 mt-0.5 truncate">
              {{ notification.name }} — {{ notification.company || notification.email }}
            </p>
            <p class="text-xs text-gray-400 mt-0.5 truncate">{{ notification.subject }}</p>
            <NuxtLink
              :to="`/admin/${notification.id}`"
              @click="notification.show = false"
              class="inline-flex items-center gap-1 text-xs text-[#f17b21] font-semibold mt-2 hover:underline"
            >
              Ver solicitação
              <Icon name="lucide:arrow-right" class="w-3 h-3" />
            </NuxtLink>
          </div>
          <button @click="notification.show = false" class="text-gray-300 hover:text-gray-500 flex-shrink-0">
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <header class="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">

        <!-- Logo + saudação -->
        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <NuxtLink to="/admin" class="flex-shrink-0">
            <img src="/img/svg/logo3.svg" alt="Field Industrial" class="h-7 sm:h-8 hover:opacity-80 transition-opacity duration-200" />
          </NuxtLink>
          <span class="text-gray-200 hidden sm:inline">|</span>
          <span class="text-xs sm:text-sm font-semibold text-gray-400 tracking-widest uppercase hidden sm:inline">Admin</span>
          <span v-if="adminName" class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 truncate">
            <span class="text-gray-200 hidden sm:inline">—</span>
            <span class="truncate">Olá, <span class="font-semibold text-[#f17b21]">{{ adminName }}</span>!</span>
          </span>
        </div>

        <!-- Nav -->
        <nav class="flex items-center gap-1">

          <!-- Solicitações com badge -->
          <div class="relative">
            <NuxtLink
              to="/admin/solicitacoes"
              class="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-500 hover:text-[#f17b21] hover:bg-orange-50 transition-all duration-200"
              :class="$route.path === '/admin/solicitacoes' ? 'text-[#f17b21] bg-orange-50' : ''"
            >
              <Icon name="lucide:inbox" class="w-4 h-4 flex-shrink-0" />
              <span class="hidden sm:inline">Solicitações</span>
            </NuxtLink>
            <span
              v-if="newCount > 0"
              class="absolute -top-1 -right-1 min-w-4 h-4 bg-[#f17b21] text-white text-xs font-black rounded-full flex items-center justify-center px-1"
            >{{ newCount > 9 ? '9+' : newCount }}</span>
          </div>

          <NuxtLink
            to="/admin/calendario"
            class="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-500 hover:text-[#f17b21] hover:bg-orange-50 transition-all duration-200"
            :class="$route.path === '/admin/calendario' ? 'text-[#f17b21] bg-orange-50' : ''"
          >
            <Icon name="lucide:calendar-days" class="w-4 h-4 flex-shrink-0" />
            <span class="hidden sm:inline">Calendário</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/dashboard"
            class="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-500 hover:text-[#f17b21] hover:bg-orange-50 transition-all duration-200"
            :class="$route.path === '/admin/dashboard' ? 'text-[#f17b21] bg-orange-50' : ''"
          >
            <Icon name="lucide:layout-dashboard" class="w-4 h-4 flex-shrink-0" />
            <span class="hidden sm:inline">Dashboard</span>
          </NuxtLink>

          <button
            @click="logout"
            class="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <Icon name="lucide:log-out" class="w-4 h-4 flex-shrink-0" />
            <span class="hidden sm:inline">Sair</span>
          </button>
        </nav>

      </div>
    </header>

    <!-- Conteúdo da página -->
    <slot />

  </div>
</template>

<script setup>
const adminName = ref('')
const newCount = ref(0)
const knownIds = ref(null)
let pollingInterval = null

const notification = ref({
  show: false,
  id: '',
  name: '',
  company: '',
  email: '',
  subject: '',
})

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    // Primeiro beep
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.frequency.value = 880
    osc1.type = 'sine'
    gain1.gain.setValueAtTime(0.3, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc1.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.3)

    // Segundo beep
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.frequency.value = 1100
    osc2.type = 'sine'
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.2)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
    osc2.start(ctx.currentTime + 0.2)
    osc2.stop(ctx.currentTime + 0.5)
  } catch {}
}

async function checkNewMeetings() {
  try {
    const data = await $fetch('/api/meetings')
    const unviewed = data.filter(m => !m.viewed_at)
    newCount.value = unviewed.length

    if (knownIds.value === null) {
      knownIds.value = new Set(data.map(m => m.id))
      return
    }

    const newOnes = data.filter(m => !knownIds.value.has(m.id))
    if (newOnes.length > 0) {
      const newest = newOnes[0]
      notification.value = {
        show: true,
        id: newest.id,
        name: newest.name,
        company: newest.company || '',
        email: newest.email || '',
        subject: newest.subject || '',
      }
      newOnes.forEach(m => knownIds.value.add(m.id))
      playNotificationSound()
      setTimeout(() => { notification.value.show = false }, 6000)
    }
  } catch {}
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/auth/me')
    adminName.value = data.name || data.email || ''
  } catch {}

  await checkNewMeetings()
  pollingInterval = setInterval(checkNewMeetings, 10000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>

<style scoped>
.notif-enter-active,
.notif-leave-active {
  transition: all 0.4s ease;
}
.notif-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.notif-leave-to {
  opacity: 0;
  transform: translateX(110%);
}
</style>