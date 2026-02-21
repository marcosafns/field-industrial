<template>
  <div class="pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-28 px-4 overflow-hidden">
      <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">O que fazemos</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">Serviços</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Soluções completas de engenharia industrial com alto padrão técnico e conformidade normativa.
        </p>
      </div>
    </section>

    <!-- Serviços -->
    <section
      v-for="(service, i) in services"
      :key="service.title"
      :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
      class="py-24 px-4"
    >
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <!-- Ícone -->
        <div
          class="scroll-reveal"
          :class="i % 2 !== 0 ? 'lg:order-2 scroll-reveal-delay-2' : 'scroll-reveal-delay-1'"
        >
          <div class="bg-gray-950 rounded-3xl p-12 flex items-center justify-center aspect-square max-w-sm mx-auto relative overflow-hidden">
            <div class="absolute top-0 right-0 w-48 h-48 bg-[#f17b21] rounded-full blur-3xl opacity-20" />
            <Icon :name="service.icon" class="w-28 h-28 text-[#f17b21] relative z-10" />
            <div class="absolute bottom-6 left-6 right-6">
              <div class="h-px bg-gradient-to-r from-[#f17b21] to-transparent rounded-full" />
            </div>
          </div>
        </div>

        <!-- Conteúdo -->
        <div :class="i % 2 !== 0 ? 'lg:order-1' : ''">
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-5 leading-tight">
            {{ service.title }}
          </h2>
          <p class="scroll-reveal scroll-reveal-delay-2 text-gray-600 leading-relaxed mb-6">
            {{ service.desc }}
          </p>
          <ul class="space-y-3">
            <li
              v-for="(item, j) in service.items"
              :key="item"
              class="scroll-reveal flex items-start gap-3 text-gray-600 text-sm"
              :class="`scroll-reveal-delay-${Math.min(j + 3, 5)}`"
            >
              <div class="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="lucide:check" class="w-3 h-3 text-[#f17b21]" />
              </div>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-gray-950">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-3xl font-black text-white mb-4">Precisa de algum desses serviços?</h2>
        <p class="scroll-reveal scroll-reveal-delay-1 text-gray-400 mb-8">Entre em contato e solicite uma proposta personalizada.</p>
        <NuxtLink
          to="/agendar-reuniao"
          class="scroll-reveal scroll-reveal-delay-2 inline-flex items-center gap-2 bg-[#f17b21] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d96a10] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Solicitar Proposta
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Serviços — Field Industrial' })

const services = [
  {
    icon: 'lucide:search',
    title: 'Acompanhamento e Inspeção de Fabricação',
    desc: 'Monitoramento técnico completo durante o processo de fabricação industrial, garantindo conformidade com especificações de projeto e normas aplicáveis.',
    items: [
      'Inspeção de materiais e certificados',
      'Acompanhamento de processos de fabricação',
      'Verificação dimensional e geométrica',
      'Relatórios técnicos detalhados',
      'Conformidade com normas ASME, AWS e ABNT',
    ],
  },
  {
    icon: 'lucide:settings',
    title: 'Supervisão e Validação de Montagem Mecânica e Soldagem',
    desc: 'Supervisão técnica especializada em montagem mecânica e processos de soldagem, assegurando qualidade e segurança na execução dos trabalhos.',
    items: [
      'Qualificação de procedimentos de soldagem (WPS/PQR)',
      'Inspeção visual e dimensional de soldas',
      'Supervisão de montagem mecânica',
      'Testes de estanqueidade e pressão',
      'Documentação técnica e registros de inspeção',
    ],
  },
  {
    icon: 'lucide:drafting-compass',
    title: 'Estudo e Desenvolvimento de Equipamentos Industriais',
    desc: 'Desenvolvimento completo de projetos de equipamentos industriais, desde o memorial de cálculo até o projeto detalhado para fabricação.',
    items: [
      'Memorial de cálculo estrutural e de pressão',
      'Projeto detalhado conforme ASME VIII',
      'Seleção de materiais e componentes',
      'Desenhos técnicos e especificações',
      'Análise de integridade e vida útil',
    ],
  },
  {
    icon: 'lucide:clipboard-list',
    title: 'Laudos de Integridade Mecânica',
    desc: 'Avaliação técnica e emissão de laudos de integridade mecânica conforme NR-13, NR-12, códigos ASME e demais requisitos regulatórios.',
    items: [
      'Laudo de vasos de pressão (NR-13)',
      'Laudo de caldeiras e tubulações',
      'Avaliação de segurança de máquinas (NR-12)',
      'Inspeção com ART/RRT',
      'Plano de inspeção e manutenção',
    ],
  },
  {
    icon: 'lucide:calendar-check',
    title: 'Gestão de Paradas de Manutenção',
    desc: 'Planejamento, gestão e auditoria de paradas de manutenção e obras industriais, garantindo eficiência, segurança e cumprimento de prazos.',
    items: [
      'Planejamento e cronograma de parada',
      'Coordenação de equipes multidisciplinares',
      'Controle de escopo, prazo e custo',
      'Auditorias de segurança e qualidade',
      'Relatórios de desempenho e lições aprendidas',
    ],
  },
  {
    icon: 'lucide:flame',
    title: 'Fabricação e Suporte Metalúrgico',
    desc: 'Serviços especializados em caldeiraria e soldagem, com suporte técnico metalúrgico para fabricação e reparo de equipamentos industriais.',
    items: [
      'Caldeiraria pesada e leve',
      'Soldagem estrutural e de pressão',
      'Suporte técnico metalúrgico',
      'Reparo e recuperação de equipamentos',
      'Controle de qualidade na fabricação',
    ],
  },
]

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