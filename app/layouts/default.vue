<template>
  <div class="overflow-x-hidden">
    <!-- Seu Header -->
    <Header />

    <!-- Conteúdo da página -->
    <main>
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

