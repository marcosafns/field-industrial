<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div class="flex flex-col lg:flex-row gap-6">

        <!-- Calendário -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ monthName }}</h1>
              <p class="text-gray-400 text-sm mt-0.5">{{ year }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="prevMonth" class="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#f17b21]/50 hover:text-[#f17b21] transition-all duration-200">
                <Icon name="lucide:chevron-left" class="w-4 h-4" />
              </button>
              <button @click="goToToday" class="px-4 h-9 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:border-[#f17b21]/50 hover:text-[#f17b21] transition-all duration-200 tracking-wider uppercase">Hoje</button>
              <button @click="nextMonth" class="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#f17b21]/50 hover:text-[#f17b21] transition-all duration-200">
                <Icon name="lucide:chevron-right" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Legenda -->
          <div class="flex items-center flex-wrap gap-4 mb-5">
            <div v-for="leg in legend" :key="leg.label" class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: leg.color }" />
              <span class="text-xs text-gray-400">{{ leg.label }}</span>
            </div>
          </div>

          <!-- Grid -->
          <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div class="grid grid-cols-7 border-b border-gray-100">
              <div v-for="day in weekDays" :key="day" class="py-3 text-center text-xs font-bold tracking-widest uppercase text-gray-400">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7">
              <div
                v-for="(cell, i) in calendarCells"
                :key="i"
                @click="cell.day ? selectDay(cell) : null"
                class="relative min-h-[90px] sm:min-h-[110px] border-b border-r border-gray-100 p-2 transition-all duration-200"
                :class="[
                  cell.day ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-50/50',
                  cell.isToday ? 'bg-[#f17b21]/5' : '',
                  cell.isSelected ? 'ring-1 ring-inset ring-[#f17b21]/20 bg-[#f17b21]/5' : '',
                  (i + 1) % 7 === 0 ? 'border-r-0' : '',
                ]"
              >
                <div v-if="cell.day" class="flex items-start justify-between mb-1.5">
                  <span
                    class="w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold"
                    :class="cell.isToday ? 'bg-[#f17b21] text-white' : cell.isSelected ? 'bg-[#f17b21]/10 text-[#f17b21]' : 'text-gray-500'"
                  >{{ cell.day }}</span>
                  <span v-if="cell.meetings.length > 0" class="text-xs text-gray-300 font-medium">{{ cell.meetings.length }}</span>
                </div>

                <div v-if="cell.day" class="flex flex-col gap-1">
                  <div
                    v-for="(m, mi) in cell.meetings.slice(0, 2)"
                    :key="mi"
                    class="text-xs px-1.5 py-0.5 rounded-md font-medium truncate flex items-center gap-1"
                    :style="{ backgroundColor: statusBg(m.status), color: statusColor(m.status) }"
                  >
                    <span v-if="m.status === 'confirmed'">✓</span>
                    {{ m.name.split(' ')[0] }}
                  </div>
                  <div v-if="cell.meetings.length > 2" class="text-xs text-gray-400 px-1.5">+{{ cell.meetings.length - 2 }} mais</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-80 xl:w-96">
          <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm sticky top-24">

            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p class="text-xs text-[#f17b21] uppercase tracking-widest font-bold">
                  {{ selectedDay ? formatSelectedDay : 'Selecione um dia' }}
                </p>
                <p v-if="selectedDayMeetings.length > 0" class="text-gray-900 font-bold mt-0.5">
                  {{ selectedDayMeetings.length }} {{ selectedDayMeetings.length === 1 ? 'reunião' : 'reuniões' }}
                </p>
                <p v-else-if="selectedDay" class="text-gray-400 text-sm mt-0.5">Nenhuma reunião</p>
              </div>
              <div v-if="selectedDay" class="w-10 h-10 rounded-xl bg-[#f17b21]/10 flex items-center justify-center">
                <Icon name="lucide:calendar-days" class="w-5 h-5 text-[#f17b21]" />
              </div>
            </div>

            <div class="divide-y divide-gray-100 max-h-[50vh] overflow-y-auto">
              <div v-if="!selectedDay" class="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                  <Icon name="lucide:mouse-pointer-click" class="w-7 h-7 text-gray-300" />
                </div>
                <p class="text-gray-400 text-sm">Clique em um dia no calendário para ver as reuniões</p>
              </div>

              <div v-else-if="selectedDayMeetings.length === 0" class="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                  <Icon name="lucide:coffee" class="w-7 h-7 text-gray-300" />
                </div>
                <p class="text-gray-400 text-sm">Nenhuma reunião neste dia</p>
              </div>

              <NuxtLink
                v-for="meeting in selectedDayMeetings"
                :key="meeting.id"
                :to="`/admin/${meeting.id}`"
                class="flex flex-col gap-2 px-5 py-4 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5">
                      <p class="text-sm font-semibold text-gray-900 group-hover:text-[#f17b21] transition-colors duration-200 truncate">
                        {{ meeting.name }}
                      </p>
                      <Icon v-if="meeting.status === 'confirmed'" name="lucide:check-circle-2" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <Icon v-if="meeting.status === 'declined'" name="lucide:x-circle" class="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    </div>
                    <p class="text-xs text-gray-400 truncate">{{ meeting.company || meeting.email }}</p>
                  </div>
                  <span
                    class="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    :style="{ backgroundColor: statusBg(meeting.status), color: statusColor(meeting.status) }"
                  >{{ statusLabel(meeting.status) }}</span>
                </div>

                <div class="flex items-center gap-3">
                  <div v-if="meeting.preferred_time" class="flex items-center gap-1 text-xs text-gray-400">
                    <Icon name="lucide:clock" class="w-3 h-3" />
                    {{ meeting.preferred_time }}
                  </div>
                  <div class="flex items-center gap-1 text-xs text-gray-400">
                    <Icon name="lucide:hash" class="w-3 h-3" />
                    {{ meeting.id }}
                  </div>
                </div>

                <p v-if="meeting.subject" class="text-xs text-gray-400 truncate">{{ meeting.subject }}</p>

                <div class="flex items-center gap-1 text-xs text-[#f17b21] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Ver detalhes</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                </div>
              </NuxtLink>
            </div>

            <!-- Stats do mês -->
            <div class="px-5 py-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div v-for="stat in monthStats" :key="stat.label" class="bg-gray-50 rounded-xl p-3">
                <p class="text-lg font-bold" :style="{ color: stat.color }">{{ stat.value }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const meetings = ref([])
const currentDate = ref(new Date())
const selectedDay = ref(null)

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const legend = [
  { label: 'Pendente', color: '#d97706' },
  { label: 'Aprovada', color: '#16a34a' },
  { label: 'Confirmada pelo cliente', color: '#15803d' },
  { label: 'Recusada pelo cliente', color: '#f87171' },
  { label: 'Recusada', color: '#dc2626' },
  { label: 'Concluída', color: '#2563eb' },
]

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const monthName = computed(() =>
  currentDate.value.toLocaleDateString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())
)

