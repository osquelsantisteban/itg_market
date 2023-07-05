<template>
    Productos en el Carrito - {{ cart.totalProducts }}

    <div class="grid grid-cols-1 w-10/12 items-center mx-auto">        
        <slot ></slot>
    </div>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore'
const cart = useCartStore()

</script>

<style scoped>
</style>