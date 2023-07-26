<template>
    <div class="flex items-center justify-between rounded-lg">
        <button class="rounded-l-lg bg-gray-300 w-8" @click="lessCarToStore()">-</button>
        <div class="w-8 text-gray-800" :class="{'scale-150 transition-transform animate-spin': animationPrice}">{{ count }}</div>
        <button class="rounded-r-lg bg-gray-300 w-8" @click="addCarToStore()">+</button>
    </div>
</template>

<script setup>

import { useCartStore } from '@/store/cartStore'
import { ref,defineProps,defineEmits,computed } from 'vue'

const emits = defineEmits(['updCart'])
const shop = useCartStore()
const animationPrice = ref(false)
const props = defineProps({
  item: Object
})

const addCarToStore = () => {
  handleUpdCart()
  shop.addProduct(props.item)
  emits('updCart')
}
const lessCarToStore = () => {
  handleUpdCart()
  shop.removeProduct(props.item)
  emits('updCart')
}

const handleUpdCart = () => {
    animationPrice.value = true
    setTimeout(()=>{
        animationPrice.value = false
    },500)
}

const count = computed(() => {
  const product = shop.prods.find(product => product.id === props.item.id)
  return product ? product.count : 0
})
</script>