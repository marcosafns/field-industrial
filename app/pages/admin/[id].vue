<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">

    <!-- Toast popout -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border"
        :class="toast.type === 'success' ? 'bg-white border-green-100' : 'bg-white border-red-100'"
      >
        <div
          class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          :class="toast.type === 'success' ? 'bg-green-100' : 'bg-red-100'"
        >
          <Icon
            :name="toast.type === 'success' ? 'lucide:check-circle' : 'lucide:x-circle'"
            class="w-5 h-5"
            :class="toast.type === 'success' ? 'text-green-600' : 'text-red-500'"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-900">{{ toast.title }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ toast.message }}</p>
        </div>
        <button @click="toast.show = false" class="ml-2 text-gray-300 hover:text-gray-500 transition-colors">
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
    </Transition>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-[#f17b21] border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="meeting" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Coluna esquerda -->
      <div class="lg:col-span-2 flex flex-col gap-4">

        <!-- Dados do solicitante -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <div class="flex items-start justify-between mb-4">
            <h1 class="text-xl font-bold text-gray-900">{{ meeting.name }}</h1>
            <span
              class="text-xs font-semibold px-2.5 py-1 rounded-full"
              :class="statusClass(meeting.status)"
            >{{ statusLabel(meeting.status) }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:mail" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.email }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:phone" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.phone || '—' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:building" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.company || '—' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:briefcase" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.role || '—' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:map-pin" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.city_state || '—' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:hash" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.cnpj || '—' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:calendar" class="w-4 h-4 text-[#f17b21]" />
              {{ meeting.preferred_date ? formatDate(meeting.preferred_date) : '—' }}
              {{ meeting.preferred_time ? `às ${meeting.preferred_time}` : '' }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:alert-circle" class="w-4 h-4 text-[#f17b21]" />
              <span :class="urgencyClass(meeting.urgency)">{{ urgencyLabel(meeting.urgency) }}</span>
            </div>
          </div>

          <!-- Tipo de serviço -->
          <div v-if="meeting.service_type" class="mt-4 pt-4 border-t border-gray-50">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-[#f17b21]">
              {{ serviceLabel(meeting.service_type) }}
            </span>
            <span v-if="meeting.equipment_type" class="ml-2 text-xs text-gray-400">
              {{ meeting.equipment_type }}
            </span>
          </div>
        </div>

        <!-- Assunto e mensagem -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 class="font-semibold text-gray-900 mb-2">Assunto</h2>
          <p class="text-sm text-gray-600 font-medium mb-4">{{ meeting.subject }}</p>
          <h2 class="font-semibold text-gray-900 mb-2">Mensagem</h2>
          <p class="text-sm text-gray-600 leading-relaxed">{{ meeting.message || '—' }}</p>
        </div>

        <!-- Resposta enviada -->
        <div v-if="meeting.admin_response" class="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 class="font-semibold text-gray-900 mb-2">Resposta enviada</h2>
          <p class="text-sm text-gray-600 leading-relaxed">{{ meeting.admin_response }}</p>
          <p class="text-xs text-gray-400 mt-2">{{ formatDate(meeting.responded_at) }}</p>
        </div>

        <!-- Notas internas -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="lucide:lock" class="w-4 h-4 text-gray-400" />
            <h2 class="font-semibold text-gray-900">Notas Internas</h2>
            <span class="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Visível só para admins</span>
          </div>
          <textarea
            v-model="internalNotes"
            rows="3"
            placeholder="Anotações internas sobre esta solicitação..."
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 resize-none mb-3"
          />
          <button
            @click="saveNotes"
            :disabled="savingNotes"
            class="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            <div v-if="savingNotes" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <Icon v-else name="lucide:save" class="w-3.5 h-3.5" />
            {{ savingNotes ? 'Salvando...' : 'Salvar nota' }}
          </button>
        </div>

      </div>

      <!-- Coluna direita -->
      <div class="flex flex-col gap-4">

        <!-- Responsável -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="lucide:user-check" class="w-4 h-4 text-gray-400" />
            <h2 class="font-semibold text-gray-900">Responsável</h2>
          </div>
          <div v-if="!meeting.assigned_to" class="mb-4">
            <p class="text-xs text-gray-400 mb-3">Nenhum responsável atribuído</p>
            <button
              @click="assignToMe"
              :disabled="assigning"
              class="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            >
              <Icon name="lucide:hand" class="w-4 h-4" />
              Assumir responsabilidade
            </button>
          </div>
          <div v-else class="mb-4">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
              <div class="w-8 h-8 rounded-lg bg-[#f17b21] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {{ meeting.assigned_name?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ meeting.assigned_name }}</p>
                <p class="text-xs text-gray-400">Desde {{ formatDate(meeting.assigned_at) }}</p>
              </div>
            </div>
          </div>
          <label class="text-xs text-gray-400 mb-1 block">Atribuir para</label>
          <select
            v-model="selectedAdmin"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 mb-2"
          >
            <option value="">Selecionar admin...</option>
            <option v-for="admin in admins" :key="admin.id" :value="admin.id">
              {{ admin.name || admin.email }}
            </option>
          </select>
          <button
            v-if="selectedAdmin"
            @click="assignTo(selectedAdmin)"
            :disabled="assigning"
            class="w-full flex items-center justify-center gap-2 bg-[#f17b21] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#d96a10] transition-colors duration-200 disabled:opacity-50"
          >
            <Icon name="lucide:user-plus" class="w-4 h-4" />
            Atribuir
          </button>
        </div>

        <!-- Proposta -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="lucide:file-check" class="w-4 h-4 text-gray-400" />
            <h2 class="font-semibold text-gray-900">Proposta</h2>
            <span v-if="meeting.proposal_sent_at" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">Enviada</span>
          </div>

          <label class="text-xs text-gray-400 mb-1 block">Valor (R$)</label>
          <input
            v-model="form.proposal_value"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 120.00"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 mb-3"
          />

          <label class="text-xs text-gray-400 mb-1 block">Link da reunião (Meet / Teams)</label>
          <input
            v-model="form.meeting_link"
            type="url"
            placeholder="https://meet.google.com/..."
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 mb-3"
          />

          <p class="text-xs text-gray-400 mb-3 flex items-center gap-1">
            <Icon name="lucide:info" class="w-3.5 h-3.5" />
            Será enviado no e-mail ao aprovar com valor preenchido
          </p>

          <div v-if="meeting.proposal_sent_at" class="text-xs text-gray-400 flex items-center gap-1">
            <Icon name="lucide:check" class="w-3.5 h-3.5 text-green-500" />
            Enviada em {{ formatDate(meeting.proposal_sent_at) }}
          </div>
        </div>

        <!-- Ações -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Ações</h2>
          <div class="flex flex-col gap-2 mb-4">
            <button
              v-for="action in actions"
              :key="action.value"
              @click="form.status = action.value"
              class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200"
              :class="form.status === action.value
                ? `${action.activeClass} border-transparent`
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'"
            >
              <Icon :name="action.icon" class="w-4 h-4" />
              {{ action.label }}
            </button>
          </div>
          <label class="text-sm text-gray-500 mb-1 block">Resposta ao cliente</label>
          <textarea
            v-model="form.admin_response"
            rows="4"
            placeholder="Escreva uma resposta que será enviada por e-mail..."
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 resize-none mb-4"
          />
          <button
            @click="save"
            :disabled="saving"
            class="w-full bg-[#f17b21] text-white font-semibold py-3 rounded-xl hover:bg-[#d96a10] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <div v-if="saving" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {{ saving ? 'Salvando...' : 'Salvar e enviar e-mail' }}
          </button>
        </div>

        <!-- Info -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 text-xs text-gray-400 space-y-1">
          <p>ID: {{ meeting.id }}</p>
          <p>Solicitado em {{ formatDate(meeting.created_at) }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', ssr: false, middleware: 'admin' })

const route = useRoute()
const meeting = ref(null)
const loading = ref(true)
const saving = ref(false)
const internalNotes = ref('')
const savingNotes = ref(false)
const admins = ref([])
const selectedAdmin = ref('')
const assigning = ref(false)

const toast = ref({ show: false, type: 'success', title: '', message: '' })
const form = ref({
  status: '',
  admin_response: '',
  proposal_value: '',
  meeting_link: '',
})

const actions = [
  { label: 'Aprovar', value: 'approved', icon: 'lucide:check-circle', activeClass: 'bg-green-100 text-green-700' },
  { label: 'Recusar', value: 'rejected', icon: 'lucide:x-circle', activeClass: 'bg-red-100 text-red-600' },
  { label: 'Concluir', value: 'completed', icon: 'lucide:check-check', activeClass: 'bg-blue-100 text-blue-700' },
  { label: 'Pendente', value: 'pending', icon: 'lucide:clock', activeClass: 'bg-yellow-100 text-yellow-700' },
]

function showToast(type, title, message) {
  toast.value = { show: true, type, title, message }
  setTimeout(() => { toast.value.show = false }, 4000)
}

async function fetchMeeting() {
  loading.value = true
  try {
    const [meetingData, adminsData] = await Promise.all([
      $fetch(`/api/meetings/${route.params.id}`),
      $fetch('/api/admins'),
    ])
    meeting.value = meetingData
    admins.value = adminsData
    form.value.status = meeting.value.status
    form.value.admin_response = meeting.value.admin_response || ''
    form.value.proposal_value = meeting.value.proposal_value || ''
    form.value.meeting_link = meeting.value.meeting_link || ''
    internalNotes.value = meeting.value.internal_notes || ''
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    await $fetch(`/api/meetings/${route.params.id}`, {
      method: 'PATCH',
      body: form.value,
    })
    showToast('success', 'Salvo com sucesso!', 'Status atualizado e e-mail enviado ao cliente.')
    await fetchMeeting()
  } catch {
    showToast('error', 'Erro ao salvar', 'Verifique a conexão e tente novamente.')
  } finally {
    saving.value = false
  }
}

async function saveNotes() {
  savingNotes.value = true
  try {
    await $fetch(`/api/meetings/notes/${route.params.id}`, {
      method: 'PATCH',
      body: { internal_notes: internalNotes.value },
    })
    showToast('success', 'Nota salva!', 'Anotação interna atualizada com sucesso.')
  } catch {
    showToast('error', 'Erro ao salvar', 'Tente novamente.')
  } finally {
    savingNotes.value = false
  }
}

async function assignToMe() {
  assigning.value = true
  try {
    await $fetch(`/api/meetings/assigned/${route.params.id}`, { method: 'PATCH', body: { admin_id: 'me' } })
    showToast('success', 'Responsabilidade assumida!', 'Você é o responsável por esta solicitação.')
    await fetchMeeting()
  } catch {
    showToast('error', 'Erro ao atribuir', 'Tente novamente.')
  } finally {
    assigning.value = false
  }
}

async function assignTo(adminId) {
  assigning.value = true
  try {
    await $fetch(`/api/meetings/assigned/${route.params.id}`, { method: 'PATCH', body: { admin_id: adminId } })
    showToast('success', 'Atribuído com sucesso!', 'Responsável atualizado.')
    selectedAdmin.value = ''
    await fetchMeeting()
  } catch {
    showToast('error', 'Erro ao atribuir', 'Tente novamente.')
  } finally {
    assigning.value = false
  }
}

function statusLabel(status) {
  return {
    pending: 'Pendente',
    approved: 'Aprovada',
    rejected: 'Recusada',
    completed: 'Concluída',
    confirmed: 'Confirmada pelo cliente ✓',
    declined: 'Recusada pelo cliente',
  }[status] ?? status
}

function statusClass(status) {
  return {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    declined: 'bg-rose-100 text-rose-600',
  }[status] ?? 'bg-gray-100 text-gray-600'
}

function serviceLabel(type) {
  return {
    meeting: 'Reunião Inicial',
    consulting: 'Consultoria Técnica',
    remote_diagnosis: 'Diagnóstico Remoto',
    document_analysis: 'Análise de Documentos',
    budget: 'Solicitar Orçamento',
  }[type] ?? type
}

function urgencyLabel(urgency) {
  return { low: 'Baixa', medium: 'Média', high: 'Alta' }[urgency] ?? '—'
}

function urgencyClass(urgency) {
  return {
    low: 'text-blue-600 font-medium',
    medium: 'text-yellow-600 font-medium',
    high: 'text-red-600 font-medium',
  }[urgency] ?? 'text-gray-500'
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  await fetchMeeting()
  await $fetch(`/api/meetings/viewed/${route.params.id}`, { method: 'POST' }).catch(() => {})
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>