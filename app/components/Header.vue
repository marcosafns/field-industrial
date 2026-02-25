<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="scrolled
      ? 'bg-white/90 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
      : 'bg-white'"
  >
    <!-- Barra laranja no topo -->
    <div class="h-0.5 w-full bg-gradient-to-r from-transparent via-[#f17b21] to-transparent opacity-60" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 sm:h-20">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="absolute inset-0 bg-[#f17b21]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/img/svg/logo3.svg"
              alt="Field Industrial"
              class="relative h-9 sm:h-11 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </NuxtLink>

        <!-- Nav Desktop -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="relative px-3 py-2 text-sm font-medium rounded-lg group transition-colors duration-200"
            :class="isActive(item.href)
              ? 'text-[#f17b21]'
              : 'text-gray-600 hover:text-[#f17b21]'"
          >
            <span
              class="absolute inset-0 rounded-lg transition-colors duration-200"
              :class="isActive(item.href) ? 'bg-[#f17b21]/8' : 'bg-[#f17b21]/0 group-hover:bg-[#f17b21]/8'"
            />
            <span class="relative">{{ item.label }}</span>
            <span
              class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#f17b21] transition-all duration-200"
              :class="isActive(item.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'"
            />
          </NuxtLink>
        </nav>

        <!-- CTA + Mobile button -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/agendar-reuniao"
            class="hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 group"
            :class="isActive('/agendar-reuniao')
              ? 'bg-[#d96a10] text-white shadow-[#f17b21]/40 shadow-lg'
              : 'bg-[#f17b21] text-white hover:bg-[#d96a10] hover:shadow-[#f17b21]/30 hover:shadow-lg'"
          >
            <Icon name="lucide:calendar" class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
            Agendar Reunião
          </NuxtLink>

          <button
            @click="toggleMenu"
            class="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-[#f17b21]/40 hover:text-[#f17b21] transition-all duration-200"
            aria-label="Abrir menu"
          >
            <Icon
              :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="h-5 w-5 transition-all duration-300"
              :class="isMenuOpen ? 'rotate-90' : 'rotate-0'"
            />
          </button>
        </div>

      </div>
    </div>

    <!-- Menu Mobile -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="isMenuOpen" class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            @click="closeMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group"
            :class="isActive(item.href)
              ? 'bg-[#f17b21]/8 text-[#f17b21]'
              : 'text-gray-700 hover:bg-[#f17b21]/8 hover:text-[#f17b21]'"
          >
            <span
              class="w-1.5 h-1.5 rounded-full transition-colors duration-200"
              :class="isActive(item.href) ? 'bg-[#f17b21]' : 'bg-[#f17b21]/40 group-hover:bg-[#f17b21]'"
            />
            {{ item.label }}
          </NuxtLink>

          <div class="pt-2 pb-1">
            <NuxtLink
              to="/agendar-reuniao"
              @click="closeMenu"
              class="flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-full transition-all duration-300"
              :class="isActive('/agendar-reuniao') ? 'bg-[#d96a10]' : 'bg-[#f17b21] hover:bg-[#d96a10]'"
            >
              <Icon name="lucide:calendar" class="w-4 h-4" />
              Agendar Reunião
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const route = useRoute()
const isMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { href: '/quem-somos', label: 'Quem Somos' },
  { href: '/valores', label: 'Valores' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/projetos-a-venda', label: 'Projetos à Venda' },
  { href: '/projetos-de-engenharia', label: 'Projetos de Engenharia' },
]

function isActive(href) {
  return route.path === href
}

const handleScroll = () => { scrolled.value = window.scrollY > 10 }
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>