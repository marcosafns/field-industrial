<template>
  <main class="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg px-8 py-10 max-w-2xl w-full">
      <h1 class="text-2xl font-bold mb-2 text-[#1D1D1B]">
        Solicitação de agendamento
      </h1>

      <p class="text-sm text-gray-600 mb-4">
        ID:
        <span class="font-mono text-xs">
          {{ id }}
        </span>
      </p>

      <div v-if="loading" class="text-sm text-gray-500">
        Carregando solicitação...
      </div>

      <div v-else-if="error" class="text-sm text-red-500">
        {{ error }}
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Status atual:</span>
            <span
              class="ml-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusChipClass"
            >
              {{ solicitacao.status }}
            </span>
          </p>
          <p class="text-sm text-gray-500">
            Data do agendamento:
            <strong>{{ dataFormatada }}</strong>
          </p>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h2 class="text-sm font-semibold text-gray-800 mb-2">
            Dados do agendamento
          </h2>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Tipo:</span>
            {{ solicitacao.tipo }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Assunto:</span>
            {{ solicitacao.assunto }}
          </p>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h2 class="text-sm font-semibold text-gray-800 mb-2">
            Dados do solicitante
          </h2>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Nome:</span>
            {{ solicitacao.nome }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">CPF:</span>
            {{ solicitacao.cpf }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Cargo:</span>
            {{ solicitacao.cargo }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Empresa:</span>
            {{ solicitacao.empresa }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Local:</span>
            {{ solicitacao.local_atendimento }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">E-mail:</span>
            {{ solicitacao.email }}
          </p>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h2 class="text-sm font-semibold text-gray-800 mb-3">
            Ações
          </h2>
          <div class="flex flex-wrap gap-3">
            <button
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition"
              @click="alterarStatus('APROVADO')"
            >
              Aprovar
            </button>

            <button
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
              @click="alterarStatus('REJEITADO')"
            >
              Rejeitar
            </button>

            <button
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition"
              @click="alterarStatus('REAGENDAR')"
            >
              Marcar para reagendar
            </button>
          </div>
        </div>

        <p v-if="mensagem" class="text-sm mt-3" :class="mensagemClass">
          {{ mensagem }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth-engineer'
})

const route = useRoute()

// id da URL (ex: /solicitacao/123)
const id = computed(() => route.params.id)

const loading = ref(true)
const error = ref('')
const solicitacao = ref(null)
const mensagem = ref('')
const mensagemTipo = ref('success')

const dataFormatada = computed(() => {
  if (!solicitacao.value || !solicitacao.value.data_agendamento) return ''
  const d = new Date(solicitacao.value.data_agendamento)
  if (Number.isNaN(d.getTime())) {
    return solicitacao.value.data_agendamento
  }
  return d.toLocaleDateString('pt-BR')
})

const statusChipClass = computed(() => {
  if (!solicitacao.value) return 'bg-gray-100 text-gray-700'
  const status = solicitacao.value.status
  if (status === 'APROVADO') return 'bg-green-100 text-green-700'
  if (status === 'REJEITADO') return 'bg-red-100 text-red-700'
  if (status === 'REAGENDAR') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
})

const mensagemClass = computed(() =>
  mensagemTipo.value === 'success' ? 'text-green-600' : 'text-red-600'
)

const carregarSolicitacao = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await $fetch(`/api/solicitacoes/${id.value}`)
    solicitacao.value = data
  } catch (err) {
    console.error(err)
    const statusMessage =
      (err && err.data && err.data.statusMessage) ||
      'Erro ao carregar solicitação.'
    error.value = statusMessage
  } finally {
    loading.value = false
  }
}

const alterarStatus = async (novoStatus) => {
  try {
    await $fetch(`/api/solicitacoes/${id.value}/status`, {
      method: 'POST',
      body: {
        status: novoStatus
      }
    })
    mensagem.value = 'Status atualizado com sucesso.'
    mensagemTipo.value = 'success'
    if (solicitacao.value) {
      solicitacao.value.status = novoStatus
    }
  } catch (err) {
    console.error(err)
    mensagem.value = 'Erro ao atualizar status.'
    mensagemTipo.value = 'error'
  }
}

onMounted(() => {
  carregarSolicitacao()
})
</script>
