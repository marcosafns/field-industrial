<template>
  <div>
    <!-- Aqui vai o conteúdo da sua página inicial -->
    <div class="relative">
      <!-- Background Imagem -->
      <div class="relative w-full h-screen bg-cover bg-center" :style="{ backgroundImage: 'url(/img/png/background.png)' }">
        <div class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <!-- Texto animado -->
          <h1 class="text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center px-4 fade-in-out">
            {{ currentText }}
          </h1>
        </div>
      </div>

      <!-- Cards de Serviços -->
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 class="text-xl font-semibold">Manutenção Industrial e Off-shore</h2>
            <p class="mt-4">Manutenção Industrial, especialmente para setores de Petróleo, Óleo e Gás, além de manutenção off-shore, atendendo as demandas específicas desses setores.</p>
          </div>

          <!-- Card 2 -->
          <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 class="text-xl font-semibold">Serviços de Climatização</h2>
            <p class="mt-4">Soluções de climatização essenciais para o conforto e a eficiência energética.</p>
          </div>

          <!-- Card 3 -->
          <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 class="text-xl font-semibold">Manutenção de Infraestrutura</h2>
            <p class="mt-4">Manutenção Predial, de Data Centers e de Sistemas Críticos de Energia, garantindo a integridade física e o funcionamento adequado das infraestruturas diversas.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Texto alternado para o header
const texts = [
  '3 anos de experiência em Engenharia de Manutenção',
  'Soluções inovadoras para a indústria',
  'Transformando desafios em soluções eficientes',
  'Tecnologia e inovação para o futuro da manutenção'
];

const currentText = ref(texts[0]); // Inicializa com o primeiro texto

let currentIndex = 0;

onMounted(() => {
  // Função para alternar o texto a cada 5 segundos (aumentado)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.length; // Ciclo entre os textos
    currentText.value = texts[currentIndex]; // Atualiza o texto
  }, 5000); // A cada 5 segundos
});
</script>

<style scoped>
/* Estilos para o header */
header {
  position: relative;
  z-index: 100; /* Garantindo que o header fique acima de outros elementos */
  background: rgba(255, 255, 255, 0.8); /* Fundo branco com transparência */
}

header h1 {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6); /* Sombras no texto para melhorar a legibilidade */
}

/* Estilo dos cards */
.grid > div {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Suaviza a animação de sombra e transformação */
}

.grid > div:hover {
  transform: translateY(-10px); /* Levanta o card ao passar o mouse */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15); /* Sombra maior ao passar o mouse */
}

/* Animação do texto com fade */
.fade-in-out {
  animation: fadeInOut 5s ease-in-out infinite; /* Aumentando o tempo da animação para 5 segundos */
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
