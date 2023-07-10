<template>
    <MainLayout>
        <article v-if="product">
            
            <section class="flex">
                <figure class="flex flex-1">
                    <img :src="product.src" alt="">
                </figure>

                <!-- Detalles del Producto -->
                <div class="w-5/12">
                    <!-- Title -->
                    <h3 class="text-justify font-bold text-2xl my-10 text-cyan-800 capitalize">{{ product.name }}</h3>

                    <!-- Price -->
                    <div class="flex gap-5 mb-10">
                        <div class="text-amber-400 font-bold text-3xl">${{ product.price }}</div>
                        <div class="line-through">${{ product.price_discount }}</div>
                    </div>

                    <!-- Descripcion -->
                    <div class="text-justify mb-10 grid grid-cols-1 gap-2">
                        <p class="font-bold">Descripcion: </p>
                        <p class="leading-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laboriosam tenetur tempora quae enim! Delectus consectetur, laudantium ad nulla obcaecati corporis facere officia fugit similique esse aperiam veniam quia ea.</p>
                    </div>

                    <!-- Cart -->
                    <div class="flex flex-col px-2 gap-8 justify-start mb-10">

                        <!-- Caracteristicas -->
                        <div class="flex flex-col gap-5">
                            <router-link :to="{name: 'ListProduct',params: { category: product.category}}" class="bg-amber-400 text-gray-800 px-5 py-2 rounded-lg w-32" >{{ product.category }}</router-link>
                        </div>
                            
                        <!-- Not Available -->
                        <div class="flex gap-5 items-center" v-if="!product.available">
                            <div class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg w-60" >No Disponible</div>
                            <div title="lo deseo">❤️</div>
                        </div>                        

                        <!-- Available -->
                        <div class="flex gap-8 justify-between" v-else>
                            <!-- Add Less -->
                            <btn-add-less :item="product"/>
                            <button class="bg-amber-400 px-5 py-2 rounded-lg text-gray-800 w-2/12" @click="navigateToCart()" v-if="product.available">Añadir</button>
                            <!-- Add Less -->
                            <button class="bg-gray-300 px-5 py-2 rounded-lg text-gray-800 w-4/12" :disabled="!product.available" v-else >Añadir</button>
                            <!-- Pagar -->
                            <button class="bg-amber-400 px-5 py-2 rounded-lg text-gray-800 w-8/12">Pagar</button>
                        </div>

                    </div>


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
    {id: 1,name: 'title1', category: 'category1', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 2,name: 'title2', category: 'category2', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 3,name: 'title3', category: 'category3', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 4,name: 'title4', category: 'category4', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 5,name: 'title5', category: 'category5', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 6,name: 'title6', category: 'category6', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 7,name: 'title7', category: 'category7', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 8,name: 'title8', category: 'category8', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 9,name: 'title9', category: 'category9', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
    {id: 10,name: 'title10', category: 'category10', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 11,name: 'title11', category: 'category11', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 12,name: 'title12', category: 'category12', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
    {id: 13,name: 'title13', category: 'category13', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true}]


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