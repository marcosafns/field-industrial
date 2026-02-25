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
        <span class="text-[#f17b21] text-xs font-bold tracking-widest uppercase">Suporte Online</span>
        <h1 class="text-3xl xl:text-4xl font-black text-white mt-3 mb-6 leading-tight">
          Solicite seu atendimento técnico
        </h1>
        <p class="text-gray-400 text-sm leading-relaxed mb-10">
          Preencha o formulário e nossa equipe entrará em contato em até 24h para confirmar os detalhes.
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
          <h2 class="text-2xl font-black text-gray-900 mb-2">Solicitação enviada!</h2>
          <p class="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
            Entraremos em contato em breve para confirmar os detalhes. Obrigado pela confiança!
          </p>
          <button
            @click="success = false; resetForm()"
            class="flex items-center gap-2 text-sm text-[#f17b21] font-semibold hover:underline"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Nova solicitação
          </button>
        </div>

        <form v-else @submit.prevent="submit" class="flex flex-col gap-8">

          <div>
            <h2 class="text-2xl font-black text-gray-900">Agendar Reunião</h2>
            <p class="text-gray-400 text-sm mt-1">Preencha os campos abaixo para solicitar seu atendimento.</p>
          </div>

          <!-- Tipo de serviço -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
              Tipo de serviço <span class="text-[#f17b21]">*</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                v-for="service in services"
                :key="service.value"
                type="button"
                @click="form.service_type = service.value"
                class="flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200"
                :class="form.service_type === service.value
                  ? 'border-[#f17b21] bg-orange-50 shadow-sm'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'"
              >
                <div
                  class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200"
                  :class="form.service_type === service.value ? 'bg-[#f17b21]' : 'bg-gray-200'"
                >
                  <Icon :name="service.icon" class="w-4 h-4"
                    :class="form.service_type === service.value ? 'text-white' : 'text-gray-500'" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold"
                      :class="form.service_type === service.value ? 'text-[#f17b21]' : 'text-gray-700'">
                      {{ service.label }}
                    </span>
                    <span v-if="service.badge" class="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      {{ service.badge }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-400 mt-0.5 leading-relaxed">{{ service.description }}</p>
                </div>
              </button>
            </div>

            <div v-if="selectedService" class="mt-3 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
              <Icon name="lucide:clock" class="w-3.5 h-3.5 text-[#f17b21]" />
              <span class="text-xs text-gray-500">{{ selectedService.duration }}</span>
              <span class="text-gray-200 mx-1">|</span>
              <Icon name="lucide:video" class="w-3.5 h-3.5 text-gray-400" />
              <span class="text-xs text-gray-500">Via Google Meet ou Microsoft Teams</span>
            </div>
          </div>

          <!-- Dados pessoais -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Dados pessoais</label>
            <div class="flex flex-col gap-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Nome completo <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.name" type="text" placeholder="Seu nome completo" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Cargo <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.role" type="text" placeholder="Ex: Gerente de Manutenção" required
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
                  <label class="text-xs text-gray-500 mb-1 block">Telefone / WhatsApp <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.phone" type="tel" placeholder="(00) 00000-0000" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
              </div>
            </div>
          </div>

          <!-- Dados da empresa -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Dados da empresa</label>
            <div class="flex flex-col gap-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Empresa <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.company" type="text" placeholder="Nome da empresa" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">CNPJ</label>
                  <input v-model="form.cnpj" type="text" placeholder="00.000.000/0000-00"
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Cidade / Estado <span class="text-[#f17b21]">*</span></label>
                  <input v-model="form.city_state" type="text" placeholder="São Paulo / SP" required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Urgência <span class="text-[#f17b21]">*</span></label>
                  <div class="flex gap-2 h-[46px]">
                    <button
                      v-for="u in urgencies"
                      :key="u.value"
                      type="button"
                      @click="form.urgency = u.value"
                      class="flex-1 rounded-xl text-xs font-bold border transition-all duration-200"
                      :class="form.urgency === u.value ? u.activeClass : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'"
                    >{{ u.label }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sobre a demanda -->
          <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Sobre a demanda</label>
            <div class="flex flex-col gap-3">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Assunto <span class="text-[#f17b21]">*</span></label>
                <input v-model="form.subject" type="text" :placeholder="subjectPlaceholder" required
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
              </div>

              <div v-if="showEquipmentField">
                <label class="text-xs text-gray-500 mb-1 block">Tipo de equipamento</label>
                <input v-model="form.equipment_type" type="text"
                  placeholder="Ex: vaso de pressão, bomba, trocador de calor..."
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
              </div>

              <div>
                <label class="text-xs text-gray-500 mb-1 block">
                  {{ form.service_type === 'document_analysis' ? 'Objetivo da análise' : 'Descrição do problema / necessidade' }}
                  <span class="text-[#f17b21]">*</span>
                </label>
                <textarea v-model="form.message" rows="4" required :placeholder="messagePlaceholder"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200 resize-none" />
              </div>
            </div>
          </div>

          <!-- Upload -->
          <div v-if="showFileUpload">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
              Anexos
              <span class="text-gray-300 font-normal normal-case tracking-normal ml-1">PDF, DWG, JPG, PNG — máx. 10MB</span>
            </label>
            <div
              class="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#f17b21] transition-colors duration-200 cursor-pointer"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <Icon name="lucide:upload-cloud" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p class="text-sm text-gray-400">Arraste arquivos ou <span class="text-[#f17b21] font-semibold">clique para selecionar</span></p>
              <input ref="fileInput" type="file" multiple accept=".pdf,.dwg,.jpg,.jpeg,.png" class="hidden" @change="handleFiles" />
            </div>
            <div v-if="files.length > 0" class="mt-3 flex flex-col gap-2">
              <div v-for="(file, i) in files" :key="i"
                class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <Icon name="lucide:file" class="w-4 h-4 text-[#f17b21] flex-shrink-0" />
                <span class="text-xs text-gray-600 truncate flex-1">{{ file.name }}</span>
                <span class="text-xs text-gray-400">{{ (file.size / 1024 / 1024).toFixed(1) }}MB</span>
                <button type="button" @click="removeFile(i)" class="text-gray-300 hover:text-red-400 transition-colors">
                  <Icon name="lucide:x" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Data e horário -->
          <div v-if="form.service_type && form.service_type !== 'budget'">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Data e horário preferencial</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input v-model="form.preferred_date" type="date" :min="minDate"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200" />
              <select v-model="form.preferred_time"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#f17b21] focus:bg-white transition-all duration-200">
                <option value="">Selecione o horário</option>
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

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading || !form.service_type"
            class="w-full flex items-center justify-center gap-2 bg-[#f17b21] text-white font-bold py-4 rounded-2xl hover:bg-[#d96a10] transition-all duration-300 shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group text-sm"
          >
            <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <Icon v-else name="lucide:send" class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            {{ loading ? 'Enviando...' : 'Enviar Solicitação' }}
          </button>

          <p class="text-xs text-gray-400 text-center">
            Ao enviar, você concorda com nossa política de privacidade. Responderemos em até 24h.
          </p>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Agendar Reunião — Field Industrial' })
definePageMeta({ layout: false })

const route = useRoute()
const reagendarId = route.query.reagendar

const success = ref(false)
const loading = ref(false)
const error = ref('')
const files = ref([])
const fileInput = ref(null)

const form = ref({
  name: '', email: '', phone: '', company: '', cnpj: '',
  role: '', city_state: '', subject: '', message: '',
  service_type: '', urgency: 'low', preferred_date: '',
  preferred_time: '', equipment_type: '',
})

const sideItems = [
  { icon: 'lucide:clock', label: 'Resposta em até 24h', desc: 'Nossa equipe confirma rapidamente' },
  { icon: 'lucide:video', label: 'Via Meet ou Teams', desc: 'Atendimento remoto profissional' },
  { icon: 'lucide:shield-check', label: 'Equipe certificada', desc: 'CREA, NR-13, ASME e mais' },
  { icon: 'lucide:lock', label: 'Dados protegidos', desc: 'Suas informações são confidenciais' },
]

const services = [
  { value: 'meeting', label: 'Reunião Inicial', icon: 'lucide:video', badge: 'Grátis', description: 'Primeira conversa e entendimento da necessidade', duration: 'Até 30 minutos' },
  { value: 'consulting', label: 'Consultoria Técnica', icon: 'lucide:wrench', badge: null, description: 'Análise técnica detalhada e orientação especializada', duration: 'Mínimo 1 hora' },
  { value: 'remote_diagnosis', label: 'Diagnóstico Remoto', icon: 'lucide:monitor', badge: null, description: 'Auxílio técnico remoto via videochamada ao vivo', duration: 'Por hora' },
  { value: 'document_analysis', label: 'Análise de Documentos', icon: 'lucide:file-text', badge: null, description: 'Revisão e parecer técnico sobre documentos', duration: 'Sob consulta' },
  { value: 'budget', label: 'Solicitar Orçamento', icon: 'lucide:calculator', badge: null, description: 'Estudo técnico simplificado ou auditoria', duration: 'Sob consulta' },
]

const urgencies = [
  { value: 'low', label: 'Baixa', activeClass: 'bg-blue-50 border-blue-300 text-blue-700' },
  { value: 'medium', label: 'Média', activeClass: 'bg-yellow-50 border-yellow-300 text-yellow-700' },
  { value: 'high', label: 'Alta', activeClass: 'bg-red-50 border-red-300 text-red-700' },
]

const selectedService = computed(() => services.find(s => s.value === form.value.service_type))
const showEquipmentField = computed(() => ['meeting', 'consulting', 'remote_diagnosis'].includes(form.value.service_type))
const showFileUpload = computed(() => ['consulting', 'remote_diagnosis', 'document_analysis'].includes(form.value.service_type))

const subjectPlaceholder = computed(() => ({
  meeting: 'Ex: Inspeção de vasos de pressão',
  consulting: 'Ex: Análise de falha em bomba centrífuga',
  remote_diagnosis: 'Ex: Vibração excessiva em compressor',
  document_analysis: 'Ex: Revisão de memorial de cálculo',
  budget: 'Ex: Auditoria técnica de planta industrial',
}[form.value.service_type] || 'Descreva brevemente o assunto'))

const messagePlaceholder = computed(() => ({
  meeting: 'Descreva brevemente o problema ou necessidade...',
  consulting: 'Descreva a falha, histórico de manutenção e condições de operação...',
  remote_diagnosis: 'Descreva os sintomas observados, frequência e condições do equipamento...',
  document_analysis: 'Informe o objetivo da análise e o prazo desejado...',
  budget: 'Descreva o escopo do serviço desejado...',
}[form.value.service_type] || 'Descreva sua necessidade...'))

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

function handleFiles(e) { files.value = [...files.value, ...Array.from(e.target.files)] }
function handleDrop(e) { files.value = [...files.value, ...Array.from(e.dataTransfer.files)] }
function removeFile(i) { files.value.splice(i, 1) }

function resetForm() {
  form.value = {
    name: '', email: '', phone: '', company: '', cnpj: '',
    role: '', city_state: '', subject: '', message: '',
    service_type: '', urgency: 'low', preferred_date: '',
    preferred_time: '', equipment_type: '',
  }
  files.value = []
}

onMounted(async () => {
  if (reagendarId) {
    try {
      const data = await $fetch(`/api/meetings/public/${reagendarId}`)
      form.value.name = data.name
      form.value.email = data.email
      form.value.phone = data.phone ?? ''
      form.value.company = data.company ?? ''
      form.value.subject = data.subject ?? ''
      form.value.message = data.message ?? ''
      form.value.service_type = data.service_type ?? ''
      form.value.cnpj = data.cnpj ?? ''
      form.value.role = data.role ?? ''
      form.value.city_state = data.city_state ?? ''
      form.value.urgency = data.urgency ?? 'low'
    } catch {}
  }
})

async function submit() {
  loading.value = true
  error.value = ''
  try {
    if (reagendarId) {
      await $fetch(`/api/meetings/reschedule/${reagendarId}`, { method: 'PATCH', body: { ...form.value } })
    } else {
      await $fetch('/api/meetings', { method: 'POST', body: { ...form.value } })
    }
    success.value = true
  } catch {
    error.value = 'Erro ao enviar. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>