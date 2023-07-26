<template>
    <MainLayout>
  
      <section class="flex flex-col md:flex-row w-full justify-between bg-white p-5 mb-4 gap-10">
  
        <figure class="w-full">
          <img src="http://via.placeholder.com/640x360" alt="">
        </figure>
  
        <div class="flex flex-col items-center justify-center w-full">

            <!-- Title -->
            <div class="mb-5 w-full">
                <h4>Cambiar Password</h4>
            </div>

            <!-- Email -->
            <div class="mb-5 w-full">
                <input class="input_form" 
                v-model="email"
                type="email"
                placeholder="Email">
            </div>


            <!-- Enviar -->
            <div class="flex items-center justify-end mb-5 w-full">                
                <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="button"
                 @click="SendRequest()">
                Enviar
                </button>
            </div>
          
        </div>
  
      </section>
    </MainLayout>
  </template>
  
  <script setup>
  import MainLayout from '@/layouts/MainLayout.vue'
  import { ref } from "vue";
//   import {useAuthStore} from "@/store/authStore"
//   const authStore = useAuthStore();
  
  const email = ref(null);
  
  const SendRequest = (async () => {
    alert(email.value)
  })
  </script>
  <style scoped>
  .input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none;
  }
  </style>