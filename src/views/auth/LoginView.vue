<template>
  <MainLayout>

    <section class="flex flex-col md:flex-row w-full justify-between bg-white p-5 mb-4 gap-x-10">

      <figure class="w-1/2">
        <img src="http://via.placeholder.com/640x360" alt="">
      </figure>

      <div class="flex flex-col items-center justify-center w-1/2">
        <div class="mb-5 w-8/12">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="username">
            Usuario
          </label>
          <input class="input_form" 
            id="username"
            v-model="formLogin.username"
            type="text"
            placeholder="Nombre de usuario">
        </div>
        <div class="mb-5 w-8/12">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="input_form"
            id="password" 
            type="password"
            v-model="formLogin.password"          
            placeholder="Escriba la clave">
          <p class="text-red-600 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between mb-5 w-8/12">
          <a class="inline-block align-baseline font-bold text-sm text-sky-800 hover:text-sky-800/80" href="#">
            Olvidé la contraseña?
          </a>
          <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="button">
            Enviar
          </button>
        </div>
        <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded w-8/12" type="button">
          Registrarse
        </button>
      </div>

    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref,onBeforeMount } from "vue";
import {useAuthStore} from "@/store/authStore"
const authStore = useAuthStore();

const formLogin = ref({
  username: '',
  password: '',
});

onBeforeMount(async () => {
  await authStore.getBearerToken();  
  // console.log(authStore.bearer_token)
  
  // dir.value       = await footerData.dir
  // phones.value    = await footerData.phones
  // copyright.value = await footerData.copyright
})
</script>
<style scoped>
.input_form {
  @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
  focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>