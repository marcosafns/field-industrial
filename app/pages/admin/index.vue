<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

    <!-- Boas vindas -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Bem-vindo de volta{{ adminName ? `, ${adminName}` : '' }}! 👋</h1>
      <p class="text-gray-400 text-sm mt-1">{{ greeting }} — {{ today }}</p>
    </div>

    <!-- Cards rápidos -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <NuxtLink
        v-for="card in quickCards"
        :key="card.label"
        :to="card.to"
        class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 group"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200" :style="{ backgroundColor: card.bg }">
            <Icon :name="card.icon" class="w-5 h-5" :style="{ color: card.color }" />
          </div>
          <span class="text-2xl font-black" :style="{ color: card.color }">{{ card.value }}</span>
        </div>
        <p class="text-xs text-gray-500 font-medium">{{ card.label }}</p>
        <div class="flex items-center gap-1 mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200" :style="{ color: card.color }">
          <span>Ver todas</span>
          <Icon name="lucide:arrow-right" class="w-3 h-3" />
        </div>
      </NuxtLink>
    </div>

    <!-- Atalhos + Novas solicitações -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

      <!-- Atalhos rápidos -->
      <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 class="font-bold text-gray-900 mb-5">Atalhos Rápidos</h2>
        <div class="flex flex-col gap-3">
          <NuxtLink
            v-for="shortcut in shortcuts"
            :key="shortcut.label"
            :to="shortcut.to"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :style="{ backgroundColor: shortcut.bg }">
              <Icon :name="shortcut.icon" class="w-4 h-4" :style="{ color: shortcut.color }" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200">{{ shortcut.label }}</p>
              <p class="text-xs text-gray-400">{{ shortcut.desc }}</p>
            </div>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-300 group-hover:text-[#f17b21] transition-colors duration-200" />
          </NuxtLink>
        </div>
      </div>

      <!-- Novas solicitações -->
      <div class="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-bold text-gray-900">Novas Solicitações</h2>
            <p class="text-xs text-gray-400 mt-0.5">Ainda não visualizadas</p>
          </div>
          <NuxtLink to="/admin/solicitacoes" class="text-xs text-[#f17b21] font-semibold hover:underline flex items-center gap-1">
            Ver todas
            <Icon name="lucide:arrow-right" class="w-3 h-3" />
          </NuxtLink>
        </div>

        <div v-if="newMeetings.length === 0" class="flex flex-col items-center justify-center py-10">
          <div class="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-3">
            <Icon name="lucide:check-circle" class="w-7 h-7 text-green-400" />
          </div>
          <p class="text-gray-500 font-medium text-sm">Tudo em dia!</p>
          <p class="text-gray-400 text-xs mt-1">Nenhuma solicitação nova</p>
        </div>

        <div v-else class="space-y-3">
          <NuxtLink
            v-for="meeting in newMeetings"
            :key="meeting.id"
            :to="`/admin/${meeting.id}`"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group border border-orange-100 bg-orange-50"
          >
            <div class="w-10 h-10 rounded-xl bg-[#f17b21] flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
              {{ meeting.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 truncate">{{ meeting.name }}</p>
                <span class="bg-[#f17b21] text-white text-xs font-black px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  NOVO
                </span>
              </div>
              <p class="text-xs text-gray-400 truncate">{{ meeting.subject || meeting.email }}</p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="statusClass(meeting.status)">
                {{ statusLabel(meeting.status) }}
              </span>
              <span class="text-xs text-gray-400">{{ timeAgo(meeting.created_at) }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Próximas reuniões -->
    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="font-bold text-gray-900">Próximas Reuniões</h2>
          <p class="text-xs text-gray-400 mt-0.5">Com data preferencial definida</p>
        </div>
        <NuxtLink to="/admin/calendario" class="text-xs text-[#f17b21] font-semibold hover:underline flex items-center gap-1">
          Ver calendário
          <Icon name="lucide:arrow-right" class="w-3 h-3" />
        </NuxtLink>
      </div>

      <div v-if="upcomingMeetings.length === 0" class="flex flex-col items-center justify-center py-10">
        <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
          <Icon name="lucide:calendar-x" class="w-7 h-7 text-gray-300" />
        </div>
        <p class="text-gray-400 text-sm">Nenhuma reunião agendada</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <NuxtLink
          v-for="meeting in upcomingMeetings"
          :key="meeting.id"
          :to="`/admin/${meeting.id}`"
          class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 group"
        >
          <div class="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-[#f17b21] flex flex-col items-center justify-center flex-shrink-0 transition-colors duration-200">
            <span class="text-sm font-black text-[#f17b21] group-hover:text-white leading-none transition-colors duration-200">{{ formatDay(meeting.preferred_date) }}</span>
            <span class="text-xs text-orange-300 group-hover:text-orange-100 leading-none mt-0.5 transition-colors duration-200">{{ formatMonth(meeting.preferred_date) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 truncate">{{ meeting.name }}</p>
            <p class="text-xs text-gray-400 truncate">{{ meeting.preferred_time || meeting.company || '—' }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })


let pagePolling = null
const meetings = ref([])
const adminName = ref('')

const today = computed(() => new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }))

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12 && h > 6) return 'Bom dia'
  if (h < 18 && h > 12) return 'Boa tarde'
  return 'Boa noite'
})

