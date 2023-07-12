<template>
    <div class="flex flex-col w-full rounded-lg border border-gray-300 gap-5 items-center p-5 pb-10">
        Subtotal: {{ cart.totalPrice }}
        <button class="btn-clear" @click="clearCart()">Vaciar</button>
        <button class="btn-go-back" @click="goBack()">Seguir</button><!-- TODO Link to history back @click="" -->
        <button class="btn-buy" >Pagar</button><!-- TODO Link to buyView @click="" -->
    </div>
</template>

<script setup>

import { useCartStore } from '@/store/cartStore'
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = useCartStore()

const emit = defineEmits(['clearProducts']);
const clearCart = () => {
    emit('clearProducts');    
}

const goBack = () => {
    router.go(-1)
}

</script>
<style scoped>
.btn-go-back,.btn-buy{
    @apply px-3 py-2 bg-amber-400 text-gray-800 rounded-lg w-44 hover:bg-amber-400/80;
}

.btn-clear{
    @apply bg-cyan-800 rounded-lg text-white w-44 py-2 px-3 hover:bg-cyan-800/80;
}
</style>