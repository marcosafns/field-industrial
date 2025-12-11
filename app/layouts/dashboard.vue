<template>
  <div class="min-h-screen bg-[#f8f6f2] text-[#1D1D1B] flex flex-col">
    <DashboardHeader />

    <main class="flex-1">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <slot />
      </div>
    </main>

    <DashboardFooter />
  </div>
</template>

<script setup>
import DashboardHeader from '~/components/DashboardHeader.vue'
import DashboardFooter from '~/components/DashboardFooter.vue'
</script>
