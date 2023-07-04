<template>
    <section class="border border-gray-300 flex flex-col gap-5 rounded-b-lg">
        <article class="" @click="navigateToProduct">
            <figure class="flex items-center ">
                <img :src="props.item.src" alt="" class="w-40 h-40 bg-cover bg-slate-400">
            </figure>
            <figcaption>
                <h4 class="text-black text-lg">{{ props.item.name}}</h4>
                <h4 class="text-yellow-400 text-lg">${{ props.item.price}}</h4>
            </figcaption>
        </article>
        <btn-add-less/>
    </section>
</template>

<script setup>

import BtnAddLess from './BtnAddLess'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define la prop item
const props = defineProps({
  item: Object
})

const navigateToProduct = () => {
  router.push({ name: 'ProductDetail', params: { keyword: props.item.name } })
}


</script>
