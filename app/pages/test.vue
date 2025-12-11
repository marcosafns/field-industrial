<template>
  <main class="w-full bg-[#f8f6f2]">
    <!-- TOAST -->
    <div
      v-if="toast.show"
      class="fixed inset-x-0 bottom-6 z-50 flex justify-center"
    >
      <div
        :class="[
          'w-80 max-w-[90%] px-4 py-3 rounded-lg shadow-lg border animate-slide-up',
          toast.type === 'error'
            ? 'bg-red-100 border-red-300 text-red-700'
            : toast.type === 'warning'
            ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
            : 'bg-green-100 border-green-300 text-green-800'
        ]"
      >
        <p class="font-semibold text-sm">
          {{ toast.message }}
        </p>
        <div class="h-1 mt-3 rounded overflow-hidden bg-black/5">
          <div
            :class="[
              'h-full animate-timer',
              toast.type === 'error'
                ? 'bg-red-500'
                : toast.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            ]"
          ></div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-10">
      <div
        class="w-full bg-white shadow-lg rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-10 mx-auto px-8 py-10 flex gap-10 mt-20"
      >
        <!-- COLUNA ESQUERDA: DATA + CALENDÁRIO -->
        <section
          class="w-full md:w-1/3 border-r border-gray-100 pr-0 md:pr-6 flex flex-col gap-4"
        >
          <div>
            <h2 class="text-xl font-semibold text-[#1D1D1B]">Escolha a data</h2>
            <p class="text-sm text-gray-500 mt-1">
              Selecione o dia desejado para o agendamento.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Data do agendamento
            </label>

            <div class="relative">
              <input
                v-model="form.date"
                type="text"
                placeholder="dd/mm/aaaa"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                @input="onInputDate"
              />

              <button
                type="button"
                class="absolute inset-y-0 right-0 px-3 flex items-center justify-center text-gray-400 hover:text-orange-500"
                @click="showCalendar = !showCalendar"
              >
              <Icon name="lucide:calendar"></Icon>
              </button>
            </div>
          </div>

          <p class="text-xs text-gray-500">
            Você pode digitar a data ou escolher pelo calendário.
          </p>

          <div v-if="showCalendar" class="mt-2">
            <div
              class="rounded-2xl border border-gray-200 bg-gray-50 p-3 flex justify-center"
            >
              <VDatePicker
                v-model="calendarValue"
                is-inline
                :popover="false"
                transparent
                borderless
                color="orange"
                locale="pt-BR"
                @dayclick="onCalendarSelect"
              />
            </div>
          </div>
        </section>

        <!-- COLUNA DIREITA: FORMULÁRIO -->
        <section class="w-full md:w-2/3 flex flex-col gap-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-[#1D1D1B]">
              Agendamento de atendimento
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              Preencha as informações abaixo para solicitar uma reunião, visita
              técnica ou execução de serviço.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tipo de agendamento
              </label>
              <select
                v-model="form.tipo"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="" disabled>Selecione uma opção</option>
                <option value="reuniao">Reunião</option>
                <option value="visita_tecnica">Visita técnica</option>
                <option value="execucao_servico">Execução de serviço</option>
              </select>
            </div>

            <div class="md:col-span-2 mt-2">
              <h2 class="text-lg font-semibold text-[#1D1D1B]">
                Dados do solicitante
              </h2>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Assunto
              </label>
              <input
                v-model="form.assunto"
                type="text"
                placeholder="Ex.: Reunião para alinhamento de projeto"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                v-model="form.nome"
                type="text"
                placeholder="Nome completo"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                v-model="form.cpf"
                type="text"
                placeholder="000.000.000-00"
                @input="onInputCpf"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
              <input
                v-model="form.cargo"
                type="text"
                placeholder="Cargo do solicitante"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                v-model="form.empresa"
                type="text"
                placeholder="Nome da empresa"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Local
              </label>
              <input
                v-model="form.local"
                type="text"
                placeholder="Endereço ou local do atendimento"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="seuemail@empresa.com"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-end mt-4 gap-3">
            <button
              type="button"
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
              @click="resetForm"
            >
              Limpar
            </button>
            <button
              type="button"
              class="px-6 py-3 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition shadow-sm"
              @click="submitForm"
            >
              Enviar solicitação
            </button>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const form = reactive({
  date: '',
  tipo: '',
  assunto: '',
  nome: '',
  cpf: '',
  cargo: '',
  empresa: '',
  local: '',
  email: ''
})

