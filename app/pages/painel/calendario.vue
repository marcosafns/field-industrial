<template>
  <section>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-[#1D1D1B]">
          Calendário de agendamentos
        </h1>
        <p class="text-sm text-gray-500">
          Visualize os agendamentos por dia do mês.
        </p>
      </div>
    </div>

    <div class="mb-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          @click="goToToday"
        >
          Hoje
        </button>

        <div class="flex items-center gap-1">
          <button
            type="button"
            class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            @click="prevMonth"
          >
            ‹
          </button>
          <button
            type="button"
            class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            @click="nextMonth"
          >
            ›
          </button>
        </div>
      </div>

      <div class="text-right">
        <div class="text-sm font-semibold text-[#1D1D1B]">
          {{ monthName }} de {{ currentYear }}
        </div>
        <div class="text-xs text-gray-500">
          Passe o mouse sobre os dias para ver mais detalhes.
        </div>
      </div>
    </div>

<div class="mb-4">
  <h2 class="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
    Legenda
  </h2>

  <div class="flex flex-wrap items-center gap-2 text-[11px]">

    <!-- Aprovado -->
    <div
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm"
      style="background-color: #dcfce7; border-color: #86efac;"
    >
      <span class="h-2.5 w-2.5 rounded-full" style="background-color: #16a34a;"></span>
      <span class="text-[#166534] font-medium">Aprovado</span>
    </div>

    <!-- Rejeitado -->
    <div
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm"
      style="background-color: #fee2e2; border-color: #fca5a5;"
    >
      <span class="h-2.5 w-2.5 rounded-full" style="background-color: #ef4444;"></span>
      <span class="text-[#7f1d1d] font-medium">Rejeitado</span>
    </div>

    <!-- Reagendar -->
    <div
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm"
      style="background-color: #fef9c3; border-color: #fde68a;"
    >
      <span class="h-2.5 w-2.5 rounded-full" style="background-color: #facc15;"></span>
      <span class="text-[#92400e] font-medium">Reagendar</span>
    </div>

    <!-- Pendente -->
    <div
      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm"
      style="background-color: #e5e7eb; border-color: #d1d5db;"
    >
      <span class="h-2.5 w-2.5 rounded-full" style="background-color: #6b7280;"></span>
      <span class="text-[#374151] font-medium">Pendente</span>
    </div>

  </div>
</div>




    <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div class="calendar-week-header border-b border-gray-200 bg-[#faf7f1] px-4">
        <div
          v-for="dia in daysOfWeek"
          :key="dia"
          class="py-2 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wide"
        >
          {{ dia }}
        </div>
      </div>

      <div class="calendar-grid bg-[#f3f4f6] px-3 pb-3 pt-2">
        <div
          v-for="day in calendarDays"
          :key="day.dateKey"
          class="calendar-cell cursor-pointer"
          :class="{
            'calendar-cell--today': day.isToday,
            'bg-gray-50 text-gray-400': !day.isCurrentMonth && !day.isToday,
            'calendar-cell--expanded': expandedDayKey === day.dateKey
          }"
          @mouseenter="onHoverDay(day)"
          @mouseleave="onLeaveDay"
        >
          <div class="calendar-inner">
            <div class="flex items-center justify-between px-2 pt-1 pb-0.5">
              <span
                class="text-[10px]"
                :class="{
                  'font-semibold text-orange-700 bg-white border border-orange-500 rounded-full px-1 inline-block':
                    day.isToday,
                  'text-gray-700': !day.isToday && day.isCurrentMonth
                }"
              >
                {{ day.day }}
              </span>


            </div>

 <div class="calendar-events">
  <template v-if="expandedDayKey === day.dateKey && day.solicitacoes.length > 2">
    <button
      v-for="item in day.solicitacoes"
      :key="item.id"
      class="w-full text-[10px] font-medium tracking-tight text-left px-2 py-0.5 rounded-full hover:opacity-95 border"
      :style="statusStyle(item.status)"
      @click.stop="verSolicitacao(item.id)"
    >
      {{ item.empresa || 'Agendamento' }}
    </button>
  </template>

  <template v-else>
    <button
      v-for="item in day.displayedEvents"
      :key="item.id"
      class="w-full text-[10px] font-medium tracking-tight text-left px-2 py-0.5 rounded-full truncate hover:opacity-95 border"
      :style="statusStyle(item.status)"
      @click.stop="verSolicitacao(item.id)"
    >
      {{ item.empresa || 'Agendamento' }}
    </button>

    <div
      v-if="day.extraCount > 0"
      class="mt-0.5 text-[9px] text-gray-500 font-medium truncate"
    >
      {{ day.extraCount }}+ agendamentos
    </div>
  </template>
</div>

          </div>
        </div>
      </div>
    </div>

    <div
      v-if="hoveredDay"
      class="mt-4 rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-700 shadow-sm"
    >
      <div class="flex items-center justify-between mb-1.5">
        <div class="font-semibold text-[#1D1D1B]">
          {{ hoveredDayLabel }}
        </div>
        <div class="text-[11px] text-gray-500">
          {{ hoveredDay.solicitacoes.length }} agendamentos
        </div>
      </div>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="item in hoveredDay.solicitacoes"
          :key="item.id"
          class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium"
          :style="statusStyle(item.status)"
        >
          {{ item.empresa || 'Agendamento' }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const dateFromISO = (iso) => {
  if (!iso) return new Date()
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-engineer'
})

const router = useRouter()

