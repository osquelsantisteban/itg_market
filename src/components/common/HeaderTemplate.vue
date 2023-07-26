<template>
  <header class="flex items-center justify-between w-full bg-sky-800 px-5 py-2 mb-5">
    
    <div class="flex items-center gap-x-10">
      <!-- Logo -->
      <router-link :to="{name: 'Home'}" class="w-2/12 m-auto sm:m-0 text-white">
        <figure class="">
          <img :src="logo_img" alt="logo">
        </figure>
      </router-link>
      
      <!-- Search -->
      <div class="flex w-full items-center gap-0 h-auto">
        <select name=""  class="w-20 h-10 bg-white border-2 border-amber-400 px-3 py-1 rounded-l-lg">
          <option value="" class="">Todos</option>
          <option value="" class="">Categorias</option>
          <option value="" class="">Productos</option>
          <option value="" class="">Precios</option>
        </select>
        <input 
          type="search"          
          id="search" 
          class="flex h-10 px-3 py-1 w-full placeholder-gray-400 text-gray-800 border-2 border-amber-400 focus:outline-none focus:border-amber-400" 
          placeholder="Buscador"
        >
        <button class="flex items-center px-3 py-2 h-10 bg-amber-400 rounded-r-lg"><i class="fa fa-search text-amber-800"></i></button>
      </div>

      <!-- Lang -->
      <div class="">
  
      </div>
    </div>


    <!-- Iconos -->
    <div class="flex items-center gap-5">
      
      <!-- User -->
      <router-link :to="{name: 'Dashboard'}" class="w-5"><i class="fa fa-user text-white fa-lg"></i></router-link>
      
      <!-- Cart -->
      <router-link :to="{name: 'ShoppingCart'}" class="w-5">
          <i class="fa fa-shopping-cart fa-lg text-white relative"><span class="absolute -top-1 left-[10px] text-sky-800 text-center text-[8px]">{{ cart.totalProducts }}</span></i>
      </router-link>
      
      <!-- Menu -->
      <div class="relative w-5">
        <i class="fa fa-bars text-white  fa-lg" v-show="!openMenu"  @click="openMenu = !openMenu"></i>
        <i class="fa fa-times text-white fa-lg" v-show="openMenu"   @click="openMenu = !openMenu"></i>
      </div>

      <!-- Navigation -->
      <nav class="absolute top-14 right-0 transition-opacity delay-100 bg-slate-800/70 text-white" v-show="openMenu">
        <ul class="w-full py-5">
          <li>p1ssd sdkjsdsk sdjskdskjdks</li>
          <li>p2</li>
          <li>p3</li>
          <li>p4</li>
        </ul>
      </nav>
    </div>

  </header>
</template>

<script setup>
import CONFIG from '../../../config.js'
import { ref/* ,onBeforeMount */ } from "vue";
// import {useAuthStore} from "@/store/authStore"
import {useCartStore} from "@/store/cartStore"

// const auth = useAuthStore();
const cart = useCartStore();

// await authStore.getBearerToken();  

const logo_img = ref(CONFIG.GALLERY + "general/logo/logo-white.png")
const openMenu = ref(false)

</script>
<style scoped>

footer .social-media p {
  font-size: 14px;
}

.input_search{
  @apply flex h-full px-3 py-2 border;
}

li{
  @apply hover:bg-slate-700/70 w-full px-5;
}
</style>
