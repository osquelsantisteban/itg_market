<template>
    <div class="flex flex-col w-full rounded-lg border border-gray-300 gap-5 items-center p-5 pb-10">
        Subtotal: {{ cart.totalPrice }}
        <button class="bg-cyan-800 rounded-lg text-white w-44 py-2" @click="clearCart()">Vaciar</button>
        <button class="rounded-lg text-gray-800 bg-amber-400 w-44 py-2" @click="goBack()">Seguir</button><!-- TODO Link to history back @click="" -->
        <button class="rounded-lg text-gray-800 bg-amber-400 w-44  py-2" >Pagar</button><!-- TODO Link to buyView @click="" -->
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