async function fetchMeetings() {
  try {
    meetings.value = await $fetch('/api/meetings')
  } catch {}
}

// Usa APENAS preferred_date — nunca created_at
const calendarCells = computed(() => {
  const firstDay = new Date(year.value, month.value, 1).getDay()
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const today = new Date()
  const cells = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: null, meetings: [], isToday: false, isSelected: false })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayMeetings = meetings.value.filter(m =>
      m.preferred_date ? m.preferred_date.substring(0, 10) === dateStr : false
    )

    cells.push({
      day: d,
      date: dateStr,
      meetings: dayMeetings,
      isToday: today.getFullYear() === year.value && today.getMonth() === month.value && today.getDate() === d,
      isSelected: selectedDay.value === dateStr,
    })
  }

  return cells
})

const selectedDayMeetings = computed(() => {
  if (!selectedDay.value) return []
  return meetings.value.filter(m =>
    m.preferred_date ? m.preferred_date.substring(0, 10) === selectedDay.value : false
  )
})

const formatSelectedDay = computed(() => {
  if (!selectedDay.value) return ''
  const [y, mo, d] = selectedDay.value.split('-')
  return new Date(y, mo - 1, d).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^\w/, c => c.toUpperCase())
})

const monthStats = computed(() => {
  const m = `${year.value}-${String(month.value + 1).padStart(2, '0')}`
  const mm = meetings.value.filter(mt =>
    mt.preferred_date ? mt.preferred_date.substring(0, 7) === m : false
  )
  return [
    { label: 'Este mês', value: mm.length, color: '#f17b21' },
    { label: 'Pendentes', value: mm.filter(mt => mt.status === 'pending').length, color: '#d97706' },
    { label: 'Confirmadas', value: mm.filter(mt => mt.status === 'confirmed').length, color: '#15803d' },
    { label: 'Concluídas', value: mm.filter(mt => mt.status === 'completed').length, color: '#2563eb' },
  ]
})

function selectDay(cell) {
  selectedDay.value = cell.isSelected ? null : cell.date
}

function prevMonth() {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() - 1)
  currentDate.value = d
  selectedDay.value = null
}

function nextMonth() {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + 1)
  currentDate.value = d
  selectedDay.value = null
}

function goToToday() {
  currentDate.value = new Date()
  selectedDay.value = null
}

function statusLabel(s) {
  return {
    pending: 'Pendente',
    approved: 'Aprovada',
    rejected: 'Recusada',
    completed: 'Concluída',
    confirmed: 'Confirmada ✓',
    declined: 'Recusada pelo cliente',
  }[s] ?? s
}

function statusColor(s) {
  return {
    pending: '#d97706',
    approved: '#16a34a',
    rejected: '#dc2626',
    completed: '#2563eb',
    confirmed: '#15803d',
    declined: '#ef4444',
  }[s] ?? '#6b7280'
}

function statusBg(s) {
  return {
    pending: '#fef3c7',
    approved: '#dcfce7',
    rejected: '#fee2e2',
    completed: '#dbeafe',
    confirmed: '#bbf7d0',
    declined: '#fecaca',
  }[s] ?? '#f3f4f6'
}

onMounted(() => fetchMeetings())
</script>