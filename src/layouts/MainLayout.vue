<template>
    Productos en el Carrito - {{ cart.totalProducts }}

    <Modal v-if="showModal" @close="showModal = false">
        <h2>Modal</h2>
        <button @click="showModal = false">Cerrar</button>
    </Modal>
      
    <div class="grid grid-cols-1 w-10/12 items-center mx-auto">        
        <slot ></slot>
    </div>
</template>

<script setup>

import { useCartStore } from '@/store/cartStore'
import { ref, onMounted } from 'vue';
import Modal from '@/components/ModalLocation.vue';

const cart = useCartStore()
const showModal = ref(false);

onMounted(() => {
  showModal.value = true;
});

</script>

<style scoped>
</style>