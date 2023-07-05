<template>
    <div class="w-full flex items-center justify-between rounded-lg">
        <button class="rounded-l-lg bg-gray-300 w-8" @click="lessCarToStore()">-</button>
        <div class="w-8">{{ count }}</div>
        <button class="rounded-r-lg bg-gray-300 w-8" @click="addCarToStore()">+</button>
    </div>
</template>

<script setup>

import { useCartStore } from '@/store/cartStore'
import { defineProps,computed } from 'vue'

const shop = useCartStore()
const props = defineProps({
  item: Object
})

const addCarToStore = () => shop.addProduct(props.item)
const lessCarToStore = () => shop.removeProduct(props.item)

const count = computed(() => {
  const product = shop.prod.find(product => product.id === props.item.id)
  return product ? product.count : 0
})
</script>