const quickCards = computed(() => [
  { label: 'Total', value: meetings.value.length, icon: 'lucide:inbox', color: '#6b7280', bg: '#f3f4f6', to: '/admin/solicitacoes' },
  { label: 'Pendentes', value: meetings.value.filter(m => m.status === 'pending').length, icon: 'lucide:clock', color: '#d97706', bg: '#fef3c7', to: '/admin/solicitacoes' },
  { label: 'Aprovadas', value: meetings.value.filter(m => m.status === 'approved').length, icon: 'lucide:check-circle', color: '#16a34a', bg: '#dcfce7', to: '/admin/solicitacoes' },
  { label: 'Concluídas', value: meetings.value.filter(m => m.status === 'completed').length, icon: 'lucide:check-check', color: '#2563eb', bg: '#dbeafe', to: '/admin/solicitacoes' },
])

const shortcuts = [
  { label: 'Solicitações', desc: 'Ver todas as solicitações', to: '/admin/solicitacoes', icon: 'lucide:inbox', color: '#f17b21', bg: '#fff7ed' },
  { label: 'Calendário', desc: 'Ver reuniões por data', to: '/admin/calendario', icon: 'lucide:calendar-days', color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Dashboard', desc: 'Gráficos e métricas', to: '/admin/dashboard', icon: 'lucide:layout-dashboard', color: '#2563eb', bg: '#eff6ff' },
]

const newMeetings = computed(() =>
  meetings.value.filter(m => !m.viewed_at).slice(0, 6)
)

const upcomingMeetings = computed(() => {
  const today = new Date().toISOString().substring(0, 10)
  return meetings.value
    .filter(m => m.preferred_date && m.preferred_date.substring(0, 10) >= today)
    .sort((a, b) => a.preferred_date.localeCompare(b.preferred_date))
    .slice(0, 8)
})

function statusLabel(s) {
  return { pending: 'Pendente', approved: 'Aprovada', rejected: 'Recusada', completed: 'Concluída' }[s] ?? s
}

function statusClass(s) {
  return {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-700',
  }[s] ?? 'bg-gray-100 text-gray-600'
}

function formatDay(date) {
  if (!date) return ''
  return new Date(date).getUTCDate()
}

function formatMonth(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase()
}

function timeAgo(date) {
  if (!date) return ''
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60) return 'agora'
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
  return `${Math.floor(diff / 86400)}d atrás`
}

onMounted(async () => {
  meetings.value = await $fetch('/api/meetings').catch(() => [])
  const data = await $fetch('/api/auth/me').catch(() => null)
  if (data) adminName.value = data.name || ''

  pagePolling = setInterval(async () => {
    meetings.value = await $fetch('/api/meetings').catch(() => [])
  }, 10000)
})

onUnmounted(() => {
  if (pagePolling) clearInterval(pagePolling)
})

</script>