<template>
    
    <article class="flex border border-gray-300 rounded-lg" :class="{'style-remove': isRemoving }">
        
        <figure class="flex items-center w-60 h-52 px-1 bg-cover overflow-hidden hover:cursor-pointer" @click="navigateToProduct">
            <img :src="props.item.src" alt="" class=" bg-slate-400 ">
        </figure>
        
        <div class="flex flex-col w-full p-5 border-l border-gray-300">
            <!-- Product Name -->
            <h4 class="text-gray-800 text-2xl my-2 hover:cursor-pointer text-left" @click="navigateToProduct">{{ props.item.name}}</h4>
            
            <!-- Description -->
            <div class="flex justify-between mt-2 mb-3">
                <p class="text-justify w-9/12 text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eligendi amet nobis veritatis. Ab delectus ad vero sed repudiandae placeat quasi! Sequi, eligendi earum. Hic expedita aspernatur odio quasi? Ipsa?</p>

                <span class="mr-10 text-2xl text-gray-800" 
                    :class="{'scale-110 transition-transform animate-spin': animationPrice}"
                    >
                    ${{ prodPrice(props.item.name) }}
                </span>
            </div>

            <!-- Category -->
            <div class="flex justify-start my-3">
                <router-link :to="{name: 'ListProduct',params: {keyword: 'category1'}}" ><!-- class="bg-amber-400 text-gray-800 px-5 py-2 rounded-lg w-32"  -->
                    <span class="text-sm text-amber-800 bg-amber-200 px-3 py-2 rounded-lg my-5">category</span>
                </router-link>                
            </div>
            
            <!-- Unity Price -->
            <div class="flex justify-start ml-6 my-3"></div>
                <div class="flex gap-4 w-full justify-between items-end">
                    <!-- Product -->
                    <div class="flex flex-col">
                        <h4 class="text-amber-500 text-lg">${{ props.item.price}}</h4>
                        <btn-add-less :item="props.item" @updCart="handleUpdCart"/>
                    </div>
                    <!-- Eliminar -->
                    <button class="bg-sky-800 px-5 py-2 rounded-lg text-white" @click="removeProduct(props.item.name)">Eliminar</button>
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
const animationPrice = ref(false)
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

const handleUpdCart = () => {
    animationPrice.value = true
    setTimeout(()=>{
        animationPrice.value = false
    },500)
}

</script>
<style scoped>
.style-remove {
    transition: opacity 0.5s ease-out;
    opacity: 0;
  }
  

</style>