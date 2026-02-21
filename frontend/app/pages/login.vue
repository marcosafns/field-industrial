<template>
  <main class="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-2 text-[#1D1D1B]">
        Login do engenheiro
      </h1>
      <p class="text-sm text-gray-600 mb-6">
        Faça login para visualizar e aprovar solicitações.
      </p>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="engenheiro@empresa.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Sua senha"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold focus:outline-none hover:bg-orange-600"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import fetch from 'node-fetch';

const email = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login bem-sucedido:', data);
      // Redirecionar ou salvar o token
    } else {
      console.error('Erro no login:', data.message || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
  }
};
</script>

<style scoped>
/* Adicione seu CSS personalizado aqui, se necessário */
</style>
