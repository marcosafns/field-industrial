<template>
  <footer class="bg-white text-black">

    <!-- Linha decorativa laranja no topo -->
    <div class="h-0.5 w-full bg-gradient-to-r from-transparent via-[#f17b21] to-transparent opacity-60" />

    <!-- Seção principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

      <!-- Logo e descrição -->
      <div class="flex flex-col space-y-5">
        <NuxtLink to="/" class="group inline-block">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-[#f17b21]/15 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/img/svg/logo.svg"
              alt="Field Industrial"
              class="relative h-20 w-auto max-w-[180px] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </NuxtLink>

        <p class="text-sm text-gray-500 leading-relaxed italic">
          "Turning challenges into opportunity."
        </p>

        <!-- Redes Sociais -->
        <div class="flex flex-col gap-2 pt-1">
          <NuxtLink
            to="https://www.instagram.com/fieldindustrial/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-gray-500 hover:text-[#f17b21] transition-all duration-200 group w-fit"
          >
            <div class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#f17b21]/10 transition-colors duration-200">
              <Icon name="lucide:instagram" class="h-4 w-4" />
            </div>
            <span class="text-sm font-medium">@fieldindustrial</span>
          </NuxtLink>

          <NuxtLink
            to="https://www.linkedin.com/company/fieldindustrial/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-gray-500 hover:text-[#f17b21] transition-all duration-200 group w-fit"
          >
            <div class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#f17b21]/10 transition-colors duration-200">
              <Icon name="lucide:linkedin" class="h-4 w-4" />
            </div>
            <span class="text-sm font-medium">Field Industrial</span>
          </NuxtLink>
          <NuxtLink
            to="mailto:contato@fieldindustrial.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-gray-500 hover:text-[#f17b21] transition-all duration-200 group w-fit"
          >
            <div class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#f17b21]/10 transition-colors duration-200">
              <Icon name="lucide:mail" class="h-4 w-4" />
            </div>
            <span class="text-sm font-medium">contato@fieldindustrial.com.br</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Links de Navegação -->
      <div class="flex flex-col space-y-1">
        <h4 class="text-xs font-bold uppercase tracking-widest text-[#f17b21] mb-3">Navegação</h4>
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-[#f17b21] transition-all duration-200 group w-fit"
        >
          <span class="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#f17b21] group-hover:w-2 transition-all duration-200" />
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- CTA -->
      <div class="flex flex-col space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-widest text-[#f17b21] mb-1">Vamos conversar?</h4>
        <p class="text-sm text-gray-500 leading-relaxed">
          Agende uma reunião com nossa equipe técnica e descubra como podemos ajudar no seu próximo projeto.
        </p>

        <NuxtLink
          to="agendar-reuniao"
          class="flex items-center justify-center gap-2 bg-[#f17b21] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#d96a10] transition-all duration-300 shadow-md hover:shadow-[#f17b21]/30 hover:shadow-lg hover:-translate-y-0.5 group w-full sm:w-fit"
        >
          <Icon name="lucide:calendar" class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          Agendar Reunião
        </NuxtLink>

        <!-- Info de contato -->
        <div class="flex flex-col gap-2 pt-1">
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <Icon name="lucide:clock" class="w-4 h-4 text-[#f17b21]" />
            <span>Resposta em até 24h</span>
          </div>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <Icon name="lucide:shield-check" class="w-4 h-4 text-[#f17b21]" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Barra inferior -->
    <div class="border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-xs text-gray-400">© 2026 Field Industrial — Todos os direitos reservados.</p>
        <p class="text-xs text-gray-300">Engenharia com excelência e precisão.</p>
      </div>
    </div>

  </footer>
</template>

<script setup>
const navItems = [
  { href: 'quem-somos', label: 'Quem Somos' },
  { href: 'valores', label: 'Valores' },
  { href: 'servicos', label: 'Serviços' },
  { href: 'projetos-a-venda', label: 'Projetos à Venda' },
  { href: 'projetos-de-engenharia', label: 'Projetos de Engenharia' },
  { href: 'agendar-reuniao', label: 'Agendar Reunião' },
]
</script>