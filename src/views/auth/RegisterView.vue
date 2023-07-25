<template>
    <MainLayout>
  
      <section class="flex flex-col md:flex-row w-full justify-between bg-white p-5 mb-4 gap-x-10">
  
        <figure class="w-1/2">
          <img src="http://via.placeholder.com/640x360" alt="">
        </figure>
  
        <div class="flex flex-col items-center justify-center w-1/2">

            <!-- Nombre y Apellidos -->
            <div class="mb-5 w-full">
                <div class="flex gap-5 w-full">
                    <input class="input_form" 
                    v-model="formLogin.name"
                    type="text"
                    placeholder="Nombre">

                    <input class="input_form" 
                    v-model="formLogin.last_name"
                    type="text"
                    placeholder="Apellidos">
                </div>
            </div>

            <!-- Email -->
            <div class="mb-5 w-full">
                <input class="input_form" 
                v-model="formLogin.email"
                type="email"
                placeholder="Email">
            </div>


            <div class="flex flex-row mb-5 w-full gap-3">
                
                <!-- Password -->
                <input class="input_form"
                type="password"
                v-model="formLogin.password"          
                placeholder="Escriba la contraseña">
                
                <!-- Confirmacion Password -->
                <input class="input_form"
                type="password"
                v-model="formLogin.confirm_password"          
                placeholder="Confirme la contraseña">
            </div>              

            <!-- Address -->
            <div class="mb-5 w-full">
                <input class="input_form" 
                v-model="formLogin.address"
                type="text"
                placeholder="Dirección">
            </div>

            <!-- Phone -->
            <div class="mb-5 w-full">
                <input class="input_form" 
                v-model="formLogin.phone"
                type="text"
                placeholder="Teléfono">
            </div>
          
            
            <!-- Enviar -->
            <div class="flex items-center justify-end mb-5 w-full">                
                <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="button"
                @click="sendRequest()">
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
  
  const formLogin = ref({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    phone: '',
  });
  
  const sendRequest = (async () => {
    let msg = 
    `nombre ${formLogin.value.name}
     email ${formLogin.value.email}
     password ${formLogin.value.password}
     confirm_password ${formLogin.value.confirm_password}
     address ${formLogin.value.address}
     phone ${formLogin.value.phone}`
    alert(msg)    
  })

  </script>
  <style scoped>
  .input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none;
  }
  </style>