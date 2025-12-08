<template>
  <div>
    <!-- Seu Header -->
    <Header />

    <!-- Conteúdo da página -->
    <main> <!-- Padding superior para compensar o header fixo -->
      <slot />
    </main>

    <!-- Seu Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
</script>

<style scoped>
/* Se necessário, você pode adicionar estilos específicos aqui */
</style>
