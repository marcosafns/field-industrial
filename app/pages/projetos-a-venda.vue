<template>
  <div class="pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-28 px-4 overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Portfólio</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">Projetos à Venda</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Projetos desenvolvidos pela nossa equipe, prontos para aquisição e implementação.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="py-16 px-4 bg-white border-b border-gray-100">
      <div class="max-w-4xl mx-auto text-center">
        <p class="scroll-reveal text-gray-600 text-lg leading-relaxed">
          Nossos projetos à venda são desenvolvidos com toda a documentação técnica necessária, incluindo memorial de cálculo, desenhos detalhados e especificações de fabricação. Cada projeto segue rigorosamente as normas ASME, ABNT e requisitos regulatórios aplicáveis.
        </p>
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
          :class="activeCategory === cat ? 'bg-[#f17b21] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >{{ cat }}</button>
      </div>
    </section>

    <!-- Projetos -->
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
              <div class="absolute top-3 left-3">
                <span class="bg-[#f17b21] text-white text-xs font-bold px-2.5 py-1 rounded-full">{{ project.category }}</span>
              </div>
              <div class="absolute bottom-3 right-3">
                <span class="bg-white/90 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full">{{ project.norm }}</span>
              </div>
            </div>

            <!-- Conteúdo -->
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-sm font-black text-gray-900 mb-2 group-hover:text-[#f17b21] transition-colors duration-200 leading-snug line-clamp-2">
                {{ project.title }}
              </h3>
              <p class="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{{ project.desc }}</p>

              <div class="flex flex-wrap gap-1.5 mt-auto mb-4">
                <span
                  v-for="tag in project.tags.slice(0, 3)"
                  :key="tag"
                  class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full"
                >{{ tag }}</span>
                <span v-if="project.tags.length > 3" class="text-xs text-gray-400">+{{ project.tags.length - 3 }}</span>
              </div>

              <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
                <p class="text-xs text-gray-400">Valor sob consulta</p>
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

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center px-4">
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
              <span class="bg-white/90 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">{{ selected.norm }}</span>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-8">
            <h2 class="text-xl font-black text-gray-900 mb-3">{{ selected.title }}</h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">{{ selected.desc }}</p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in selected.tags"
                :key="tag"
                class="bg-orange-50 text-[#f17b21] text-xs font-semibold px-3 py-1 rounded-full"
              >{{ tag }}</span>
            </div>

            <div class="bg-gray-50 rounded-2xl p-5 mb-6">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">O que está incluído</p>
              <div class="flex flex-col gap-2">
                <div v-for="item in ['Memorial de cálculo completo', 'Desenhos técnicos 2D/3D', 'Especificações de fabricação', 'Documentação normativa', 'Suporte técnico pós-venda']" :key="item"
                  class="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="lucide:check" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  {{ item }}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-gray-400">Valor sob consulta — entre em contato para orçamento</p>
            </div>

            <NuxtLink
              to="/agendar-reuniao"
              class="w-full flex items-center justify-center gap-2 bg-[#f17b21] text-white font-bold py-3.5 rounded-xl hover:bg-[#d96a10] transition-colors duration-200"
            >
              <Icon name="lucide:mail" class="w-4 h-4" />
              Consultar este projeto
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- CTA -->
    <section class="py-20 px-4 bg-white border-t border-gray-100">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-3xl font-black text-gray-900 mb-4">Não encontrou o que procura?</h2>
        <p class="scroll-reveal scroll-reveal-delay-1 text-gray-500 mb-8">Desenvolvemos projetos customizados conforme sua necessidade.</p>
        <NuxtLink
          to="/agendar-reuniao"
          class="scroll-reveal scroll-reveal-delay-2 inline-flex items-center gap-2 bg-[#f17b21] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d96a10] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Solicitar Projeto Customizado
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Projetos à Venda — Field Industrial' })

const activeCategory = ref('Todos')
const selected = ref(null)

const categories = ['Todos', 'Vasos de Pressão', 'Caldeiras', 'Estruturas Metálicas', 'Tubulações']

const projects = [
  {
    title: 'Vaso de Pressão Horizontal — 10m³',
    category: 'Vasos de Pressão',
    image: '/img/proj1.jpeg',
    norm: 'ASME VIII',
    desc: 'Projeto completo de vaso de pressão horizontal com memorial de cálculo, desenhos detalhados e especificações de fabricação.',
    tags: ['ASME VIII', 'Memorial de Cálculo', 'Desenhos 2D/3D'],
  },
  {
    title: 'Vaso de Pressão Vertical — 5m³',
    category: 'Vasos de Pressão',
    image: '/img/proj2.jpeg',
    norm: 'ASME VIII',
    desc: 'Projeto de vaso vertical para armazenamento de fluidos sob pressão, com análise estrutural completa.',
    tags: ['ASME VIII', 'NR-13', 'Análise Estrutural'],
  },
  {
    title: 'Caldeira de Vapor — 500kg/h',
    category: 'Caldeiras',
    image: '/img/proj3.jpeg',
    norm: 'NR-13',
    desc: 'Projeto de caldeira flamotubular para geração de vapor saturado, documentação técnica completa conforme NR-13.',
    tags: ['NR-13', 'Flamotubular', 'Vapor Saturado'],
  },
  {
    title: 'Estrutura Metálica Industrial',
    category: 'Estruturas Metálicas',
    image: '/img/proj4.jpeg',
    norm: 'ABNT NBR',
    desc: 'Projeto estrutural metálico para galpão industrial com perfis laminados e dimensionamento completo.',
    tags: ['ABNT NBR 8681', 'Perfis Laminados', 'Galpão'],
  },
  {
    title: 'Sistema de Tubulação de Processo',
    category: 'Tubulações',
    image: '/img/proj5.jpeg',
    norm: 'ASME B31.3',
    desc: 'Projeto de tubulação de processo para linha de vapor e condensado, isométricos e suportação.',
    tags: ['ASME B31.3', 'Isométricos', 'Suportação'],
  },
  {
    title: 'Trocador de Calor Casco-Tubo',
    category: 'Vasos de Pressão',
    image: '/img/proj6.jpeg',
    norm: 'TEMA',
    desc: 'Projeto completo de trocador de calor tipo casco-tubo com cálculo térmico e mecânico conforme TEMA.',
    tags: ['TEMA', 'Cálculo Térmico', 'ASME VIII'],
  },
  {
    title: 'Caldeira Industrial — 1000kg/h',
    category: 'Caldeiras',
    image: '/img/proj7.jpeg',
    norm: 'NR-13',
    desc: 'Projeto de caldeira aquatubular de alta capacidade para processo industrial, com documentação técnica completa.',
    tags: ['NR-13', 'Aquatubular', 'Alta Capacidade'],
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