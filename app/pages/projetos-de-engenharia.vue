<template>
  <div class="pt-16 sm:pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-16 sm:py-24 md:py-28 px-4 overflow-hidden">
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Catálogo</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-3xl sm:text-4xl md:text-6xl font-black text-white mt-3 mb-4 sm:mb-6 leading-tight">Documentos a Venda</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Modelos e templates de engenharia prontos para uso, seguindo as principais normas industriais.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-10 sm:py-16 px-4 bg-white border-b border-gray-100">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
        <div v-for="(stat, i) in stats" :key="stat.label" class="scroll-reveal" :class="`scroll-reveal-delay-${i + 1}`">
          <p class="text-2xl sm:text-4xl font-black text-[#f17b21]">{{ stat.value }}</p>
          <p class="text-gray-500 text-xs sm:text-sm mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Filtros -->
    <section class="py-4 sm:py-6 px-4 bg-white sticky top-16 sm:top-20 z-10 border-b border-gray-100 shadow-sm">
      <div class="max-w-6xl mx-auto flex gap-2 sm:gap-3 overflow-x-auto pb-1 justify-start sm:justify-center" style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200"
          :class="activeCategory === cat ? 'bg-[#f17b21] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >{{ cat }}</button>
      </div>
    </section>

    <!-- Projetos em grid -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <TransitionGroup name="project-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in filteredProjects"
            :key="project.title"
            class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group cursor-pointer flex flex-col"
            @click="selected = project"
          >
            <!-- Imagem -->
            <div class="h-44 overflow-hidden relative flex-shrink-0">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="bg-[#f17b21] text-white text-xs font-bold px-2.5 py-1 rounded-full">{{ project.category }}</span>
              </div>
              <div class="absolute bottom-3 right-3">
                <span class="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Icon name="lucide:check-circle" class="w-3 h-3" />
                  {{ project.status }}
                </span>
              </div>
            </div>

            <!-- Conteúdo -->
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-sm font-black text-gray-900 mb-2 group-hover:text-[#f17b21] transition-colors duration-200 leading-snug line-clamp-2">
                {{ project.title }}
              </h3>
              <p class="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{{ project.desc }}</p>

              <!-- Details compactos -->
              <div class="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                <div v-for="detail in project.details" :key="detail.label" class="flex items-center gap-1">
                  <span class="text-xs text-gray-400">{{ detail.label }}:</span>
                  <span class="text-xs font-semibold text-gray-700">{{ detail.value }}</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mt-auto">
                <span
                  v-for="tag in project.tags.slice(0, 3)"
                  :key="tag"
                  class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full"
                >{{ tag }}</span>
                <span v-if="project.tags.length > 3" class="text-xs text-gray-400">+{{ project.tags.length - 3 }}</span>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span class="text-xs text-[#f17b21] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Ver detalhes
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Vazio -->
        <div v-if="filteredProjects.length === 0" class="text-center py-20">
          <Icon name="lucide:inbox" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-400">Nenhum projeto nesta categoria.</p>
        </div>
      </div>
    </section>

    <!-- Modal de detalhes -->
    <Transition name="modal">
      <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center px-4" @click.self="selected = null">
        <div class="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" @click="selected = null" />
        <div class="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">

          <!-- Imagem -->
          <div class="h-56 overflow-hidden relative">
            <img :src="selected.image" :alt="selected.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
            <button
              @click="selected = null"
              class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
            <div class="absolute bottom-4 left-6 flex gap-2">
              <span class="bg-[#f17b21] text-white text-xs font-bold px-3 py-1 rounded-full">{{ selected.category }}</span>
              <span class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="lucide:check-circle" class="w-3 h-3" />
                {{ selected.status }}
              </span>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5 sm:p-8">
            <h2 class="text-lg sm:text-xl font-black text-gray-900 mb-3">{{ selected.title }}</h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">{{ selected.desc }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div v-for="detail in selected.details" :key="detail.label" class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-xs text-gray-400 mb-1">{{ detail.label }}</p>
                <p class="text-sm font-black text-gray-900">{{ detail.value }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selected.tags"
                :key="tag"
                class="bg-orange-50 text-[#f17b21] text-xs font-semibold px-3 py-1 rounded-full"
              >{{ tag }}</span>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
              <NuxtLink
                to="/agendar-reuniao"
                class="w-full flex items-center justify-center gap-2 bg-[#f17b21] text-white font-bold py-3.5 rounded-xl hover:bg-[#d96a10] transition-colors duration-200"
              >
                <Icon name="lucide:calendar" class="w-4 h-4" />
                Falar com Especialista
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- CTA -->
    <section class="py-12 sm:py-20 px-4 bg-gray-950">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-2xl sm:text-3xl font-black text-white mb-4">Quer desenvolver um projeto?</h2>
        <p class="scroll-reveal scroll-reveal-delay-1 text-gray-400 mb-8">Nossa equipe está pronta para transformar sua necessidade em solução técnica.</p>
        <NuxtLink
          to="/agendar-reuniao"
          class="scroll-reveal scroll-reveal-delay-2 inline-flex items-center gap-2 bg-[#f17b21] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d96a10] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Falar com Especialista
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Documentos a Venda — Field Industrial' })

const activeCategory = ref('Todos')
const selected = ref(null)

const categories = ['Todos', 'Modelos de Laudo', 'Relatórios', 'Planejamento', 'Técnicos']

const stats = [
  { value: '200+', label: 'Projetos concluídos' },
  { value: '50+', label: 'Clientes atendidos' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '100%', label: 'Conformidade normativa' },
]

const projects = [
  { title: 'Modelo de laudo de integridade mecânica', category: 'Modelos de Laudo', image: '/img/docs/integrity_report.png', status: 'Template', desc: 'Template profissional pronto para uso em avaliações técnicas de integridade de ativos.', details: [{ label: 'Formato', value: 'DOCX/PDF' }, { label: 'Páginas', value: '15+' }, { label: 'Norma', value: 'NR-13/ASME' }], tags: ['Laudo', 'Integridade', 'Mecânica'] },
  { title: 'Modelo de relatório de inspeção técnica industrial', category: 'Relatórios', image: '/img/proj1.jpeg', status: 'Template', desc: 'Estrutura completa para relatórios de campo com campos para fotos e pareceres.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Aplicação', value: 'Campo' }, { label: 'Setor', value: 'Industrial' }], tags: ['Inspeção', 'Relatório', 'Técnico'] },
  { title: 'Modelo de parecer técnico mecânico', category: 'Técnicos', image: '/img/docs/technical_opinion.jpg', status: 'Template', desc: 'Documento focado em análise técnica para embasamento de tomadas de decisão.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Foco', value: 'Decisão' }], tags: ['Parecer', 'Engenharia'] },
  { title: 'Modelo de memorial de cálculo estrutural', category: 'Técnicos', image: '/img/docs/calculation_structural.png', status: 'Template', desc: 'Planilha e documento base para dimensionamento de estruturas metálicas.', details: [{ label: 'Formato', value: 'XLSX/DOCX' }, { label: 'Norma', value: 'NBR 8800' }], tags: ['Cálculo', 'Memória', 'Estrutural'] },
  { title: 'Modelo de relatório de análise de falha', category: 'Relatórios', image: '/img/stress_analysis.png', status: 'Template', desc: 'Estrutura para investigação de causas raiz e recomendações após falhas.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Metodologia', value: 'RCA' }], tags: ['Falha', 'Manutenção', 'Análise'] },
  { title: 'Modelo de relatório de inspeção NR-13', category: 'Modelos de Laudo', image: '/img/proj6.jpeg', status: 'Template', desc: 'Checklist e relatório completo para conformidade com a NR-13.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Norma', value: 'NR-13' }], tags: ['NR-13', 'Vasos', 'Caldeiras'] },
  { title: 'Modelo de relatório de inspeção de tubulação', category: 'Relatórios', image: '/img/piping_system.png', status: 'Template', desc: 'Documentação específica para monitoramento de linhas de tubulação industrial.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Norma', value: 'API/ASME' }], tags: ['Tubulação', 'API', 'Garantia'] },
  { title: 'Modelo de relatório de adequação normativa', category: 'Técnicos', image: '/img/documentation_templates.png', status: 'Template', desc: 'Relatório para levantamento de pendências e plano de ação corretivo.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Foco', value: 'Compliance' }], tags: ['Adequação', 'Normas', 'Compliance'] },
  { title: 'Modelo de relatório de avaliação de risco mecânico', category: 'Técnicos', image: '/img/docs/hazard_assessment.jpg', status: 'Template', desc: 'Análise de riscos mecânicos em máquinas e processos produtivos.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Setor', value: 'Segurança' }], tags: ['Risco', 'Segurança', 'Mecânica'] },
  { title: 'Modelo de especificação técnica de equipamento', category: 'Técnicos', image: '/img/proj2.jpeg', status: 'Template', desc: 'Documento para compra e contratação de equipamentos industriais.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Foco', value: 'Suprimentos' }], tags: ['ET', 'Compra', 'Equipamento'] },
  { title: 'Modelo de data book de fabricação/montagem', category: 'Relatórios', image: '/img/proj4.jpeg', status: 'Template', desc: 'Índice e estrutura para compilação de documentos de fabricação.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Controle', value: 'Qualidade' }], tags: ['Data Book', 'Qualidade', 'Solda'] },
  { title: 'Modelo de relatório as built', category: 'Relatórios', image: '/img/blueprint_technical.png', status: 'Template', desc: 'Relatório de conformidade entre projeto e obra executada.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Fase', value: 'Pós-Obra' }], tags: ['As Built', 'Obra', 'Projeto'] },
  { title: 'Modelo de relatório de inspeção de soldagem', category: 'Relatórios', image: '/img/proj7.jpeg', status: 'Template', desc: 'Registro de inspeção visual e acompanhamento de juntas soldadas.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Norma', value: 'AWS/ASME' }], tags: ['Soldagem', 'Inspeção', 'Joints'] },
  { title: 'Modelo de plano de manutenção mecânica', category: 'Planejamento', image: '/img/proj3.jpeg', status: 'Template', desc: 'Cronograma e lista de atividades para manutenção preventiva.', details: [{ label: 'Formato', value: 'XLSX' }, { label: 'Tipo', value: 'Preventiva' }], tags: ['Manutenção', 'PCM', 'Gás'] },
  { title: 'Modelo de escopo técnico para parada geral', category: 'Planejamento', image: '/img/hero-industrial.jpg', status: 'Template', desc: 'Definição de escopo para contratação de serviços em paradas gerais.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Evento', value: 'Parada' }], tags: ['Parada', 'Escopo', 'Contratos'] },
  { title: 'Modelo de lista técnica de materiais (BOM)', category: 'Planejamento', image: '/img/docs/industrial_office.jpg', status: 'Template', desc: 'Estrutura para levantamento e controle de materiais em projetos.', details: [{ label: 'Formato', value: 'XLSX' }, { label: 'Foco', value: 'Materiais' }], tags: ['BOM', 'Lista', 'Suprimentos'] },
  { title: 'Modelo de procedimento de montagem/manutenção', category: 'Planejamento', image: '/img/quem-somos.jpg', status: 'Template', desc: 'Instruções passo a passo para montagem e manutenção segura.', details: [{ label: 'Formato', value: 'DOCX' }, { label: 'Setor', value: 'Operação' }], tags: ['Procedimento', 'Montagem', 'Safe'] },
]

const filteredProjects = computed(() =>
  activeCategory.value === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeCategory.value)
)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in')
        observer.unobserve(e.target)
      }
    }),
    { threshold: 0.15 }
  )
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
.scroll-reveal-delay-1 { transition-delay: 0.1s; }
.scroll-reveal-delay-2 { transition-delay: 0.2s; }
.scroll-reveal-delay-3 { transition-delay: 0.3s; }
.scroll-reveal-delay-4 { transition-delay: 0.4s; }
.scroll-reveal-delay-5 { transition-delay: 0.5s; }

.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.25s ease;
}
.project-list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.project-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>