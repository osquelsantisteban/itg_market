<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-14 items-center" v-if="filteredProducts.length">
           
           {{ productsAPI }}
           <section class="grid grid-cols-1 gap-8" v-for="(category, index) in filteredProducts" :key="index" >
                <!-- <section class="grid grid-cols-1 gap-8" v-for="(category,index) in categories" :key="index" > -->

                <!-- Link to Category -->
                <router-link :to="{name: 'ListProduct',params: { keyword: category }}" ><h3 class="text-sky-800 text-2xl font-bold capitalize text-left">{{ category.alias }}</h3></router-link>

                <!-- Carrusel -->                
                <swiper                
                    :modules="modules"
                    :slides-per-view="1"
                    :space-between="10"                
                    :keyboard="{
                        enabled: true,
                    }"
                    :scrollbar="true"
                    :autoplay="{
                        delay: 3500,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                      }"
                    :navigation="true"
                    class="w-full overflow-hidden"
                    :breakpoints="{
                        '640': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        },
                        '768': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        },
                        '800': {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        },
                        '1024': {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        },
                        '1360': {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        },
                        '1680': {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        },
                        '1920': {
                        slidesPerView: 5,
                        spaceBetween: 10,
                        },
                    }">
                    <!-- v-for="(slideContent, index) in productList" -->
                    <!-- v-for="(slideContent, index) in filterProductsByCategory(category.alias)" -->
                    {{ category.products }}
                    <swiper-slide
                        v-for="(product, index) in category.products" :key="index"
                        :virtualIndex="index"
                        class="pb-5 slide"
                    >
                        <CardListTemplate :item="product" :style="{transitionDelay: `${index * 0.8}s` }"/>
                    </swiper-slide>
                </swiper>

            </section>
        </section>
    </MainLayout>
</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay,Pagination,Keyboard,Scrollbar,Navigation,Virtual } from 'swiper/modules';

import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'
import {ref,onBeforeMount, computed} from 'vue'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
// import { useCartStore } from '@/store/cartStore'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

// const categories = ['category1','category2','category3','category4']

// const productList = [
//     {id: 1,name: 'title1', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 2,name: 'title2', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 3,name: 'title3', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 4,name: 'title4', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 5,name: 'title5', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 6,name: 'title6', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 7,name: 'title7', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 8,name: 'title8', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 9,name: 'title9', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 10,name: 'title10', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 11,name: 'title11', price: 123, src: require('@/assets/images/1.jpeg')},
//     {id: 12,name: 'title12', price: 123, src: require('@/assets/images/2.jpeg')},
//     {id: 13,name: 'title13', price: 123, src: require('@/assets/images/1.jpeg')}]

const modules = [Autoplay,Keyboard, Scrollbar, Pagination, Navigation, Virtual];


const categoriesAPI = ref([])
const productsAPI   = ref([])

onBeforeMount(async () => {
    try {

        [categoriesAPI.value, productsAPI.value] = await Promise.all([
            categoriesService.allCategories(),
            productsService.allProducts()
        ]);

        if(!categoriesAPI.value) throw {msg: 'Error en obtener las categorías',error: categoriesAPI.value}
        if(!productsAPI.value)   throw {msg: 'Error en obtener los productos' ,error: productsAPI.value}

    } catch (error) {
        console.error("Error al obtener las categorías o los productos: ", error);
        throw error
    }
});

// Recibe una categoria y devuelve de un listado de productos todos los relacionados
const filterProductsByCategory = (categoryAlias) => {
  return productsAPI.value.filter(product => {
    return product.marketplace_categories.some(category => category.alias === categoryAlias);
  });
};

// Se crea un obj con las categorias y productos
const filteredProducts = computed(() => {
    if (!categoriesAPI.value) return [];
    return categoriesAPI.value.map(category => ({
        ...category,
        products: filterProductsByCategory(category.id)
    }));
});

console.log(filteredProducts)

</script>


<style scoped>
/deep/ .swiper-button-next, 
/deep/ .swiper-button-prev {
  background-color: rgba(114,114,114, 1);
  border-radius: 9999px;
  width: 50px;
  height: 50px;
}

/deep/ .swiper-button-next:after, 
/deep/ .swiper-button-prev:after {
  color: #ffffff;
  font-size: 20px;
}

</style>