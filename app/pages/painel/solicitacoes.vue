<template>
  <section>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-[#0f172a]">
          Meus agendamentos
        </h1>
        <p class="text-sm text-gray-500">
          Visualize e gerencie as solicitações de agendamento recebidas para este perfil.
        </p>
      </div>

      <div class="flex gap-2">
        <button
          class="px-3 py-2 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition"
          @click="filtroStatus = 'TODOS'"
        >
          Todos
        </button>
        <button
          class="px-3 py-2 rounded-lg text-xs font-semibold border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
          @click="filtroStatus = 'PENDENTE'"
        >
          Pendentes
        </button>
        <button
          class="px-3 py-2 rounded-lg text-xs font-semibold border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
          @click="filtroStatus = 'APROVADO'"
        >
          Aprovados
        </button>
        <button
          class="px-3 py-2 rounded-lg text-xs font-semibold border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 transition"
          @click="filtroStatus = 'REJEITADO'"
        >
          Rejeitados
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
        <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Lista de agendamentos
        </span>
        <button
          class="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-4"
          @click="carregarSolicitacoes"
        >
          Atualizar
        </button>
      </div>

      <div v-if="loading" class="px-6 py-6 text-sm text-gray-500">
        Carregando solicitações...
      </div>

      <div v-else-if="erro" class="px-6 py-6 text-sm text-red-500">
        {{ erro }}
      </div>

      <div v-else>
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50">
            <tr class="text-left text-xs font-semibold text-gray-500 uppercase">
              <th class="px-6 py-3">Data</th>
              <th class="px-6 py-3">Empresa</th>
              <th class="px-6 py-3">Solicitante</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filtradas"
              :key="item.id"
              class="border-t border-gray-100 hover:bg-gray-50"
            >
              <td class="px-6 py-3 whitespace-nowrap">
                {{ formatarData(item.data_agendamento) }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ item.empresa || '-' }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ item.nome }}
              </td>
              <td class="px-6 py-3">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="chipClass(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-3 text-right">
                <button
                  class="text-xs font-semibold text-orange-600 hover:text-orange-800"
                  @click="verSolicitacao(item.id)"
                >
                  Ver detalhes
                </button>
              </td>
            </tr>

            <tr v-if="!filtradas.length">
              <td colspan="5" class="px-6 py-6 text-center text-sm text-gray-500">
                Nenhuma solicitação encontrada para este filtro.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-engineer'
})

const router = useRouter()

const loading = ref(true)
const erro = ref('')
const solicitacoes = ref([])
const filtroStatus = ref('TODOS')

const carregarSolicitacoes = async () => {
  loading.value = true
  erro.value = ''
  try {
    const data = await $fetch('/api/solicitacoes')
    solicitacoes.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error(err)
    const msg =
      (err && err.data && err.data.statusMessage) ||
      'Erro ao carregar solicitações.'
    erro.value = msg
  } finally {
    loading.value = false
  }
}

const filtradas = computed(() => {
  if (filtroStatus.value === 'TODOS') return solicitacoes.value
  return solicitacoes.value.filter(
    (item) => item.status === filtroStatus.value
  )
})

const formatarData = (valor) => {
  if (!valor) return ''
  const d = new Date(valor)
  if (Number.isNaN(d.getTime())) return valor
  return d.toLocaleDateString('pt-BR')
}

const chipClass = (status) => {
  if (status === 'APROVADO') return 'bg-emerald-100 text-emerald-700'
  if (status === 'REJEITADO') return 'bg-rose-100 text-rose-700'
  if (status === 'REAGENDAR') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-700'
}

const verSolicitacao = (id) => {
  router.push(`/solicitacao/${id}`)
}

onMounted(() => {
  carregarSolicitacoes()
})
</script>
