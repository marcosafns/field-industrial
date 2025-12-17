<template>
  <header :class="headerClass" class="text-black shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo à esquerda com link para a página inicial -->
      <div class="flex items-center space-x-4">
        <router-link to="/">
          <img 
            src="/img/svg/logo3.svg" 
            alt="Logo Engenharia XYZ" 
            class="h-10 transition-all duration-300 ease-in-out transform hover:scale-110"
          />
        </router-link>
      </div>

      <!-- Menu de Navegação à direita -->
      <nav>
        <ul class="hidden md:flex space-x-8">
          <li>
            <a href="#services" class="hover:text-[#f17b21] transition">Serviços</a>
          </li>
          <li>
            <a href="#about" class="hover:text-[#f17b21] transition">Sobre</a>
          </li>
          <li>
            <a href="#contact" class="hover:text-[#f17b21] transition">Contato</a>
          </li>
        </ul>
      </nav>

      <!-- Botão de Menu Mobile -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-black focus:outline-none">
          <!-- Usando o componente Icon do Nuxt para os ícones de menu -->
          <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6 transition-transform transform" />
        </button>
      </div>
    </div>

    <!-- Menu Mobile com animação de deslizar -->
    <div v-show="isMenuOpen" 
         class="md:hidden bg-white text-black px-6 py-4 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
      <ul class="space-y-4">
        <li>
          <a href="#services" class="hover:text-[#f17b21]">Serviços</a>
        </li>
        <li>
          <a href="#about" class="hover:text-[#f17b21]">Sobre</a>
        </li>
        <li>
          <a href="#contact" class="hhover:text-[#f17b21]">Contato</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);
const headerClass = ref('bg-white bg-opacity-100');

// Mudando a cor de fundo e opacidade ao rolar a página
const changeHeaderOnScroll = () => {
  if (window.scrollY > 10) {
    headerClass.value = 'bg-[white] bg-opacity-70 shadow-lg'; // Fundo escuro e opacidade
  } else {
    headerClass.value = 'bg-white bg-opacity-100'; // Cor original sem transparência
  }
};

onMounted(() => {
  window.addEventListener('scroll', changeHeaderOnScroll); // Adicionando evento de rolagem
});

// Função de alternância do menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Efeito suave para transições */
header {
  transition: all 0.3s ease;
}

/* Animação do menu no mobile */
.md:hidden {
  transition: all 0.5s ease-in-out;
  transform: translateY(0); /* Faz com que o menu desça */
  opacity: 1; /* Faz o menu aparecer com opacidade */
}
</style>
