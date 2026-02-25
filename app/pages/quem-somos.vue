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
          <p class="scroll-reveal scroll-reveal-delay-3 text-gray-500 text-sm mt-4 max-w-xl mx-auto">
            Profissionais especializados, certificados e comprometidos com a excelência técnica em cada projeto.
          </p>
        </div>

        <div
          class="grid gap-8"
          :class="team.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                  team.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'"
        >
          <div
            v-for="(member, i) in team"
            :key="member.name"
            class="scroll-reveal bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
            :class="`scroll-reveal-delay-${Math.min(i + 1, 5)}`"
          >
            <!-- Header do card -->
            <div class="bg-gray-950 px-8 pt-8 pb-14 relative">
              <div class="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl" />
              <div class="flex items-start justify-between">
                <div class="w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <img
                    v-if="member.photo"
                    :src="member.photo"
                    :alt="member.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-[#f17b21] flex items-center justify-center"
                  >
                    <Icon name="lucide:user" class="w-8 h-8 text-white" />
                  </div>
                </div>
                <div class="flex flex-col gap-1.5 items-end">
                  <span
                    v-for="cert in member.certifications"
                    :key="cert"
                    class="text-xs font-bold px-2.5 py-1 rounded-full bg-[#f17b21]/20 text-[#f17b21]"
                  >{{ cert }}</span>
                </div>
              </div>
            </div>

            <!-- Conteúdo -->
            <div class="px-8 pb-8">
              <h3 class="font-black text-gray-900 text-xl mt-1">{{ member.name }}</h3>
              <p class="text-[#f17b21] text-sm font-bold mt-0.5">{{ member.role }}</p>
              <p class="text-gray-500 text-sm mt-4 leading-relaxed">{{ member.bio }}</p>

              <!-- Especialidades -->
              <div v-if="member.specialties?.length" class="mt-5">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Especialidades</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="spec in member.specialties"
                    :key="spec"
                    class="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
                  >{{ spec }}</span>
                </div>
              </div>

              <!-- Contato -->
              <div v-if="member.email || member.linkedin" class="mt-5 flex items-center gap-3 pt-5 border-t border-gray-100">
                <NuxtLink
                  v-if="member.linkedin"
                  :to="member.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  external
                  class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#f17b21] transition-colors duration-200"
                >
                  <Icon name="lucide:linkedin" class="w-3.5 h-3.5" />
                  LinkedIn
                </NuxtLink>
                <NuxtLink
                  v-if="member.email"
                  :to="`mailto:${member.email}`"
                  external
                  class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#f17b21] transition-colors duration-200"
                >
                  <Icon name="lucide:mail" class="w-3.5 h-3.5" />
                  {{ member.email }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Clientes -->
    <section class="py-24 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Confiança</span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3">Nossos Principais Clientes</h2>
          <div class="scroll-reveal scroll-reveal-delay-2 w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
          <p class="scroll-reveal scroll-reveal-delay-3 text-gray-500 text-sm mt-4 max-w-xl mx-auto">
            Empresas que confiam na excelência técnica da Field Industrial.
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div
            v-for="(client, i) in clients"
            :key="client.name"
            class="scroll-reveal flex items-center justify-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md transition-all duration-300 group"
            :class="`scroll-reveal-delay-${Math.min(i + 1, 5)}`"
          >
            <img
              :src="client.logo"
              :alt="client.name"
              class="max-h-14 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
            />
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
  { value: '18+', label: 'Anos de experiência' },
  { value: '200+', label: 'Projetos concluídos' },
  { value: '50+', label: 'Clientes atendidos' },
  { value: '100%', label: 'Conformidade normativa' },
]

const clients = [
  { name: 'Bracell', logo: '/img/clients/bracell.png' },
  { name: 'Bracell Papéis', logo: '/img/clients/bracell-papeis.png' },
  { name: 'Barbieri', logo: '/img/clients/barbieri.png' },
  { name: 'Micro Metal', logo: '/img/clients/micrometal.png' },
  { name: 'Grupo Água Bonita', logo: '/img/clients/aguabonita.png' },
  { name: 'Mills', logo: '/img/clients/mills.png' },
  { name: 'Quality Seg', logo: '/img/clients/qualityseg.png' },
  { name: 'Wolmec', logo: '/img/clients/wolmec.png' },
]

const team = [
  {
    name: 'Fernando Lima',
    role: 'Diretor Técnico',
    bio: 'Especialista em inspeção de equipamentos e conformidade com NR-13 e códigos ASME, com mais de 10 anos de experiência no setor industrial.',
    certifications: ['CREA', 'NR-13'],
    specialties: ['Vasos de Pressão', 'Caldeiras', 'NR-13', 'ASME', 'Laudos Técnicos'],
    linkedin: 'https://www.linkedin.com/in/fh-lima/',
    email: 'fernando@fieldindustrial.com.br',
    photo: '/img/team/fernando.jpeg',
  },
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