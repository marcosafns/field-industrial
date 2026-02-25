<template>
  <div>
    <!-- Page transition loader -->
    <Transition name="page-loader">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[200] bg-white flex items-center justify-center"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <img src="/img/svg/logo3.svg" alt="Field Industrial" class="h-12 opacity-90" />
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#f17b21] rounded-full animate-progress" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Conteúdo só aparece depois do loader sair -->
    <Transition name="content-fade">
      <div v-if="!isLoading">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const isLoading = ref(true)
const router = useRouter()

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 800)
})

router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => { isLoading.value = false }, 800)
})
</script>

<style>
.page-loader-enter-active,
.page-loader-leave-active {
  transition: opacity 0.2s ease;
}
.page-loader-enter-from,
.page-loader-leave-to {
  opacity: 0;
}

.content-fade-enter-active {
  transition: opacity 0.3s ease;
}
.content-fade-enter-from {
  opacity: 0;
}

@keyframes progress {
  0% { width: 0%; transform: translateX(0); }
  50% { width: 70%; }
  100% { width: 100%; transform: translateX(100%); }
}

.animate-progress {
  animation: progress 0.8s ease-in-out infinite;
}
</style>