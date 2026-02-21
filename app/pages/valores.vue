<template>
  <div class="pt-20">

    <!-- Hero -->
    <section class="relative bg-gray-950 py-28 px-4 overflow-hidden">
      <div class="absolute top-0 right-1/3 w-96 h-96 bg-[#f17b21] rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Princípios</span>
        <h1 class="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">Nossos Valores</h1>
        <p class="scroll-reveal scroll-reveal-delay-2 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Os princípios que guiam cada decisão, projeto e relacionamento da Field Industrial.
        </p>
      </div>
    </section>

    <!-- Valores principais -->
    <section class="py-24 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">O que nos guia</span>
          <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3">Valores que movem a empresa</h2>
          <div class="scroll-reveal scroll-reveal-delay-2 w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="(value, i) in coreValues"
            :key="value.title"
            class="scroll-reveal relative p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group overflow-hidden"
            :class="`scroll-reveal-delay-${Math.min(i + 1, 5)}`"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-100 transition-colors duration-300" />
            <div class="flex items-start gap-5 relative z-10">
              <div class="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#f17b21] transition-colors duration-300">
                <Icon :name="value.icon" class="w-7 h-7 text-[#f17b21] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 class="text-xl font-black text-gray-900 mb-2">{{ value.title }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ value.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Missão, Visão e Valores -->
    <section class="py-24 px-4 bg-gray-50">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
        <span class="scroll-reveal text-[#f17b21] text-xs font-bold tracking-widest uppercase">Propósito</span>
        <h2 class="scroll-reveal scroll-reveal-delay-1 text-3xl md:text-4xl font-black text-gray-900 mt-3">Missão, Visão e Valores</h2>
        <div class="scroll-reveal scroll-reveal-delay-2 w-12 h-1 bg-[#f17b21] mx-auto mt-4 rounded-full" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Missão -->
        <div class="scroll-reveal scroll-reveal-delay-1 bg-gray-950 rounded-3xl p-10">
            <div class="w-12 h-12 bg-[#f17b21] rounded-xl flex items-center justify-center mb-6">
            <Icon name="lucide:target" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-2xl font-black text-white mb-4">Missão</h3>
            <p class="text-gray-400 leading-relaxed text-sm">
            Assegurar a excelência técnica e a conformidade regulatória em soluções de engenharia mecânica, maximizando a segurança e a disponibilidade operacional dos ativos industriais de nossos clientes.
            </p>
        </div>

        <!-- Visão -->
        <div class="scroll-reveal scroll-reveal-delay-2 bg-[#f17b21] rounded-3xl p-10">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 opacity-90">
            <Icon name="lucide:eye" class="w-6 h-6 text-[#f17b21]" />
            </div>
            <h3 class="text-2xl font-black text-white mb-4">Visão</h3>
            <p class="text-white leading-relaxed text-sm opacity-90">
            Ser reconhecida como a principal referência nacional em projetos de engenharia e consultoria de integridade mecânica, destacando-se pela inovação, confiabilidade e pelo rigor técnico aplicado em ambientes industriais complexos.
            </p>
        </div>

        <!-- Valores -->
        <div class="scroll-reveal scroll-reveal-delay-3 bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
            <Icon name="lucide:star" class="w-6 h-6 text-[#f17b21]" />
            </div>
            <h3 class="text-2xl font-black text-gray-900 mb-5">Valores</h3>
            <ul class="space-y-3">
            <li v-for="valor in valores" :key="valor.titulo" class="flex items-start gap-2.5">
                <div class="w-1.5 h-1.5 rounded-full bg-[#f17b21] flex-shrink-0 mt-2" />
                <p class="text-sm text-gray-600 leading-relaxed">
                <span class="font-bold text-gray-900">{{ valor.titulo }}:</span> {{ valor.desc }}
                </p>
            </li>
            </ul>
        </div>

        </div>
    </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-white border-t border-gray-100">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="scroll-reveal text-3xl font-black text-gray-900 mb-4">Esses valores guiam cada projeto</h2>
        <p class="scroll-reveal scroll-reveal-delay-1 text-gray-500 mb-8">Conheça como aplicamos nossos princípios na prática.</p>
        <NuxtLink
          to="/servicos"
          class="scroll-reveal scroll-reveal-delay-2 inline-flex items-center gap-2 bg-[#f17b21] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d96a10] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Icon name="lucide:wrench" class="w-5 h-5" />
          Ver Serviços
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({ title: 'Valores — Field Industrial' })

const coreValues = [
  { icon: 'lucide:shield', title: 'Segurança em Primeiro Lugar', desc: 'Cada projeto é conduzido com rigorosa atenção às normas de segurança. A integridade das instalações e das pessoas é inegociável.' },
  { icon: 'lucide:award', title: 'Excelência Técnica', desc: 'Nossa equipe busca constantemente o mais alto nível de qualidade técnica, aplicando as melhores práticas e metodologias do setor.' },
  { icon: 'lucide:handshake', title: 'Compromisso com o Cliente', desc: 'Trabalhamos como parceiros dos nossos clientes, entendendo suas necessidades e entregando soluções que superam expectativas.' },
  { icon: 'lucide:book-open', title: 'Conformidade Normativa', desc: 'Atuamos em total conformidade com NR-13, NR-12, ASME e demais requisitos regulatórios, garantindo segurança jurídica e técnica.' },
  { icon: 'lucide:lightbulb', title: 'Inovação Constante', desc: 'Investimos continuamente no desenvolvimento de novas metodologias e na capacitação da equipe para oferecer soluções modernas.' },
  { icon: 'lucide:check-circle', title: 'Responsabilidade Técnica', desc: 'Assumimos total responsabilidade pelos laudos, projetos e pareceres emitidos, com respaldo técnico e legal em cada entrega.' },
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

const valores = [
  { titulo: 'Rigor Técnico', desc: 'Zero tolerância a desvios de qualidade.' },
  { titulo: 'Segurança, Vida e Meio-Ambiente', desc: 'Prioridade inegociável em todas as ações.' },
  { titulo: 'Conformidade', desc: 'Adesão estrita às normas técnicas e regulatórias (NRs).' },
  { titulo: 'Transparência', desc: 'Comunicação clara e responsável com o cliente.' },
  { titulo: 'Excelência Operacional', desc: 'Busca contínua por eficiência e alta performance.' },
]

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