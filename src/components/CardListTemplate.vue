<template>
    <section class="border border-gray-300 flex flex-col rounded-b-lg items-center">
        <article class="" @click="navigateToProduct">
            <figure class="flex items-center ">
                <img :src="props.item.src" alt="" class="w-40 h-40 bg-cover bg-slate-400">
            </figure>
            <figcaption class="flex flex-col ">
                <h4 class="text-black text-base">{{ props.item.name}}</h4>
                <h4 class="text-yellow-500 text-lg">${{ props.item.price}}</h4>
            </figcaption>
        </article>
        <div class="flex m-2 gap-3">
            <btn-add-less :item="props.item"/>
            <button class="bg-red-500 px-5 py-2 rounded-lg text-white" @click="navigateToCart()">Comprar</button>
        </div>
    </section>
</template>

<script setup>

import BtnAddLess from './BtnAddLess'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '@/store/carStore'

const router = useRouter()
const cart = useCarStore()

const props = defineProps({
  item: Object
})

const addCarToStore = () => cart.addProduct(props.item)

const navigateToProduct = () => {
  router.push({ name: 'ProductDetail', params: { keyword: props.item.name } })
}

const navigateToCart = () => {
    addCarToStore()
    router.push({ name: 'ShoppingCart'})
}


</script>
