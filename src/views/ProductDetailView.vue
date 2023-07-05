<template>
    <MainLayout>
        <article>
            
            <section class="grid grid-cols-2">
                <figure>
                    <img :src="productList.find(el => el.name === productTitle)?.src" alt="">
                </figure>
                <div class="">
                    <!-- Title -->
                    <h3 class="text-justify font-bold text-lg my-10">{{ productTitle }}</h3>

                    <!-- Price -->
                    <div class="text-justify text-red-500 font-bold text-3xl mb-10">
                        ${{ productList.find(el => el.name === productTitle)?.price }}
                    </div>

                    <!-- Descripcion -->
                    <div class="text-justify mb-10 grid grid-cols-1 gap-5">
                        <p class="font-bold">Descripcion: </p>
                        <p class="leading-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laboriosam tenetur tempora quae enim! Delectus consectetur, laudantium ad nulla obcaecati corporis facere officia fugit similique esse aperiam veniam quia ea.</p>
                    </div>

                    <!-- Cart -->
                    <div class="flex px-2 gap-8 justify-start w-44 mb-10">
                        <btn-add-less :item="productList.find(el => el.name === productTitle)"/>
                        <button class="bg-red-500 px-5 py-2 rounded-lg text-white" @click="navigateToCart()">Añadir</button>
                    </div>

                    <!-- Pagar -->
                    <button class="bg-red-500 p-5 rounded-lg text-white w-8/12 mx-auto">Pagar</button>

                </div>  
            </section>
        </article>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import BtnAddLess from '@/components/BtnAddLess'
import { useRoute } from 'vue-router'

const route = useRoute()
const productTitle = route.params.keyword

const productList = [
    {id: 1,name: 'title1', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 2,name: 'title2', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 3,name: 'title3', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 4,name: 'title4', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 5,name: 'title5', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 6,name: 'title6', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 7,name: 'title7', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 8,name: 'title8', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 9,name: 'title9', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 10,name: 'title10', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 11,name: 'title11', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 12,name: 'title12', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 13,name: 'title13', price: 123, src: require('@/assets/images/1.jpeg')}]


</script>

<style scoped>
</style>