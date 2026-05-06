<template>
  <div class="min-h-screen bg-gray-950 flex">

    <!-- Painel esquerdo -->
    <div class="hidden lg:flex lg:w-2/5 xl:w-1/3 flex-col justify-between p-12 overflow-hidden sticky top-0 h-screen">
      <div class="absolute inset-0 bg-gray-950" />
      <div class="absolute top-0 left-0 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-[#f17b21] rounded-full blur-3xl opacity-5 pointer-events-none" />

      <div class="relative z-10">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/img/svg/logo4.svg" alt="Field Industrial" class="h-20" />
        </NuxtLink>
      </div>

      <div class="relative z-10">
        <span class="text-[#f17b21] text-xs font-bold tracking-widest uppercase">Fale Conosco</span>
        <h1 class="text-3xl xl:text-4xl font-black text-white mt-3 mb-6 leading-tight">
          Entre em contato com nossa equipe
        </h1>
        <p class="text-gray-400 text-sm leading-relaxed mb-10">
          Preencha o formulário e nossa equipe entrará em contato em até 24h úteis.
        </p>

        <div class="flex flex-col gap-4">
          <div v-for="item in sideItems" :key="item.label" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[#f17b21]/10 flex items-center justify-center flex-shrink-0">
              <Icon :name="item.icon" class="w-4 h-4 text-[#f17b21]" />
            </div>
            <div>
              <p class="text-white text-sm font-semibold">{{ item.label }}</p>
              <p class="text-gray-500 text-xs">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10">
        <p class="text-gray-600 text-xs">© 2026 Field Industrial</p>
      </div>
    </div>

    <!-- Painel direito -->
    <div class="flex-1 bg-white overflow-y-auto">

      <!-- Header mobile -->
      <div class="lg:hidden flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <NuxtLink to="/">
          <img src="/img/svg/logo3.svg" alt="Field Industrial" class="h-7" />
        </NuxtLink>
        <NuxtLink to="/" class="text-xs text-gray-400 flex items-center gap-1 hover:text-[#f17b21] transition-colors">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          Voltar
        </NuxtLink>
      </div>

      <div class="max-w-xl mx-auto px-6 py-10 lg:py-14">

        <!-- Sucesso -->
        <div v-if="success" class="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center mb-6">
            <Icon name="lucide:check-circle" class="w-10 h-10 text-green-500" />
          </div>
          <h2 class="text-2xl font-black text-gray-900 mb-2">Mensagem enviada!</h2>
          <p class="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
            Recebemos sua mensagem e retornaremos em até 24h úteis. Obrigado pelo contato!
          </p>
          <button
            @click="success = false; resetForm()"
            class="flex items-center gap-2 text-sm text-[#f17b21] font-semibold hover:underline"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Enviar nova mensagem
          </button>
        </div>

        <form v-else @submit.prevent="submit" class="flex flex-col gap-7">

          <div>
            <h2 class="text-2xl font-black text-gray-900">Entre em Contato</h2>
            <p class="text-gray-400 text-sm mt-1">Preencha os campos abaixo e retornaremos em breve.</p>
          </div>

          <!-- Assunto -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
              Tipo de contato <span class="text-[#f17b21]">*</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                v-for="subject in subjects"
                :key="subject.value"
                type="button"
                @click="form.subject = subject.value"
                class="flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200"
                :class="form.subject === subject.value
                  ? 'border-[#f17b21] bg-orange-50 shadow-sm'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'"
              >
                <div
                  class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200"
                  :class="form.subject === subject.value ? 'bg-[#f17b21]' : 'bg-gray-200'"
                >
                  <Icon :name="subject.icon" class="w-4 h-4"
                    :class="form.subject === subject.value ? 'text-white' : 'text-gray-500'" />
                </div>
                <div>
                  <span class="text-sm font-bold"
                    :class="form.subject === subject.value ? 'text-[#f17b21]' : 'text-gray-700'">
                    {{ subject.label }}
                  </span>
                  <p class="text-xs text-gray-400 mt-0.5 leading-relaxed">{{ subject.desc }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Dados pessoais -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Seus dados</label>
            <div class="flex flex-col gap-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Nome completo <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.name" type="text" placeholder="Seu nome" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Empresa</label>
                  <input v-model="form.company" type="text" placeholder="Nome da empresa"
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">E-mail <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.email" type="email" placeholder="seu@email.com" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Telefone / WhatsApp</label>
                  <input :value="form.phone" @input="formatPhone" type="tel" placeholder="(00) 00000-0000" maxlength="15"
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Mensagem</label>
            <div class="flex flex-col gap-3">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Título <span class="text-[#f17b21]">*</span></label>
                <input v-model="form.title" type="text" placeholder="Ex: Solicitar orçamento para inspeção" required
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
              </div>
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Mensagem <span class="text-[#f17b21]">*</span></label>
                <textarea v-model="form.message" rows="5" required placeholder="Descreva sua necessidade ou dúvida..."
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200 resize-none" />
              </div>
            </div>
          </div>

          <p v-if="error" class="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading || !form.subject"
            class="w-full flex items-center justify-center gap-2 bg-[#f17b21] text-white font-bold py-4 rounded-2xl hover:bg-[#d96a10] transition-all duration-300 shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group text-sm"
          >
            <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <Icon v-else name="lucide:send" class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
          </button>

          <p class="text-xs text-gray-400 text-center">
            Ao enviar, você concorda com nossa política de privacidade. Responderemos em até 24h úteis.
          </p>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Fale Conosco — Field Industrial' })
definePageMeta({ layout: false })

const success = ref(false)
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '', email: '', phone: '', company: '', subject: '', title: '', message: ''
})

const sideItems = [
  { icon: 'lucide:clock', label: 'Resposta em até 24h', desc: 'Nossa equipe responde rapidamente' },
  { icon: 'lucide:mail', label: 'contato@fieldindustrial.com.br', desc: 'Fale diretamente por e-mail' },
  { icon: 'lucide:shield-check', label: 'Equipe certificada', desc: 'CREA, NR-13, ASME e mais' },
  { icon: 'lucide:lock', label: 'Dados protegidos', desc: 'Suas informações são confidenciais' },
]

const subjects = [
  { value: 'Consultoria Técnica', label: 'Consultoria Técnica', icon: 'lucide:wrench', desc: 'Análise e orientação especializada' },
  { value: 'Orçamento', label: 'Solicitar Orçamento', icon: 'lucide:calculator', desc: 'Serviços, projetos e inspeções' },
  { value: 'Análise de Documentos', label: 'Análise de Documentos', icon: 'lucide:file-text', desc: 'Revisão e parecer técnico' },
  { value: 'Outros', label: 'Outros assuntos', icon: 'lucide:message-circle', desc: 'Dúvidas gerais e informações' },
]

function formatPhone(e) {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11)
  if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
  else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`
  else if (v.length > 0) v = `(${v}`
  form.value.phone = v
  e.target.value = v
}

function resetForm() {
  form.value = { name: '', email: '', phone: '', company: '', subject: '', title: '', message: '' }
}

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const body = {
      access_key: 'a55d5953-80dd-49bc-be3d-45b2463a0f41',
      subject: `[Field Industrial] ${form.value.subject} — ${form.value.title}`,
      from_name: form.value.name,
      replyto: form.value.email,
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone || 'Não informado',
      company: form.value.company || 'Não informado',
      assunto: form.value.subject,
      titulo: form.value.title,
      message: form.value.message,
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.success) {
      success.value = true
    } else {
      error.value = 'Erro ao enviar. Verifique os dados e tente novamente.'
    }
  } catch {
    error.value = 'Erro de conexão. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>