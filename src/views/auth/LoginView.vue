<template>
  <MainLayout>

    <section class="flex flex-col md:flex-row w-full justify-between bg-white p-5 mb-4 gap-10">

      <figure class="w-full">
        <img src="http://via.placeholder.com/640x360" alt="">
      </figure>

      <div class="flex flex-col items-center justify-center w-full">
        
        <div class="mb-5 w-full md:w-8/12">
          <h4>Login</h4>
        </div>
        <div class="mb-5 w-full md:w-8/12">
          <input class="input_form"            
            v-model="formLogin.username"
            type="text"
            placeholder="Nombre de usuario">
        </div>

        <div class="mb-5 w-full md:w-8/12">
          <input class="input_form"
            id="password" 
            type="password"
            v-model="formLogin.password"          
            placeholder="Escriba la clave">
          <p class="text-red-600 text-xs italic">Please choose a password.</p>
        </div>

        <div class="flex items-center justify-between mb-5 w-full md:w-8/12">
          <router-link :to="{name: 'ResetPassword'}" class="inline-block align-baseline font-bold text-sm text-sky-800 hover:text-sky-800/80">
            Olvidé la contraseña?
          </router-link>
          
          <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="button" @click="sendRequest()">
            Enviar
          </button>
        </div>

        <!-- OAuth -->
        <div class="flex flex-col gap-3 items-center justify-between mb-5 w-full md:w-8/12">
          <button class="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
            <i class="fab fa-google mr-2"></i>
            Iniciar sesión con Google
          </button>
          <button class="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            <i class="fab fa-facebook mr-2"></i>
            Iniciar sesión con Facebook
          </button>
        </div>

        
        <router-link :to="{name: 'Register'}" class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded w-8/12">
          Registrarse
        </router-link>
      </div>

    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref/* ,onBeforeMount */ } from "vue";
import {useAuthStore} from "@/store/authStore"
const authStore = useAuthStore();

const formLogin = ref({
  username: '',
  password: '',
});

/* onBeforeMount(async () => {
  try {
    await authStore.getToken();   
  } catch (error) {
    console.log(error)
  }
  
  // console.log(authStore.token)
  
  // dir.value       = await footerData.dir
  // phones.value    = await footerData.phones
  // copyright.value = await footerData.copyright
}) */

const sendRequest = async () => {
  try {

    await authStore.login({ email: formLogin.value.username, password: formLogin.value.password});
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped>
.input_form {
  @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
  focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>