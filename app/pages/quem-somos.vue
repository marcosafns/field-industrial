<template>
  <div class="pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-28 px-4 overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">A Empresa</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">Quem Somos</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Engenharia com excelência, precisão e compromisso com a segurança industrial.
        </p>
      </div>
    </section>

    <!-- História -->
    <section class="py-24 px-4 bg-white">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Nossa História</span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            Fundada para transformar a engenharia industrial
          </h2>
          <div class="scroll-reveal scroll-reveal-delay-2 space-y-4 text-gray-600 leading-relaxed">
            <p>A Field Industrial nasceu da visão de profissionais com ampla experiência no setor industrial, unidos pelo objetivo de oferecer serviços de engenharia com alto padrão técnico e comprometimento total com os clientes.</p>
            <p>Atuamos em projetos de grande complexidade, sempre com foco em segurança, conformidade normativa e excelência técnica. Nossa equipe é formada por engenheiros especializados, inspetores certificados e técnicos altamente qualificados.</p>
            <p>Ao longo da nossa trajetória, consolidamos uma reputação sólida no mercado industrial, sendo referência em inspeção, supervisão e desenvolvimento de projetos mecânicos.</p>
          </div>
        </div>
        <div class="scroll-reveal scroll-reveal-delay-3 relative">
          <div class="bg-gray-950 rounded-3xl p-10">
            <div class="grid grid-cols-2 gap-8">
              <div v-for="stat in stats" :key="stat.label" class="text-center">
                <p class="text-4xl font-black text-[#f17b21]">{{ stat.value }}</p>
                <p class="text-gray-400 text-sm mt-1">{{ stat.label }}</p>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-[#f17b21] rounded-2xl -z-10" />
          <div class="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#f17b21] rounded-xl -z-10" />
        </div>
      </div>
    </section>

    <!-- Time -->
    <section class="py-24 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Pessoas</span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3">Nossa Equipe</h2>
          <div class="scroll-reveal scroll-reveal-delay-2 w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(member, i) in team"
            :key="member.name"
            class="scroll-reveal bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group text-center"
            :class="`scroll-reveal-delay-${i + 1}`"
          >
            <div class="w-20 h-20 bg-[#f17b21] rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:user" class="w-9 h-9 text-white" />
            </div>
            <h3 class="font-bold text-gray-900 text-lg">{{ member.name }}</h3>
            <p class="text-[#f17b21] text-sm font-semibold mt-1">{{ member.role }}</p>
            <p class="text-gray-500 text-sm mt-3 leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificações -->
    <section class="py-24 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Qualidade</span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3">Certificações e Diferenciais</h2>
          <div class="scroll-reveal scroll-reveal-delay-2 w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(cert, i) in certifications"
            :key="cert.title"
            class="scroll-reveal flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-300"
            :class="`scroll-reveal-delay-${Math.min(i + 1, 5)}`"
          >
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon :name="cert.icon" class="w-6 h-6 text-[#f17b21]" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900">{{ cert.title }}</h3>
              <p class="text-gray-500 text-sm mt-1 leading-relaxed">{{ cert.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-gray-950">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-3xl font-black text-white mb-4">Pronto para trabalhar com a gente?</h2>
        <p class="scroll-reveal scroll-reveal-delay-1 text-gray-400 mb-8">Fale com nossos especialistas e descubra como podemos ajudar seu projeto.</p>
        <NuxtLink
          to="/agendar-reuniao"
          class="scroll-reveal scroll-reveal-delay-2 inline-flex items-center gap-2 bg-[#f17b21] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d96a10] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Agendar Reunião
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Quem Somos — Field Industrial' })

const stats = [
  { value: '10+', label: 'Anos de experiência' },
  { value: '200+', label: 'Projetos concluídos' },
  { value: '50+', label: 'Clientes atendidos' },
  { value: '100%', label: 'Conformidade normativa' },
]

const team = [
  { name: 'Engenheiro Responsável', role: 'Diretor Técnico', bio: 'Especialista em inspeção de equipamentos e conformidade com NR-13 e códigos ASME, com mais de 10 anos de experiência.' },
  { name: 'Inspetor Sênior', role: 'Inspeção & Soldagem', bio: 'Certificado em inspeção de soldagem e caldeiraria, com vasta experiência em projetos de grande porte.' },
  { name: 'Engenheiro de Projetos', role: 'Projetos Mecânicos', bio: 'Responsável pelo desenvolvimento de projetos detalhados e memoriais de cálculo para equipamentos industriais.' },
]

const certifications = [
  { icon: 'lucide:shield-check', title: 'NR-13', desc: 'Habilitação completa para inspeção de vasos de pressão, caldeiras e tubulações.' },
  { icon: 'lucide:shield-check', title: 'NR-12', desc: 'Avaliação técnica e laudos de segurança em máquinas e equipamentos industriais.' },
  { icon: 'lucide:award', title: 'ASME', desc: 'Conhecimento e aplicação dos códigos ASME para projeto e inspeção de equipamentos.' },
  { icon: 'lucide:clipboard-check', title: 'Laudos Técnicos', desc: 'Emissão de laudos de integridade mecânica com responsabilidade técnica registrada.' },
  { icon: 'lucide:users', title: 'Equipe Certificada', desc: 'Profissionais com certificações CREA e qualificações específicas por área de atuação.' },
  { icon: 'lucide:trending-up', title: 'Melhoria Contínua', desc: 'Processos auditados e em constante evolução para garantir o mais alto padrão de entrega.' },
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