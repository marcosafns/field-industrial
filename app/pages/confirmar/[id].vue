<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="bg-white border border-gray-100 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center gap-4">
        <div class="w-8 h-8 border-2 border-[#f17b21] border-t-transparent rounded-full animate-spin" />
        <p class="text-gray-400 text-sm">Carregando...</p>
      </div>

      <!-- Já respondeu -->
      <div v-else-if="alreadyAnswered">
        <div class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:info" class="w-7 h-7 text-gray-400" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">Resposta já registrada</h2>
        <p class="text-sm text-gray-500">Você já confirmou ou recusou esta reunião anteriormente.</p>
      </div>

      <!-- Confirmado -->
      <div v-else-if="done === 'confirmed'">
        <div class="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:check-circle" class="w-7 h-7 text-green-600" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">Reunião confirmada!</h2>
        <p class="text-sm text-gray-500">Ótimo! Nossa equipe foi notificada. Até breve.</p>
      </div>

      <!-- Recusado -->
      <div v-else-if="done === 'declined'">
        <div class="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:x-circle" class="w-7 h-7 text-red-500" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">Reunião recusada</h2>
        <p class="text-sm text-gray-500 mb-4">Entendemos. Você pode reagendar quando quiser.</p>
        <NuxtLink
          :to="`/agendar-reuniao?reagendar=${route.params.id}`"
          class="inline-flex items-center gap-2 bg-[#f17b21] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#d96a10] transition-colors duration-200"
        >
          <Icon name="lucide:calendar" class="w-4 h-4" />
          Reagendar
        </NuxtLink>
      </div>

      <!-- Aguardando resposta -->
      <div v-else-if="meeting">
        <img src="/img/svg/logo3.svg" alt="Field Industrial" class="h-8 mx-auto mb-6" />
        <h2 class="text-lg font-bold text-gray-900 mb-1">Confirmar reunião</h2>
        <p class="text-sm text-gray-500 mb-6">
          Olá, <strong>{{ meeting.name }}</strong>! Sua reunião foi aprovada. Confirme sua presença:
        </p>

        <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-left space-y-2">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="lucide:calendar" class="w-4 h-4 text-[#f17b21]" />
            {{ formatDate(meeting.preferred_date) }}
            {{ meeting.preferred_time ? `às ${meeting.preferred_time}` : '' }}
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="lucide:briefcase" class="w-4 h-4 text-[#f17b21]" />
            {{ serviceLabel(meeting.service_type) }}
          </div>
          <div v-if="meeting.meeting_link" class="flex items-center gap-2 text-sm text-[#f17b21]">
            <Icon name="lucide:video" class="w-4 h-4" />
            <a :href="meeting.meeting_link" target="_blank" class="underline truncate">{{ meeting.meeting_link }}</a>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="respond('declined')"
            :disabled="responding"
            class="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold py-3 rounded-xl hover:border-red-300 hover:text-red-500 transition-all duration-200 disabled:opacity-50"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
            Recusar
          </button>
          <button
            @click="respond('confirmed')"
            :disabled="responding"
            class="flex-1 flex items-center justify-center gap-2 bg-[#f17b21] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#d96a10] transition-all duration-200 disabled:opacity-50"
          >
            <div v-if="responding" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <Icon v-else name="lucide:check" class="w-4 h-4" />
            Confirmar
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const route = useRoute()
const meeting = ref(null)
const loading = ref(true)
const responding = ref(false)
const done = ref('')
const alreadyAnswered = ref(false)

onMounted(async () => {
  try {
    meeting.value = await $fetch(`/api/meetings/public/${route.params.id}`)
    if (['confirmed', 'declined'].includes(meeting.value.status)) {
      alreadyAnswered.value = true
    }
  } catch {
    meeting.value = null
  } finally {
    loading.value = false
  }
})

async function respond(action) {
  responding.value = true
  try {
    await $fetch(`/api/meetings/confirm/${route.params.id}`, {
      method: 'PATCH',
      body: { action },
    })
    done.value = action
  } catch {
    alert('Erro ao registrar resposta. Tente novamente.')
  } finally {
    responding.value = false
  }
}

function serviceLabel(type) {
  return {
    meeting: 'Reunião Inicial',
    consulting: 'Consultoria Técnica',
    remote_diagnosis: 'Diagnóstico Remoto',
    document_analysis: 'Análise de Documentos',
    budget: 'Orçamento',
  }[type] ?? type
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>