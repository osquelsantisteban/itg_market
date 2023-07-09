<template>
    
    <article class="flex border border-gray-300 rounded-lg" :class="{'style-remove': isRemoving }">
        
        <figure class="flex items-center w-60 h-52 px-1 bg-cover overflow-hidden hover:cursor-pointer" @click="navigateToProduct">
            <img :src="props.item.src" alt="" class=" bg-slate-400 ">
        </figure>
        
        <div class="block w-full p-5 border-l border-gray-300">
            <h4 class="text-gray-800 text-2xl my-2 hover:cursor-pointer text-left" @click="navigateToProduct">{{ props.item.name}}</h4>
            <div class="flex justify-between">
                <p class="text-justify w-9/12 text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eligendi amet nobis veritatis. Ab delectus ad vero sed repudiandae placeat quasi! Sequi, eligendi earum. Hic expedita aspernatur odio quasi? Ipsa?</p>
                <span class="mr-10 text-2xl text-gray-800">${{ prodPrice(props.item.name) }}</span>
            </div>
            <div class="flex justify-start mt-5 ml-6 mb-3"><h4 class="text-yellow-500 text-lg">${{ props.item.price}}</h4></div>
            <div class="flex gap-4 w-full justify-between">
                <div>
                    <btn-add-less :item="props.item"/>
                </div>
                <button class="bg-cyan-800 px-5 py-2 rounded-lg text-white" @click="removeProduct(props.item.name)">Eliminar</button>
            </div>
        </div>
    </article>

</template>

<script setup>

import BtnAddLess from './BtnAddLess'
import { ref,defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cartStore'

const router = useRouter()
const cart = useCartStore()
const { prodPrice } = storeToRefs(cart)
const isRemoving = ref(false)

const props = defineProps({
  item: Object
})

const navigateToProduct = () => {
    router.push({ name: 'ProductDetail', params: { keyword: props.item.name } })
}

// const addCarToStore = () => cart.addProduct(props.item)
/* const navigateToCart = () => {
    addCarToStore()
    router.push({ name: 'ShoppingCart'})
} */

// const removeProduct = (prodId) => { cart.deleteAllProductsOf(prodId) }
const removeProduct = (prodId) => {
  isRemoving.value = true
  setTimeout(() => {
    cart.deleteAllProductsOf(prodId)
    isRemoving.value = false
  }, 1000)
}

console.log(removeProduct)

</script>
<style scoped>
.style-remove {
    transition: opacity 1s ease-in-out;
    opacity: 0;
  }
  

</style>