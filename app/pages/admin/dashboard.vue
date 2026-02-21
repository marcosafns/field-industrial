<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

    <!-- Título -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">Visão geral das solicitações</p>
    </div>

    <!-- Cards de métricas -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ backgroundColor: metric.bg }">
            <Icon :name="metric.icon" class="w-5 h-5" :style="{ color: metric.color }" />
          </div>
          <span class="text-2xl font-black" :style="{ color: metric.color }">{{ metric.value }}</span>
        </div>
        <p class="text-xs text-gray-500 font-medium">{{ metric.label }}</p>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

      <!-- Gráfico por mês -->
      <div class="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-bold text-gray-900">Solicitações por Mês</h2>
            <p class="text-xs text-gray-400 mt-0.5">Últimos 6 meses</p>
          </div>
          <div class="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
            <Icon name="lucide:bar-chart-2" class="w-5 h-5 text-[#f17b21]" />
          </div>
        </div>
        <div class="relative w-full" style="height: 200px;">
          <canvas ref="barChart" />
        </div>
      </div>

      <!-- Gráfico pizza -->
      <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-bold text-gray-900">Por Status</h2>
            <p class="text-xs text-gray-400 mt-0.5">Total geral</p>
          </div>
          <div class="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
            <Icon name="lucide:pie-chart" class="w-5 h-5 text-[#f17b21]" />
          </div>
        </div>
        <div class="relative w-full" style="height: 180px;">
          <canvas ref="pieChart" />
        </div>
        <div class="mt-4 space-y-2">
          <div v-for="item in pieLabels" :key="item.label" class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }" />
              <span class="text-gray-500">{{ item.label }}</span>
            </div>
            <span class="font-semibold text-gray-700">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Próximas reuniões + Últimas solicitações -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
          <Icon name="lucide:calendar-x" class="w-10 h-10 text-gray-200 mb-2" />
          <p class="text-gray-400 text-sm">Nenhuma reunião agendada</p>
        </div>

        <div v-else class="space-y-3">
          <NuxtLink
            v-for="meeting in upcomingMeetings"
            :key="meeting.id"
            :to="`/admin/${meeting.id}`"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div class="w-12 h-12 rounded-xl bg-orange-50 flex flex-col items-center justify-center flex-shrink-0">
              <span class="text-xs font-black text-[#f17b21] leading-none">{{ formatDay(meeting.preferred_date) }}</span>
              <span class="text-xs text-orange-300 leading-none mt-0.5">{{ formatMonth(meeting.preferred_date) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 truncate">{{ meeting.name }}</p>
              <p class="text-xs text-gray-400 truncate">{{ meeting.company || meeting.email }}</p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="statusClass(meeting.status)">
                {{ statusLabel(meeting.status) }}
              </span>
              <span v-if="meeting.preferred_time" class="text-xs text-gray-400">{{ meeting.preferred_time }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Últimas solicitações -->
      <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-bold text-gray-900">Últimas Solicitações</h2>
            <p class="text-xs text-gray-400 mt-0.5">Mais recentes recebidas</p>
          </div>
          <NuxtLink to="/admin" class="text-xs text-[#f17b21] font-semibold hover:underline flex items-center gap-1">
            Ver todas
            <Icon name="lucide:arrow-right" class="w-3 h-3" />
          </NuxtLink>
        </div>

        <div v-if="recentMeetings.length === 0" class="flex flex-col items-center justify-center py-10">
          <Icon name="lucide:inbox" class="w-10 h-10 text-gray-200 mb-2" />
          <p class="text-gray-400 text-sm">Nenhuma solicitação ainda</p>
        </div>

        <div v-else class="space-y-3">
          <NuxtLink
            v-for="meeting in recentMeetings"
            :key="meeting.id"
            :to="`/admin/${meeting.id}`"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-500 text-sm group-hover:bg-orange-50 group-hover:text-[#f17b21] transition-colors duration-200">
              {{ meeting.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 truncate">{{ meeting.name }}</p>
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
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const meetings = ref([])
const barChart = ref(null)
const pieChart = ref(null)

async function fetchMeetings() {
  try {
    meetings.value = await $fetch('/api/meetings')
  } catch {}
}

const metrics = computed(() => {
  const all = meetings.value
  return [
    { label: 'Total', value: all.length, icon: 'lucide:inbox', color: '#6b7280', bg: '#f3f4f6' },
    { label: 'Pendentes', value: all.filter(m => m.status === 'pending').length, icon: 'lucide:clock', color: '#d97706', bg: '#fef3c7' },
    { label: 'Aprovadas', value: all.filter(m => m.status === 'approved').length, icon: 'lucide:check-circle', color: '#16a34a', bg: '#dcfce7' },
    { label: 'Concluídas', value: all.filter(m => m.status === 'completed').length, icon: 'lucide:check-check', color: '#2563eb', bg: '#dbeafe' },
    { label: 'Recusadas', value: all.filter(m => m.status === 'rejected').length, icon: 'lucide:x-circle', color: '#dc2626', bg: '#fee2e2' },
  ]
})

const upcomingMeetings = computed(() => {
  const today = new Date().toISOString().substring(0, 10)
  return meetings.value
    .filter(m => m.preferred_date && m.preferred_date.substring(0, 10) >= today)
    .sort((a, b) => a.preferred_date.localeCompare(b.preferred_date))
    .slice(0, 5)
})

const recentMeetings = computed(() =>
  [...meetings.value]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
)

const pieLabels = computed(() => [
  { label: 'Pendentes', color: '#d97706', value: meetings.value.filter(m => m.status === 'pending').length },
  { label: 'Aprovadas', color: '#16a34a', value: meetings.value.filter(m => m.status === 'approved').length },
  { label: 'Concluídas', color: '#2563eb', value: meetings.value.filter(m => m.status === 'completed').length },
  { label: 'Recusadas', color: '#dc2626', value: meetings.value.filter(m => m.status === 'rejected').length },
])

function buildBarData() {
  const months = []
  const counts = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    months.push(label)
    counts.push(meetings.value.filter(m => (m.created_at || '').substring(0, 7) === key).length)
  }
  return { months, counts }
}

function initCharts() {
  const Chart = window.Chart
  if (!Chart) return

  const { months, counts } = buildBarData()

  if (barChart.value) {
    new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Solicitações',
          data: counts,
          backgroundColor: '#f17b21',
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, color: '#9ca3af' }, grid: { color: '#f3f4f6' } },
          x: { ticks: { color: '#9ca3af' }, grid: { display: false } },
        },
      },
    })
  }

  if (pieChart.value) {
    new Chart(pieChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Pendentes', 'Aprovadas', 'Concluídas', 'Recusadas'],
        datasets: [{
          data: pieLabels.value.map(p => p.value),
          backgroundColor: ['#d97706', '#16a34a', '#2563eb', '#dc2626'],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { display: false } },
      },
    })
  }
}

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
  await fetchMeetings()
  await new Promise(resolve => {
    if (window.Chart) return resolve()
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = resolve
    document.head.appendChild(script)
  })
  await nextTick()
  initCharts()
})
</script>