/* ---------- TOAST ---------- */
const toast = ref({
  show: false,
  message: '',
  type: 'error' // 'error' | 'warning' | 'success'
})

const showToast = (message, type = 'error', duration = 3000) => {
  toast.value.message = message
  toast.value.type = type
  toast.value.show = true

  setTimeout(() => {
    toast.value.show = false
  }, duration)
}

/* ---------- VALIDAÇÃO DE E-MAIL ---------- */
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return regex.test(email)
}

/* ---------- HELPERS ---------- */
const upper = (v) => (v || '').toString().toUpperCase()

const formatCpfPlain = (value) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11)
  if (digits.length !== 11) return upper(value)
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

const getTipoLabel = (value) => {
  const map = {
    reuniao: 'Reunião',
    visita_tecnica: 'Visita Técnica',
    execucao_servico: 'Execução de Serviço'
  }
  return map[value] || value
}

/* ---------- CPF MÁSCARA NO INPUT ---------- */
const onInputCpf = (event) => {
  let v = event.target.value.replace(/\D/g, '').slice(0, 11)

  if (v.length > 9) {
    form.cpf = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`
  } else if (v.length > 6) {
    form.cpf = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`
  } else if (v.length > 3) {
    form.cpf = `${v.slice(0, 3)}.${v.slice(3)}`
  } else {
    form.cpf = v
  }
}

/* ---------- CALENDÁRIO (VDatePicker) ---------- */
const showCalendar = ref(false)
const calendarValue = ref(null)

const formatDateMask = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (!digits) return ''
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const onInputDate = (event) => {
  form.date = formatDateMask(event.target.value || '')
}

const onCalendarSelect = ({ date }) => {
  if (!date) return
  const js = Array.isArray(date) ? date[0] : date
  if (!js) return
  form.date = js.toLocaleDateString('pt-BR')
  calendarValue.value = js
  showCalendar.value = false
}

watch(calendarValue, (value) => {
  if (!value) return
  form.date = value.toLocaleDateString('pt-BR')
})

/* ---------- RESET ---------- */
const resetForm = () => {
  form.date = ''
  form.tipo = ''
  form.assunto = ''
  form.nome = ''
  form.cpf = ''
  form.cargo = ''
  form.empresa = ''
  form.local = ''
  form.email = ''
  calendarValue.value = null
}

/* ---------- SUBMIT (agora usando API /api/send-email) ---------- */
const submitForm = async () => {
  if (
    !form.date ||
    !form.tipo ||
    !form.assunto ||
    !form.nome ||
    !form.email ||
    !form.empresa
  ) {
    showToast('Preencha todos os campos obrigatórios.', 'warning')
    return
  }

  // validação de CPF (11 dígitos)
  const cpfDigits = form.cpf.replace(/\D/g, '')
  if (cpfDigits.length !== 11) {
    showToast('Por favor, insira um CPF válido (11 dígitos).', 'error')
    return
  }

  if (!isValidEmail(form.email)) {
    showToast('Por favor, insira um e-mail válido.', 'error')
    return
  }

  try {
    showToast('Enviando solicitação...', 'warning', 4000)

    await $fetch('/api/send-email', {
      method: 'POST',
      body: { ...form }
    })

    showToast('Solicitação enviada com sucesso.', 'success')
    // se quiser limpar depois:
    // resetForm()
  } catch (err) {
    console.error(err)
    showToast('Erro ao enviar a solicitação. Tente novamente.', 'error')
  }
}
</script>


<style>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes timer {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-slide-up {
  animation: slide-up 0.25s ease-out;
}

.animate-timer {
  animation: timer 3s linear forwards;
}
</style>