const hoje = new Date()
const currentMonth = ref(hoje.getMonth())
const currentYear = ref(hoje.getFullYear())

const monthName = computed(() => {
  const d = new Date(currentYear.value, currentMonth.value, 1)
  const nome = d.toLocaleDateString('pt-BR', { month: 'long' })
  return nome.charAt(0).toUpperCase() + nome.slice(1)
})

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const solicitacoes = ref([])
const carregando = ref(false)
const erro = ref('')

const normalizarData = (valor) => {
  if (!valor) return null
  if (typeof valor === 'string') {
    return valor.slice(0, 10)
  }
  if (valor instanceof Date) {
    return valor.toISOString().slice(0, 10)
  }
  return null
}

const carregarSolicitacoes = async () => {
  try {
    carregando.value = true
    erro.value = ''
    const data = await $fetch('/api/solicitacoes')
    solicitacoes.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error(e)
    erro.value = 'Erro ao carregar os agendamentos.'
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  carregarSolicitacoes()
})

const calendarDays = computed(() => {
  const days = []

  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)

  const getWeekdayIndex = (date) => {
    const day = date.getDay()
    return (day + 6) % 7
  }

  const startOffset = getWeekdayIndex(firstDayOfMonth)
  const totalCells = 42

  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(firstDayOfMonth.getDate() - startOffset)

  for (let i = 0; i < totalCells; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    const dateKey = currentDate.toISOString().slice(0, 10)
    const isCurrentMonth =
      currentDate.getMonth() === currentMonth.value &&
      currentDate.getFullYear() === currentYear.value

    const eventosDoDia = solicitacoes.value.filter((ev) => {
      const dataEv = normalizarData(ev.data_agendamento)
      return dataEv === dateKey
    })

    const displayedEvents = eventosDoDia.slice(0, 2)
    const extraCount = Math.max(eventosDoDia.length - displayedEvents.length, 0)

    days.push({
      day: currentDate.getDate(),
      dateKey,
      isCurrentMonth,
      isToday:
        currentDate.getDate() === hoje.getDate() &&
        currentDate.getMonth() === hoje.getMonth() &&
        currentDate.getFullYear() === hoje.getFullYear(),
      solicitacoes: eventosDoDia,
      displayedEvents,
      extraCount
    })
  }

  return days
})

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

const goToToday = () => {
  currentMonth.value = hoje.getMonth()
  currentYear.value = hoje.getFullYear()
}

const hoveredDay = ref(null)
const expandedDayKey = ref(null)

const onHoverDay = (day) => {
  hoveredDay.value = day
  expandedDayKey.value = day.extraCount > 0 ? day.dateKey : null
}

const onLeaveDay = () => {
  expandedDayKey.value = null
}

const hoveredDayLabel = computed(() => {
  if (!hoveredDay.value) return ''
  const d = dateFromISO(hoveredDay.value.dateKey)
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

const statusStyle = (status) => {
  const s = (status || '').toUpperCase()

  if (s === 'APROVADO') {
    return {
      backgroundColor: '#bbf7d0',
      color: '#166534',
      borderColor: '#16a34a'
    }
  }

  if (s === 'PENDENTE') {
    return {
      backgroundColor: '#e5e7eb',
      color: '#111827',
      borderColor: '#6b7280'
    }
  }

  if (s === 'REAGENDAR' || s === 'REAGENDADO' || s === 'REAGENDAMENTO') {
    return {
      backgroundColor: '#fef9c3',
      color: '#92400e',
      borderColor: '#facc15'
    }
  }

  if (s === 'REJEITADO') {
    return {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderColor: '#b91c1c'
    }
  }

  return {
    backgroundColor: '#e5e7eb',
    color: '#111827',
    borderColor: '#6b7280'
  }
}

const verSolicitacao = (id) => {
  if (!id) return
  router.push(`/solicitacao/${id}`)
}
</script>

<style scoped>
.calendar-week-header {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  column-gap: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  column-gap: 8px;
  row-gap: 8px;
  overflow: visible;
}

/* célula com altura fixa; quem cresce visualmente é o inner */
.calendar-cell {
  height: 110px;
  border-radius: 0.75rem;
  background-color: white;
  border: 1px solid rgb(229 231 235);
  position: relative;
  overflow: visible;
}

/* conteúdo absoluto dentro da célula, assim a row não muda de altura */
.calendar-inner {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  background-color: inherit;
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.15s ease-out,
    border-color 0.15s ease-out;
  transform-origin: center center;
}

/* hover normal = zoom leve */
.calendar-cell:hover .calendar-inner {
  transform: scale(1.04);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.18);
  background-color: #fefcf7;
}

/* hoje com fundo especial */
.calendar-cell--today .calendar-inner {
  background-color: #fff7ed;
  border-color: #fb923c;
}

/* dia expandido (3+ agendamentos) = zoom maior */
.calendar-cell--expanded .calendar-inner {
  transform: scale(1.14);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.22);
  background-color: #fefcf7;
  z-index: 30;
}

.calendar-cell--expanded:hover .calendar-inner {
  transform: scale(1.18);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.28);
}

.calendar-events {
  flex: 1;
  padding: 0 0.375rem 0.375rem 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: visible;
}

/* --- ajustes só quando estiver EXPANDIDO --- */
.calendar-cell--expanded .calendar-events {
  padding-top: 0.15rem;
  padding-bottom: 0.25rem;
  gap: 1px;
}

.calendar-cell--expanded .calendar-events button {
  font-size: 9px;
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>


