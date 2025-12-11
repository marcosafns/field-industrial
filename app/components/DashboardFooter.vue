<template>
  <footer class="w-full bg-[#f8f6f2] border-t border-gray-200">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-gray-500">
      <span>© {{ year }} Field Industrial</span>
      <span class="hidden sm:inline">Painel interno de controle de agendamentos</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>
