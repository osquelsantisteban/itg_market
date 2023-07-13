<template>
    Productos en el Carrito - {{ cart.totalProducts }}

    <!-- <ModalLocation v-if="showModal" @close="showModal = false" />         -->
    <div class="flex gap-5">
        <button @click="changeLanguage('es')" class="bg-cyan-800 text-white hover:bg-cyan-800/80">Español</button>
        <button @click="changeLanguage('en')" class="bg-cyan-800 text-white hover:bg-cyan-800/80">English</button>
    </div>

    <p>{{ $t('hello') }}</p>

    <div class="grid grid-cols-1 w-10/12 items-center mx-auto">        
        <slot ></slot>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/store/cartStore'
// import { ref, onMounted } from 'vue';
// import ModalLocation from '@/components/ModalLocation.vue';

const { locale } = useI18n()


const cart = useCartStore()
// const showModal = ref(false);

// onMounted(() => {
//   showModal.value = true;
// });


const changeLanguage = (lang) => {
  locale.value = lang
}

</script>

<style scoped>
</style>