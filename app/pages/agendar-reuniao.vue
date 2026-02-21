<template>
  <section id="agendar-reuniao" class="bg-white py-24 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">

      <div class="text-center mb-12">
        <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Contato</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Agendar Reunião</h2>
        <div class="w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
        <p class="text-gray-500 text-sm mt-4">Preencha o formulário e entraremos em contato em até 24h.</p>
      </div>

      <!-- Sucesso -->
      <div v-if="success" class="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <Icon name="lucide:check-circle" class="w-10 h-10 text-green-500 mx-auto mb-3" />
        <h3 class="font-bold text-green-800 text-lg mb-1">Solicitação enviada!</h3>
        <p class="text-green-600 text-sm">Entraremos em contato em breve. Obrigado!</p>
        <button
          @click="success = false; resetForm()"
          class="mt-4 text-sm text-green-700 underline"
        >Enviar outra solicitação</button>
      </div>

      <!-- Formulário -->
      <form v-else @submit.prevent="submit" class="flex flex-col gap-5">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">Nome <span class="text-[#f17b21]">*</span></label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Seu nome completo"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">E-mail <span class="text-[#f17b21]">*</span></label>
            <input
              v-model="form.email"
              type="email"
              placeholder="seu@email.com"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="(00) 00000-0000"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">Empresa</label>
            <input
              v-model="form.company"
              type="text"
              placeholder="Nome da empresa"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Assunto <span class="text-[#f17b21]">*</span></label>
          <input
            v-model="form.subject"
            type="text"
            placeholder="Ex: Inspeção de vasos de pressão"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">Data preferencial</label>
            <input
              v-model="form.preferred_date"
              type="date"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">Horário preferencial</label>
            <select
              v-model="form.preferred_time"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200"
            >
              <option value="">Selecione</option>
              <option>08:00 - 09:00</option>
              <option>09:00 - 10:00</option>
              <option>10:00 - 11:00</option>
              <option>11:00 - 12:00</option>
              <option>13:00 - 14:00</option>
              <option>14:00 - 15:00</option>
              <option>15:00 - 16:00</option>
              <option>16:00 - 17:00</option>
            </select>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Mensagem</label>
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Descreva brevemente o que precisa..."
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] transition-colors duration-200 resize-none"
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="flex items-center justify-center gap-2 bg-[#f17b21] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#d96a10] transition-all duration-300 shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Icon name="lucide:calendar" class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          {{ loading ? 'Enviando...' : 'Enviar Solicitação' }}
        </button>

      </form>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const reagendarId = route.query.reagendar

const success = ref(false)
const loading = ref(false)
const error = ref('')
const isReschedule = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  preferred_date: '',
  preferred_time: '',
})

// Se vier com ?reagendar=ID, busca os dados e preenche
onMounted(async () => {
  if (reagendarId) {
    try {
      const data = await $fetch(`/api/meetings/public/${reagendarId}`)
      isReschedule.value = true
      form.value.name = data.name
      form.value.email = data.email
      form.value.phone = data.phone ?? ''
      form.value.company = data.company ?? ''
      form.value.subject = data.subject ?? ''
      form.value.message = data.message ?? ''
      // data e horário ficam em branco para o cliente escolher novamente
    } catch {
      // se não achar, ignora e deixa formulário vazio
    }
  }
})

function resetForm() {
  form.value = {
    name: '', email: '', phone: '', company: '',
    subject: '', message: '', preferred_date: '', preferred_time: '',
  }
}

async function submit() {
  loading.value = true
  error.value = ''
  try {
    if (reagendarId) {
      // Atualiza o registro existente em vez de criar um novo
      await $fetch(`/api/meetings/reschedule/${reagendarId}`, {
        method: 'PATCH',
        body: form.value,
      })
    } else {
      await $fetch('/api/meetings', {
        method: 'POST',
        body: form.value,
      })
    }
    success.value = true
  } catch {
    error.value = 'Erro ao enviar. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>