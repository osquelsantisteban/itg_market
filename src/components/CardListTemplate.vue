<template>
    <section class="border border-gray-300 flex flex-col rounded-lg items-center w-60">
        <article class="" >
            <figure class="flex items-center w-60 h-52 px-1 bg-cover overflow-hidden border-b border-gray-300">
                <img :src="props.item.src" alt="" class=" bg-slate-400 ">
            </figure>
            <figcaption class="flex flex-col ">
                <h4 class="text-gray-800 text-base my-2 hover:cursor-pointer" @click="navigateToProduct">{{ props.item.alias}}</h4>                
            </figcaption>
        </article>
        <div class="block w-full py-2">
            <div class="flex w-full justify-end pr-8"><h4 class="text-sky-800 text-lg">${{ props.item.price}}</h4></div>
            <div class="flex px-2 gap-4 justify-between w-full">
                <btn-add-less :item="props.item"/>
                <button class="bg-amber-400 px-5 py-2 rounded-lg text-gray-800" @click="navigateToCart()">Añadir</button>
            </div>
        </div>
    </section>
</template>

<script setup>

import BtnAddLess from './BtnAddLess'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cartStore'

const router = useRouter()
const cart = useCartStore()

const props = defineProps({
  item: Object
})

const addCarToStore = () => cart.addProduct(props.item)

const navigateToProduct = () => {
  router.push({ name: 'ProductDetail', params: { keyword: props.item.keyword } })
}

const navigateToCart = () => {
    addCarToStore()
    router.push({ name: 'ShoppingCart'})
}


</script>
