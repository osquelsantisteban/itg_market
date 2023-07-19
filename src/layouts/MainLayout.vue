<template>
    Productos en el Carrito - {{ cart.totalProducts }}

    <!-- <ModalLocation v-if="showModal" @close="showModal = false" />         -->
    <!-- <div class="flex gap-5">
        <button @click="changeLanguage('es')" class="bg-cyan-800 text-white hover:bg-cyan-800/80">Español</button>
        <button @click="changeLanguage('en')" class="bg-cyan-800 text-white hover:bg-cyan-800/80">English</button>
    </div> 
    <p>{{ $t('message.hello') }}</p>
    -->

    <!-- Cart -->
    <router-link :to="{name: 'ShoppingCart'}" class=" ">
        <i class="fa fa-shopping-cart fa-2x text-cyan-800 relative"><span class="absolute top-[2px] left-4 text-white text-center text-xs">{{ cart.totalProducts }}</span></i>
    </router-link>
    
    <!-- Bookings -->
    <router-link :to="{name: 'Bookings'}" class=" ">Pedidos</router-link>

    <div class="grid grid-cols-1 w-10/12 items-center mx-auto">        
        <slot ></slot>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
import { useCartStore } from '@/store/cartStore'
// import ModalLocation from '@/components/ModalLocation.vue';



const cart = useCartStore()
// const showModal = ref(false);

// onMounted(() => {
//   showModal.value = true;
// });


// I18n
// import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()
// const changeLanguage = (lang) => {
//   locale.value = lang
// }

</script>

<style scoped>
</style>