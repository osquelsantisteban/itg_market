<template>
    <MainLayout>
        <article v-if="productsAPI[0]" class="flex w-full flex-col md:flex-row">
                        
                <figure class="flex w-full h-auto md:w-1/2">
                    <img :src="productsAPI[0].src" alt="">
                </figure>

                <!-- Detalles del Producto -->
                <div class="w-full md:w-5/12">
                    <!-- Title -->
                    <h3 class="text-justify font-bold text-2xl my-10 text-sky-800 capitalize">{{ productsAPI[0].alias }}</h3>

                    <!-- Price -->
                    <div class="flex gap-5 mb-10">
                        <div class="text-amber-400 font-bold text-3xl">${{ productsAPI[0].price }}</div>
                        <!-- <div class="line-through">${{ productsAPI[0].price_discount }}</div> -->
                    </div>

                    <!-- Descripcion -->
                    <div class="text-justify mb-10 grid grid-cols-1 gap-2">
                        <p class="font-bold">Descripcion: </p>
                        <p class="leading-7" v-text="productsAPI[0].description"></p>
                    </div>

                    <!-- Cart -->
                    <div class="flex flex-col px-2 gap-8 justify-start mb-10">

                        <!-- Caracteristicas -->
                        <div class="flex gap-5">
                            <!-- <router-link :to="{name: 'ListProduct',params: { category: product.category}}" class="text-sm text-amber-800 bg-amber-200 px-3 py-2 rounded-lg my-5" >{{ product.category }}</router-link> -->
                            <router-link :to="{name: 'ListProduct',params: { keyword: productsAPI[0].marketplace_categories[0].alias}}" class="text-sm text-amber-800 bg-amber-200 px-3 py-2 rounded-lg my-5" >{{ productsAPI[0].marketplace_categories[0].alias }}</router-link>
                        </div>
                            
                        <!-- Not Available -->
                        <div class="flex gap-5 items-center" v-if="!productsAPI[0].active">
                            <div class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg w-60" >No Disponible</div>
                            <button title="lo deseo"><i class="fas fa-heart text-red-500 fa-lg hover:scale-125"></i></button>
                        </div>                        

                        <!-- Available -->
                        <div class="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center" v-else>
                            
                            <btn-add-less :item="productsAPI[0]"/>
                            
                            <!-- Add Less -->
                            <button class="bg-amber-400 px-5 py-2 rounded-lg text-gray-800 w-full md:w-4/12" @click="navigateToCart" v-if="productsAPI[0].active">Añadir</button>
                            <!-- Add Less -->
                            <button class="bg-gray-300 px-5 py-2 rounded-lg text-gray-800 w-full md:w-4/12" :disabled="!productsAPI[0].active" v-else >Añadir</button>
                            <!-- Pagar -->
                            <button class="bg-amber-400 px-5 py-2 rounded-lg text-gray-800 w-full md:w-8/12" @click="goBuy">Pagar</button>
                        </div>

                    </div>


                </div>  
            
        </article>
    </MainLayout>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue'
import BtnAddLess from '@/components/BtnAddLess'
import { useRoute,useRouter } from 'vue-router'
import { productsService } from '@/services/products.service'
import {useAuthStore} from "@/store/authStore"

const authStore = useAuthStore();

const route = useRoute()
const router = useRouter()

// const productList = [
//     {id: 1,name: 'title1', category: 'category1', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 2,name: 'title2', category: 'category2', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 3,name: 'title3', category: 'category3', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
//     {id: 4,name: 'title4', category: 'category4', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 5,name: 'title5', category: 'category5', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
//     {id: 6,name: 'title6', category: 'category6', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 7,name: 'title7', category: 'category7', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
//     {id: 8,name: 'title8', category: 'category8', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 9,name: 'title9', category: 'category9', price_discount: 200, price: 123, src: require('@/assets/images/2.jpeg'), available: false},
//     {id: 10,name: 'title10', category: 'category10', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 11,name: 'title11', category: 'category11', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 12,name: 'title12', category: 'category12', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true},
//     {id: 13,name: 'title13', category: 'category13', price_discount: 200, price: 123, src: require('@/assets/images/1.jpeg'), available: true}]


// const product = ref([]);
const productsAPI   = ref([])

// onBeforeMount(() => {
    //   product.value = productList.find(el => el.name === productTitle);
    //   if (!product.value) {
//     router.push({ name: 'NotFound' });
//   }
// });

onBeforeMount(async () => {
    try {
        let keyword = route.params.keyword;

        [productsAPI.value] = await Promise.all([         
            productsService.getProductKeyword(keyword)
        ]);
        
        if(!productsAPI.value){
            router.push({ name: 'NotFound' });
            throw {msg: 'Error en obtener el producto' ,error: productsAPI.value}
        }
        

    } catch (error) {
        console.error("Error al obtener las categorías o los productos: ", error);
        throw error
    }
});


const navigateToCart = () => {
    
    router.push({ name: 'ShoppingCart'})
    
}


const goBuy = () => {
    if(!authStore.is_login)
        router.push({ name: 'Login'})
    else
        router.push({ name: 'BuyForm'})
}

</script>

<style scoped>
</style>