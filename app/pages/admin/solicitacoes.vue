<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

    <!-- Título -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Solicitações de Reunião</h1>
        <p class="text-gray-400 text-sm mt-1">Gerencie todas as solicitações recebidas</p>
      </div>
      <div class="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-[#f17b21] animate-pulse" />
        <span class="text-sm text-gray-500 font-medium">{{ meetings.length }} total</span>
      </div>
    </div>

    <!-- Busca -->
    <div class="relative mb-4">
      <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        v-model="search"
        @input="applyFilter(() => {})"
        type="text"
        placeholder="Buscar por nome, email ou empresa..."
        class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
      />
      <button v-if="search" @click="applyFilter(() => search = '')" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
        <Icon name="lucide:x" class="w-4 h-4" />
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-3 mb-6">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="applyFilter(() => activeFilter = filter.value)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
        :class="activeFilter === filter.value
          ? 'bg-[#f17b21] text-white shadow-md'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-[#f17b21] hover:text-[#f17b21]'"
      >
        {{ filter.label }}
        <span class="ml-1 text-xs opacity-70">
          ({{ filter.value === '' ? allMeetings.length : counts[filter.value] ?? 0 }})
        </span>
      </button>

      <div class="w-px bg-gray-200 mx-1" />

      <button
        v-for="sort in sorts"
        :key="sort.value"
        @click="applyFilter(() => activeSort = sort.value)"
        class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
        :class="activeSort === sort.value
          ? 'bg-gray-900 text-white shadow-md'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'"
      >
        <Icon :name="sort.icon" class="w-3.5 h-3.5" />
        {{ sort.label }}
      </button>

      <div class="w-px bg-gray-200 mx-1" />

      <!-- Botão de data -->
      <div class="relative">
        <button
          @click="showDatePicker = !showDatePicker"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="dateFilter
            ? 'bg-[#f17b21] text-white shadow-md'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'"
        >
          <Icon name="lucide:calendar" class="w-3.5 h-3.5" />
          {{ dateFilter ? formatDateShort(dateFilter) : 'Filtrar por data' }}
        </button>
        <input
          v-if="showDatePicker"
          type="date"
          v-model="dateFilter"
          @change="applyFilter(() => {}); showDatePicker = false"
          class="absolute top-10 left-0 z-20 px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-600 focus:outline-none focus:border-[#f17b21] bg-white shadow-lg"
        />
      </div>

      <button
        v-if="dateFilter"
        @click="applyFilter(() => { dateFilter = ''; showDatePicker = false })"
        class="px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all duration-200 bg-white flex items-center gap-1.5"
      >
        <Icon name="lucide:x" class="w-3.5 h-3.5" />
        Limpar data
      </button>

      <div class="w-px bg-gray-200 mx-1" />

      <!-- Atribuído -->
      <button
        v-for="assign in assignFilters"
        :key="assign.value"
        @click="applyFilter(() => activeAssign = assign.value)"
        class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
        :class="activeAssign === assign.value
          ? 'bg-gray-900 text-white shadow-md'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'"
      >
        <Icon :name="assign.icon" class="w-3.5 h-3.5" />
        {{ assign.label }}
      </button>
    </div>

    <!-- Loading / Fake loader -->
    <div v-if="loading || filtering" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-[#f17b21] border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Vazio -->
    <div v-else-if="meetings.length === 0" class="text-center py-20">
      <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name="lucide:inbox" class="w-8 h-8 text-gray-300" />
      </div>
      <p class="text-gray-400 font-medium">Nenhuma solicitação encontrada</p>
      <p class="text-gray-300 text-sm mt-1">Tente mudar os filtros</p>
    </div>

    <!-- Lista -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <NuxtLink
        v-for="meeting in meetings"
        :key="meeting.id"
        :to="`/admin/${meeting.id}`"
        class="relative bg-white border rounded-2xl p-5 transition-all duration-300 group"
        :class="meeting.status === 'completed'
          ? 'border-gray-100 opacity-50 hover:opacity-70'
          : 'border-gray-100 hover:shadow-lg hover:border-orange-200'"
      >
        <!-- Badge Novo -->
        <div
          v-if="!meeting.viewed_at"
          class="absolute -top-2 -right-2 bg-[#f17b21] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          NOVO
        </div>

        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm group-hover:bg-orange-50 group-hover:text-[#f17b21] transition-colors duration-200 flex-shrink-0">
              {{ meeting.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 text-sm">
                {{ meeting.name }}
              </h3>
              <p class="text-xs text-gray-400">{{ meeting.company || meeting.email }}</p>
            </div>
          </div>
          <span
            class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            :class="statusClass(meeting.status)"
          >{{ statusLabel(meeting.status) }}</span>
        </div>

        <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ meeting.subject }}</p>

        <div class="flex items-center justify-between text-xs text-gray-400">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:calendar" class="w-3.5 h-3.5" />
            {{ formatDate(meeting.created_at) }}
          </div>
          <div v-if="meeting.preferred_date" class="flex items-center gap-1.5 text-[#f17b21]">
            <Icon name="lucide:clock" class="w-3.5 h-3.5" />
            {{ formatDateShort(meeting.preferred_date) }}
          </div>
        </div>

        <div v-if="meeting.assigned_name" class="flex items-center gap-1.5 text-xs text-green-600 mt-2">
          <Icon name="lucide:user-check" class="w-3.5 h-3.5" />
          <span>{{ meeting.assigned_name }}</span>
        </div>
        <div v-else class="flex items-center gap-1.5 text-xs text-orange-400 mt-2">
          <Icon name="lucide:user-x" class="w-3.5 h-3.5" />
          <span>Sem responsável</span>
        </div>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const allMeetings = ref([])
const loading = ref(false)
const filtering = ref(false)
const activeFilter = ref('')
const activeSort = ref('newest')
const dateFilter = ref('')
const showDatePicker = ref(false)
const search = ref('')
const activeAssign = ref('all')
const adminsList = ref([])

let pagePolling = null

function applyFilter(fn) {
  filtering.value = true
  fn()
  setTimeout(() => { filtering.value = false }, 400)
}

const filters = [
  { label: 'Todas', value: '' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Aprovadas', value: 'approved' },
  { label: 'Recusadas', value: 'rejected' },
  { label: 'Concluídas', value: 'completed' },
]

const sorts = [
  { label: 'Mais recentes', value: 'newest', icon: 'lucide:arrow-down' },
  { label: 'Mais antigas', value: 'oldest', icon: 'lucide:arrow-up' },
  { label: 'Data preferencial', value: 'preferred', icon: 'lucide:calendar' },
]

const assignFilters = computed(() => [
  { label: 'Todos', value: 'all', icon: 'lucide:users' },
  { label: 'Sem responsável', value: 'unassigned', icon: 'lucide:user-x' },
  ...adminsList.value.map(a => ({
    label: a.name || a.email,
    value: String(a.id),
    icon: 'lucide:user-check',
  }))
])

const counts = computed(() =>
  allMeetings.value.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1
    return acc
  }, {})
)

const meetings = computed(() => {
  let list = [...allMeetings.value]

  if (activeFilter.value) {
    list = list.filter(m => m.status === activeFilter.value)
  }

  if (activeAssign.value === 'unassigned') {
    list = list.filter(m => !m.assigned_to)
  } else if (activeAssign.value !== 'all') {
    list = list.filter(m => String(m.assigned_to) === activeAssign.value)
  }

  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(m =>
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.company?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q)
    )
  }

  if (dateFilter.value) {
    list = list.filter(m => {
      const d = (m.preferred_date || m.created_at || '').substring(0, 10)
      return d === dateFilter.value
    })
  }

  if (activeSort.value === 'newest') {
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (activeSort.value === 'oldest') {
    list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (activeSort.value === 'preferred') {
    list.sort((a, b) => {
      if (!a.preferred_date) return 1
      if (!b.preferred_date) return -1
      return a.preferred_date.localeCompare(b.preferred_date)
    })
  }

  return list
})

async function fetchMeetings() {
  loading.value = true
  try {
    allMeetings.value = await $fetch('/api/meetings')
  } finally {
    loading.value = false
  }
}

function statusLabel(status) {
  return { pending: 'Pendente', approved: 'Aprovada', rejected: 'Recusada', completed: 'Concluída' }[status] ?? status
}

function statusClass(status) {
  return {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-700',
  }[status] ?? 'bg-gray-100 text-gray-600'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDateShort(date) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

onMounted(async () => {
  await fetchMeetings()
  adminsList.value = await $fetch('/api/admins').catch(() => [])
  pagePolling = setInterval(fetchMeetings, 10000)
})

onUnmounted(() => {
  if (pagePolling) clearInterval(pagePolling)
})
</script>