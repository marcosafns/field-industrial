<template>
  <section class="relative w-full h-screen overflow-hidden">

    <!-- Imagem de fundo -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
      :class="loaded ? 'scale-100' : 'scale-105'"
      style="background-image: url('/img/hero-industrial.jpg');"
    />

    <!-- Overlay escuro gradiente -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

    <!-- Partículas -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />

    <!-- Conteúdo -->
    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 w-full">

        <!-- Tag superior -->
        <div
          class="inline-flex items-center gap-2 bg-[#f17b21]/20 border border-[#f17b21]/40 rounded-full px-4 py-1.5 mb-4 sm:mb-6 transition-all duration-700 delay-100"
          :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <span class="w-2 h-2 rounded-full bg-[#f17b21] animate-pulse" />
          <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Engenharia Industrial</span>
        </div>

        <!-- Título -->
        <h1
          class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mb-4 sm:mb-6 transition-all duration-700 delay-200"
          :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          Engenharia Mecânica,
          <span class="text-[#f17b21]">Inspeção</span>,
          Fabricação e
          <span class="text-[#f17b21]">Integridade Industrial</span>
        </h1>

        <!-- Subtítulo -->
        <p
          class="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mb-8 sm:mb-10 leading-relaxed transition-all duration-700 delay-300"
          :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          Atuação técnica em estudo, desenvolvimento, validação e execução de soluções industriais
          conforme normas regulamentadoras nacionais, internacionais e códigos aplicáveis.
        </p>

        <!-- Botões -->
        <div
          class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-500"
          :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <NuxtLink to="#servicos" class="text-center bg-[#f17b21] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#d96a10] transition-all duration-300 shadow-lg hover:-translate-y-0.5">Serviços</NuxtLink>
          <NuxtLink to="#projetos-engenharia" class="text-center bg-white/10 backdrop-blur-sm text-white font-semibold px-7 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">Projetos Técnicos</NuxtLink>
          <NuxtLink to="#agendar-reuniao" class="text-center bg-transparent text-[#f17b21] font-semibold px-7 py-3 rounded-full border border-[#f17b21] hover:bg-[#f17b21] hover:text-white transition-all duration-300 hover:-translate-y-0.5">Agendar Reunião</NuxtLink>
        </div>

        <!-- Indicador de scroll -->
        <div
          class="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700"
          :class="loaded ? 'opacity-100' : 'opacity-0'"
        >
          <span class="text-gray-400 text-xs tracking-widest uppercase">Role para baixo</span>
          <div class="w-px h-8 sm:h-10 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
        </div>

      </div>
    </div>

  </section>

  <!-- ===== NÚMEROS / CREDENCIAIS ===== -->
  <section id="stats-section" class="bg-white py-16 sm:py-20 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-10 sm:mb-14 reveal reveal-up">
        <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Nossa Trajetória</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">Números que falam por nós</h2>
        <div class="w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div
          v-for="(item, i) in stats"
          :key="item.label"
          class="relative group bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden reveal reveal-up"
          :style="{ transitionDelay: `${i * 150}ms` }"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-[#f17b21] rounded-l-2xl" />
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-[#f17b21]/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f17b21]/10 mb-4">
            <Icon :name="item.icon" class="w-7 h-7 text-[#f17b21]" />
          </div>
          <div class="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            <span>{{ item.current }}</span>
            <span class="text-[#f17b21]">{{ item.suffix }}</span>
          </div>
          <p class="text-gray-500 text-sm font-medium tracking-wide uppercase">{{ item.label }}</p>
        </div>
      </div>

    </div>
  </section>

  <!-- ===== SERVIÇOS ===== -->
  <section id="servicos" class="bg-white py-16 sm:py-24 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-10 sm:mb-16 reveal reveal-up">
        <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">O que fazemos</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">O que oferecemos?</h2>
        <div class="w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-default reveal reveal-up"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-[#f17b21]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="absolute top-0 left-0 right-0 h-1 bg-[#f17b21] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
          <div class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f17b21]/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[#f17b21] transition-colors duration-500">
            <Icon :name="service.icon" class="w-7 h-7 sm:w-8 sm:h-8 text-[#f17b21] group-hover:text-white transition-colors duration-500" />
          </div>
          <h3 class="relative text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-[#f17b21] transition-colors duration-300">{{ service.title }}</h3>
          <p class="relative text-sm text-gray-500 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>

    </div>
  </section>

  <!-- ===== QUEM SOMOS ===== -->
  <section id="quem-somos" class="bg-white py-16 sm:py-24 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

      <div class="relative reveal reveal-left">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/img/quem-somos.jpg"
            alt="Equipe Field Industrial"
            class="w-full h-64 sm:h-96 lg:h-[500px] object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div class="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#f17b21] text-white rounded-2xl px-4 py-3 sm:px-6 sm:py-5 shadow-xl">
          <p class="text-2xl sm:text-3xl font-bold">4+</p>
          <p class="text-xs sm:text-sm font-medium opacity-90">Anos de experiência</p>
        </div>
        <div class="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#f17b21]/30 rounded-2xl -z-10" />
      </div>

      <div class="flex flex-col space-y-6 sm:space-y-8 reveal reveal-right">
        <div>
          <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Sobre nós</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">Quem somos?</h2>
          <div class="w-12 h-1 bg-[#f17b21] mt-4 rounded-full" />
        </div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Somos uma empresa especializada em engenharia mecânica industrial, com atuação técnica em inspeção, fabricação e integridade de equipamentos. Nossa trajetória é marcada pelo compromisso com a excelência técnica e pela conformidade com as mais rigorosas normas nacionais e internacionais.
        </p>
        <div class="grid grid-cols-1 gap-3">
          <div v-for="item in diferenciais" :key="item.text" class="flex items-center gap-3">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#f17b21]/10 flex items-center justify-center">
              <Icon :name="item.icon" class="w-4 h-4 text-[#f17b21]" />
            </div>
            <span class="text-gray-700 text-sm font-medium">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== VALORES ===== -->
  <section id="valores" class="bg-white py-16 sm:py-24 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">

      <div class="text-center mb-10 sm:mb-16 reveal reveal-up">
        <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Nossos Valores</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">O que nos guia?</h2>
        <div class="w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
      </div>

      <div class="relative">
        <!-- Linha central só no desktop -->
        <div class="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#f17b21]/30" />

        <div class="flex flex-col gap-6 sm:gap-12">
          <div
            v-for="(item, index) in valores"
            :key="item.title"
            class="reveal"
            :class="index % 2 === 0 ? 'reveal-left' : 'reveal-right'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Mobile: card simples -->
            <div class="lg:hidden group bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-[#f17b21]/40 hover:shadow-lg transition-all duration-500">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#f17b21]/10 flex items-center justify-center group-hover:bg-[#f17b21] transition-colors duration-300">
                  <Icon :name="item.icon" class="w-5 h-5 text-[#f17b21] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 class="text-gray-900 font-bold text-lg">{{ item.title }}</h3>
              </div>
              <p class="text-gray-500 text-sm leading-relaxed">{{ item.description }}</p>
            </div>

            <!-- Desktop: timeline -->
            <div
              class="hidden lg:flex relative items-center gap-8"
              :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'"
            >
              <div class="w-5/12 group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-[#f17b21]/40 hover:shadow-lg transition-all duration-500">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-[#f17b21]/10 flex items-center justify-center group-hover:bg-[#f17b21] transition-colors duration-300">
                    <Icon :name="item.icon" class="w-5 h-5 text-[#f17b21] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 class="text-gray-900 font-bold text-lg">{{ item.title }}</h3>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#f17b21] shadow-[0_0_12px_rgba(241,123,33,0.4)]" />
              <div class="w-5/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== PROJETOS ===== -->
  <section id="projetos" class="bg-white py-16 sm:py-24 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-8 sm:mb-12 reveal reveal-up">
        <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Portfólio</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">Nossos Projetos</h2>
        <div class="w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
      </div>

      <div class="flex justify-center mb-8 sm:mb-10 reveal reveal-up" style="transition-delay: 150ms">
        <div class="inline-flex bg-gray-100 rounded-full p-1 gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key; currentIndex = 0"
            class="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
            :class="activeTab === tab.key ? 'bg-[#f17b21] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'"
          >{{ tab.label }}</button>
        </div>
      </div>

      <!-- Mobile: cards empilhados -->
      <div class="sm:hidden space-y-5 reveal reveal-up" style="transition-delay: 250ms">
        <div
          v-for="project in activeProjects"
          :key="project.title"
          class="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
        >
          <div class="relative h-44 overflow-hidden">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span class="absolute top-3 left-3 bg-[#f17b21] text-white text-xs font-semibold px-3 py-1 rounded-full">{{ project.tag }}</span>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-gray-900 text-base mb-2">{{ project.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-3">{{ project.description }}</p>
            <NuxtLink :to="project.link" class="inline-flex items-center gap-2 text-[#f17b21] text-sm font-semibold">
              Ver detalhes
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Desktop: carrossel -->
      <div class="hidden sm:block">
        <div class="relative overflow-hidden reveal reveal-up" style="transition-delay: 250ms">
          <div
            class="flex transition-transform duration-500 ease-in-out gap-6"
            :style="{ transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * 24 / visibleCards}px))` }"
          >
            <div
              v-for="project in activeProjects"
              :key="project.title"
              class="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div class="relative h-52 overflow-hidden">
                <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span class="absolute top-4 left-4 bg-[#f17b21] text-white text-xs font-semibold px-3 py-1 rounded-full">{{ project.tag }}</span>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#f17b21] transition-colors duration-300">{{ project.title }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ project.description }}</p>
                <NuxtLink :to="project.link" class="inline-flex items-center gap-2 text-[#f17b21] text-sm font-semibold hover:gap-3 transition-all duration-300">
                  Ver detalhes
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 mt-10 reveal reveal-up" style="transition-delay: 300ms">
          <button @click="prev" :disabled="currentIndex === 0" class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#f17b21] hover:text-[#f17b21] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300">
            <Icon name="lucide:chevron-left" class="w-5 h-5" />
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, i) in dots"
              :key="i"
              @click="currentIndex = i"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentIndex === i ? 'bg-[#f17b21] w-6' : 'bg-gray-300'"
            />
          </div>
          <button @click="next" :disabled="currentIndex >= activeProjects.length - visibleCards" class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#f17b21] hover:text-[#f17b21] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300">
            <Icon name="lucide:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  </section>

  <!-- ===== CTA AGENDAMENTO ===== -->
  <section id="agendar-reuniao" class="bg-white py-16 sm:py-24 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto reveal reveal-up">
      <div class="relative bg-gray-950 rounded-2xl sm:rounded-3xl px-6 py-12 sm:px-8 sm:py-16 md:px-16 overflow-hidden text-center">

        <div class="absolute -top-10 -left-10 w-48 h-48 bg-[#f17b21]/10 rounded-full blur-3xl" />
        <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-[#f17b21]/10 rounded-full blur-3xl" />
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#f17b21] to-transparent" />

        <div class="relative z-10">
          <span class="inline-flex items-center gap-2 bg-[#f17b21]/20 border border-[#f17b21]/40 rounded-full px-4 py-1.5 mb-5 sm:mb-6">
            <span class="w-2 h-2 rounded-full bg-[#f17b21] animate-pulse" />
            <span class="text-[#f17b21] text-xs font-semibold tracking-widest uppercase">Fale com a gente</span>
          </span>

          <h2 class="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            Pronto para o próximo <br />
            <span class="text-[#f17b21]">projeto?</span>
          </h2>

          <p class="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Agende uma reunião com nossa equipe técnica e descubra como podemos
            contribuir com segurança e excelência no seu projeto industrial.
          </p>

          <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <NuxtLink to="#agendar-reuniao" class="bg-[#f17b21] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#d96a10] transition-all duration-300 shadow-lg hover:-translate-y-0.5">Agendar Reunião</NuxtLink>
            <NuxtLink to="#servicos" class="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">Ver Serviços</NuxtLink>
          </div>

          <div class="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
            <div v-for="item in ctaDetails" :key="item.text" class="flex items-center gap-2 text-gray-400 text-sm">
              <Icon :name="item.icon" class="w-4 h-4 text-[#f17b21]" />
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

useSeoMeta({ title: 'Field Industrial' })

const loaded = ref(false)
const canvas = ref(null)
let animationId = null

const activeTab = ref('engenharia')
const currentIndex = ref(0)
const visibleCards = 3

const stats = ref([
  { label: 'Anos de Experiência', target: 4, current: 0, suffix: '+', icon: 'lucide:calendar-check' },
  { label: 'Clientes Atendidos', target: 50, current: 0, suffix: '+', icon: 'lucide:users' },
])

function animateCounter(stat) {
  const duration = 2000
  const steps = 60
  const increment = stat.target / steps
  let step = 0
  const timer = setInterval(() => {
    step++
    stat.current = Math.min(Math.round(increment * step), stat.target)
    if (step >= steps) clearInterval(timer)
  }, duration / steps)
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  elements.forEach(el => observer.observe(el))
}

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
  initParticles()
  initReveal()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.value.forEach(stat => animateCounter(stat))
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  const section = document.querySelector('#stats-section')
  if (section) observer.observe(section)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})

function initParticles() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')

  const resize = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 2.5 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    o: Math.random() * 0.4 + 0.4,
  }))

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(241, 123, 33, ${p.o})`
      ctx.fill()
      p.x += p.dx
      p.y += p.dy
      if (p.x < 0 || p.x > c.width) p.dx *= -1
      if (p.y < 0 || p.y > c.height) p.dy *= -1
    })
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
        if (dist < 150) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(241, 123, 33, ${0.2 * (1 - dist / 150)})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }
    animationId = requestAnimationFrame(draw)
  }

  draw()
}

const services = [
  { title: 'Acompanhamento e Inspeção de Fabricação', description: 'Inspeção técnica durante o processo de fabricação industrial, garantindo conformidade com normas e especificações do projeto.', icon: 'lucide:search' },
  { title: 'Supervisão de Montagem e Soldagem', description: 'Supervisão e validação de montagem mecânica e soldagem, assegurando qualidade e rastreabilidade em cada etapa.', icon: 'lucide:wrench' },
  { title: 'Desenvolvimento de Equipamentos', description: 'Estudo e desenvolvimento de equipamentos industriais com memorial de cálculo e projeto detalhado conforme normas aplicáveis.', icon: 'lucide:cpu' },
  { title: 'Laudos de Integridade Mecânica', description: 'Avaliação técnica e emissão de laudos conforme NR-13, NR-12, códigos ASME e demais requisitos regulatórios.', icon: 'lucide:file-check' },
  { title: 'Gestão de Paradas e Manutenção', description: 'Planejamento, gestão e auditoria de paradas de manutenção e obras industriais com foco em segurança e eficiência.', icon: 'lucide:clipboard-list' },
  { title: 'Caldeiraria & Solda', description: 'Fabricação e suporte metalúrgico especializado em caldeiraria e soldagem com controle de qualidade e rastreabilidade.', icon: 'lucide:flame' },
]

const diferenciais = [
  { text: 'Conformidade com NR-13, NR-12 e códigos ASME', icon: 'lucide:shield-check' },
  { text: 'Equipe com certificações técnicas reconhecidas', icon: 'lucide:award' },
  { text: 'Atuação direta em campo com suporte técnico completo', icon: 'lucide:hard-hat' },
  { text: 'Emissão de laudos e relatórios técnicos detalhados', icon: 'lucide:file-text' },
  { text: 'Experiência em paradas de manutenção e obras industriais', icon: 'lucide:settings' },
]

const valores = [
  { title: 'Missão', description: 'Assegurar a excelência técnica e a conformidade regulatória em soluções de engenharia mecânica, maximizando a segurança e a disponibilidade operacional dos ativos industriais de nossos clientes.', icon: 'lucide:target' },
  { title: 'Visão', description: 'Ser reconhecida como a principal referência nacional em projetos de engenharia e consultoria de integridade mecânica, destacando-se pela inovação, confiabilidade e pelo rigor técnico aplicado em ambientes industriais complexos.', icon: 'lucide:eye' },
  { title: 'Valores', description: 'Rigor Técnico: Zero tolerância a desvios de qualidade; Segurança, Vida e Meio-Ambiente: Prioridade inegociável em todas as ações; Conformidade: Adesão estrita às normas técnicas e regulatórias (NRs); Transparência: Comunicação clara e responsável com o cliente; Excelência Operacional: Busca contínua por eficiência e alta performance.', icon: 'lucide:shield-check' },
]

const tabs = [
  { key: 'engenharia', label: 'Projetos de Engenharia' },
  { key: 'venda', label: 'Projetos à Venda' },
]

const projetosEngenharia = [
  { title: 'Inspeção de Vasos de Pressão', description: 'Avaliação técnica e emissão de laudo de integridade conforme NR-13 e código ASME VIII.', image: '/img/proj1.jpeg', tag: 'NR-13', link: '#projetos-engenharia' },
  { title: 'Supervisão de Montagem Mecânica', description: 'Supervisão e validação de montagem de estruturas metálicas e equipamentos rotativos.', image: '/img/proj2.jpeg', tag: 'Montagem', link: '#projetos-engenharia' },
  { title: 'Gestão de Parada de Manutenção', description: 'Planejamento e auditoria de parada geral em planta petroquímica com escopo de 45 dias.', image: '/img/proj3.jpeg', tag: 'Manutenção', link: '#projetos-engenharia' },
  { title: 'Projeto de Caldeiraria Industrial', description: 'Desenvolvimento de projeto detalhado e fabricação de estrutura metálica sob norma AWS D1.1.', image: '/img/proj4.jpeg', tag: 'Caldeiraria', link: '#projetos-engenharia' },
]

const projetosVenda = [
  { title: 'Projeto Estrutural Galpão Industrial', description: 'Projeto completo com memorial de cálculo para galpão metálico de 2.000m².', image: '/img/proj5.jpeg', tag: 'Estrutural', link: '#projetos-venda' },
  { title: 'Memorial de Cálculo — Vaso de Pressão', description: 'Projeto detalhado de vaso de pressão vertical conforme ASME VIII Div. 1.', image: '/img/proj6.jpeg', tag: 'ASME', link: '#projetos-venda' },
  { title: 'Projeto de Tubulação Industrial', description: 'Projeto isométrico e stress analysis de linhas de processo conforme ASME B31.3.', image: '/img/proj7.jpeg', tag: 'Tubulação', link: '#projetos-venda' },
]

const activeProjects = computed(() =>
  activeTab.value === 'engenharia' ? projetosEngenharia : projetosVenda
)

const dots = computed(() =>
  Array.from({ length: Math.max(activeProjects.value.length - visibleCards + 1, 1) })
)

watch(activeTab, () => { currentIndex.value = 0 })

const prev = () => { if (currentIndex.value > 0) currentIndex.value-- }
const next = () => { if (currentIndex.value < activeProjects.value.length - visibleCards) currentIndex.value++ }

const ctaDetails = [
  { text: 'Resposta em até 24h', icon: 'lucide:clock' },
  { text: 'Sem compromisso', icon: 'lucide:check-circle' },
  { text: 'Equipe especializada', icon: 'lucide:hard-hat' },
]
</script>

<style scoped>
.reveal {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-up { transform: translateY(40px); }
.reveal-left { transform: translateX(-50px); }
.reveal-right { transform: translateX(50px); }
.reveal.revealed {
  opacity: 1;
  transform: translateX(0) translateY(0);
}
</style>