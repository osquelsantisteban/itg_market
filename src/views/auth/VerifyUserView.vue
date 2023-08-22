<template>
    <MainLayout>
  
      <section class="flex w-full">
  
        <figure class="m-auto" v-show="loading">
          <img src="@/assets/images/loader.svg" alt="loading">
        </figure>        
  
      </section>
    </MainLayout>
  </template>
  
<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import { ref,onBeforeMount } from "vue";
import {useAuthStore} from "@/store/authStore"
//   import router from '@/router';
import Swal from 'sweetalert2';
import { useRoute,useRouter } from 'vue-router'
  
const authStore = useAuthStore();
const route = useRoute()
const router = useRouter()
let loading = ref(true)

onBeforeMount(async () => {
  try {

    let token = route.params.token
    console.log(token)
    let login = await authStore.verifyUser({ token });

    if(login){

      Swal.fire({
        title: 'Confirmación',
        text: `Registro de usuario exitoso, ya puede loguearse`,
        icon: 'success',
        confirmButtonColor: '#3085d6',                            
      })
      
      router.push({ name: 'Login'})
    }
    else{
      return Swal.fire({
        title: 'Error',
        text: `Algo salio mal, vuelva a intentarlo más tarde`,
        icon: 'error',
        confirmButtonColor: '#3085d6',                            
      })
    }

  } catch (error) {
    console.log(error)
    return Swal.fire({
        title: 'Error',
        text: `Algo salio mal, vuelva a intentarlo más tarde`,
        icon: 'error',
        confirmButtonColor: '#3085d6',                            
      })
  }finally{
    loading.value = false
  }
})
  </script>
  <style scoped>
  .input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none;
  }
  </style>