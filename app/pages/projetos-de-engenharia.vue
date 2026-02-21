<template>
  <div class="pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-28 px-4 overflow-hidden">
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Cases</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">Projetos de Engenharia</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Conheça os projetos desenvolvidos e executados pela nossa equipe técnica.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 px-4 bg-white border-b border-gray-100">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="scroll-reveal"
          :class="`scroll-reveal-delay-${i + 1}`"
        >
          <p class="text-4xl font-black text-[#f17b21]">{{ stat.value }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Filtros -->
    <section class="py-6 px-4 bg-white sticky top-20 z-10 border-b border-gray-100 shadow-sm">
      <div class="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeCategory === cat
            ? 'bg-[#f17b21] text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >{{ cat }}</button>
      </div>
    </section>

    <!-- Projetos -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto space-y-8">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.title"
          class="scroll-reveal bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
          :class="`scroll-reveal-delay-${Math.min(i + 1, 5)}`"
        >
          <div class="grid grid-cols-1 lg:grid-cols-3">

            <!-- Imagem -->
            <div class="h-56 lg:h-auto overflow-hidden relative">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-950 via-transparent to-transparent opacity-50" />
            </div>

            <!-- Conteúdo -->
            <div class="lg:col-span-2 p-8">
              <div class="flex flex-wrap items-start gap-3 mb-4">
                <span class="bg-orange-100 text-[#f17b21] text-xs font-bold px-3 py-1 rounded-full">{{ project.category }}</span>
                <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Icon name="lucide:check-circle" class="w-3 h-3" />
                  {{ project.status }}
                </span>
              </div>

              <h3 class="text-xl font-black text-gray-900 mb-2 group-hover:text-[#f17b21] transition-colors duration-200">{{ project.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed mb-5">{{ project.desc }}</p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <div v-for="detail in project.details" :key="detail.label">
                  <p class="text-xs text-gray-400">{{ detail.label }}</p>
                  <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ detail.value }}</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full"
                >{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Vazio -->
        <div v-if="filteredProjects.length === 0" class="text-center py-20">
          <Icon name="lucide:inbox" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-400">Nenhum projeto nesta categoria.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-gray-950">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-3xl font-black text-white mb-4">Quer desenvolver um projeto?</h2>
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
useSeoMeta({ title: 'Projetos de Engenharia — Field Industrial' })

const activeCategory = ref('Todos')

const categories = ['Todos', 'Inspeção', 'Projetos Mecânicos', 'Paradas de Manutenção', 'Laudos Técnicos']

const stats = [
  { value: '200+', label: 'Projetos concluídos' },
  { value: '50+', label: 'Clientes atendidos' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '100%', label: 'Conformidade normativa' },
]

const projects = [
  {
    image: '/img/proj1.jpeg',
    title: 'Inspeção de Vasos de Pressão — Petroquímica',
    category: 'Inspeção',
    status: 'Concluído',
    desc: 'Inspeção completa de 12 vasos de pressão em planta petroquímica, incluindo ensaios não destrutivos, avaliação de integridade e emissão de laudos conforme NR-13.',
    details: [
      { label: 'Duração', value: '45 dias' },
      { label: 'Equipamentos', value: '12 vasos' },
      { label: 'Norma', value: 'NR-13 / ASME' },
    ],
    tags: ['NR-13', 'END', 'Laudo Técnico', 'Petroquímica'],
  },
  {
    image: '/img/proj2.jpeg',
    title: 'Supervisão de Montagem — Planta Industrial',
    category: 'Inspeção',
    status: 'Concluído',
    desc: 'Supervisão técnica de montagem mecânica e soldagem de estruturas e equipamentos em nova planta industrial, garantindo conformidade com projetos e normas aplicáveis.',
    details: [
      { label: 'Duração', value: '90 dias' },
      { label: 'Equipe', value: '8 profissionais' },
      { label: 'Norma', value: 'AWS / ASME' },
    ],
    tags: ['Soldagem', 'Montagem Mecânica', 'AWS D1.1'],
  },
  {
    image: '/img/proj3.jpeg',
    title: 'Desenvolvimento de Vaso de Pressão Vertical',
    category: 'Projetos Mecânicos',
    status: 'Concluído',
    desc: 'Projeto mecânico completo de vaso de pressão vertical para refinaria, incluindo memorial de cálculo ASME VIII, desenhos de fabricação e documentação técnica.',
    details: [
      { label: 'Volume', value: '25m³' },
      { label: 'Pressão', value: '16 kgf/cm²' },
      { label: 'Norma', value: 'ASME VIII Div.1' },
    ],
    tags: ['ASME VIII', 'Memorial de Cálculo', 'Refinaria'],
  },
  {
    image: '/img/proj4.jpeg',
    title: 'Gestão de Parada de Manutenção — Indústria Química',
    category: 'Paradas de Manutenção',
    status: 'Concluído',
    desc: 'Planejamento e gestão completa de parada de manutenção anual em planta química, coordenando mais de 60 profissionais e 200 ordens de serviço.',
    details: [
      { label: 'Duração', value: '21 dias' },
      { label: 'Equipe', value: '60+ profissionais' },
      { label: 'OS executadas', value: '200+' },
    ],
    tags: ['Parada', 'Manutenção', 'Indústria Química'],
  },
  {
    image: '/img/proj5.jpeg',
    title: 'Laudos de Integridade — Parque de Tanques',
    category: 'Laudos Técnicos',
    status: 'Concluído',
    desc: 'Avaliação técnica e emissão de laudos de integridade mecânica para parque de tanques de armazenamento, incluindo inspeção interna, externa e análise de vida remanescente.',
    details: [
      { label: 'Tanques', value: '8 unidades' },
      { label: 'Norma', value: 'API 653' },
      { label: 'Relatórios', value: '8 laudos' },
    ],
    tags: ['API 653', 'Tanques', 'Laudo Técnico'],
  },
  {
    image: '/img/proj6.jpeg',
    title: 'Projeto de Tubulação Industrial',
    category: 'Projetos Mecânicos',
    status: 'Concluído',
    desc: 'Desenvolvimento de projeto de tubulação de processo para planta industrial, com isométricos, suportação e documentação técnica conforme ASME B31.3.',
    details: [
      { label: 'Extensão', value: '1.200m' },
      { label: 'Norma', value: 'ASME B31.3' },
      { label: 'Isométricos', value: '48 folhas' },
    ],
    tags: ['ASME B31.3', 'Tubulação', 'Isométricos'],
  },
  {
    image: '/img/proj7.jpeg',
    title: 'Auditoria de Parada — Refinaria',
    category: 'Paradas de Manutenção',
    status: 'Concluído',
    desc: 'Auditoria técnica completa de parada de manutenção em refinaria, com avaliação de escopo, segurança, qualidade e conformidade regulatória.',
    details: [
      { label: 'Duração', value: '30 dias' },
      { label: 'Equipamentos', value: '35 itens' },
      { label: 'Relatórios', value: '12 docs' },
    ],
    tags: ['Auditoria', 'Refinaria', 'NR-13'],
  },
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
</style>