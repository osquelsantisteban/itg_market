<template>
    Productos en el Carrito - {{ cart.totalProducts }}

    <!-- <ModalLocation v-if="showModal" @close="showModal = false" />         -->
      
    <div class="grid grid-cols-1 w-10/12 items-center mx-auto">        
        <slot ></slot>
    </div>
</template>

<script setup>

import { useCartStore } from '@/store/cartStore'
// import { ref, onMounted } from 'vue';
// import ModalLocation from '@/components/ModalLocation.vue';

const cart = useCartStore()
// const showModal = ref(false);

// onMounted(() => {
//   showModal.value = true;
// });

</script>

<style scoped>
</style>