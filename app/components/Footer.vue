<template>
  <footer class="bg-white text-black py-8 px-6 shadow-md">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      
      <!-- Logo e informações -->
      <div class="flex flex-col items-center md:items-start space-y-4">
        <router-link to="/">
          <img 
            src="/img/svg/logo.svg" 
            alt="Logo Engenharia XYZ" 
            class="h-24 transition-all duration-300 ease-in-out transform hover:scale-110"
          />
        </router-link>
        <p class="text-sm text-center md:text-left">
          © 2025 Engenharia XYZ - Todos os direitos reservados.
        </p>
      </div>

      <!-- Links de Navegação -->
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <a href="#services" class="hover:text-orange-400 transition">Serviços</a>
        <a href="#about" class="hover:text-orange-400 transition">Sobre</a>
        <a href="#contact" class="hover:text-orange-400 transition">Contato</a>
      </div>

      <!-- Redes Sociais -->
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="text-xl hover:text-orange-400 transition">
          <Icon name="lucide:facebook" class="h-6 w-6" />
        </a>
        <a href="#" class="text-xl hover:text-orange-400 transition">
          <Icon name="lucide:twitter" class="h-6 w-6" />
        </a>
        <a href="#" class="text-xl hover:text-orange-400 transition">
          <Icon name="lucide:instagram" class="h-6 w-6" />
        </a>
        <a href="#" class="text-xl hover:text-orange-400 transition">
          <Icon name="lucide:linkedin" class="h-6 w-6" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>  // Importando o componente Icon do Lucide
</script>

<style scoped>
/* Estilo de animação e transição para os links e ícones */
footer {
  background-color: white;
}

footer a {
  font-size: 1.2rem;
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer a:hover {
  color: #f39c12; /* Cor laranja para o hover */
}

/* Estilo para ícones */
footer .text-xl {
  transition: color 0.3s ease;
}

footer .text-xl:hover {
  color: #f39c12; /* Cor laranja para o hover nos ícones */
}

/* Adicionando sombra para o footer */
footer {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
