<template>
    <MainLayout>
        <article v-if="product">
            
            <section class="grid grid-cols-2">
                <figure>
                    <img :src="product.src" alt="">
                </figure>
                <div class="">
                    <!-- Title -->
                    <h3 class="text-justify font-bold text-lg my-10">{{ product.name }}</h3>

                    <!-- Price -->
                    <div class="text-justify text-red-500 font-bold text-3xl mb-10">
                        ${{ product.price }}
                    </div>

                    <!-- Descripcion -->
                    <div class="text-justify mb-10 grid grid-cols-1 gap-2">
                        <p class="font-bold">Descripcion: </p>
                        <p class="leading-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laboriosam tenetur tempora quae enim! Delectus consectetur, laudantium ad nulla obcaecati corporis facere officia fugit similique esse aperiam veniam quia ea.</p>
                    </div>

                    <!-- Cart -->
                    <div class="flex px-2 gap-8 justify-start mb-10">
                        <div class="flex px-2 gap-8 justify-start">
                            <btn-add-less :item="product"/>
                            <button class="bg-red-500 px-5 py-2 rounded-lg text-white" @click="navigateToCart()" v-if="product.available">Añadir</button>
                            <button class="bg-gray-300 px-5 py-2 rounded-lg text-gray-800" :disabled="!product.available" v-else >Añadir</button>
                        </div>

                        <div class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg w-60" v-if="!product.available">No Disponible</div>
                        <div class="bg-green-400 text-white px-5 py-2 rounded-lg w-60" v-else>Disponible</div>
                    </div>

                    <!-- Pagar -->
                    <button class="bg-red-500 p-5 rounded-lg text-white w-8/12 mx-auto">Pagar</button>

                </div>  
            </section>
        </article>
    </MainLayout>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue'
import BtnAddLess from '@/components/BtnAddLess'
import { useRoute,useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()

const productList = [
    {id: 1,name: 'title1', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 2,name: 'title2', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 3,name: 'title3', price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 4,name: 'title4', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 5,name: 'title5', price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 6,name: 'title6', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 7,name: 'title7', price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 8,name: 'title8', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 9,name: 'title9', price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 10,name: 'title10', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 11,name: 'title11', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 12,name: 'title12', price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 13,name: 'title13', price: 123, src: require('@/assets/images/1.jpeg'), available: true}]


const product = ref(null);
onBeforeMount(() => {
  let productTitle = route.params.keyword;
  product.value = productList.find(el => el.name === productTitle);
  if (!product.value) {
    router.push({ name: 'NotFound' });
  }
});


</script>

<style scoped>
</style>