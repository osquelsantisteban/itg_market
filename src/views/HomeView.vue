<template>
    <MainLayout>

        
        <section class="grid grid-cols-1 gap-14 items-center" v-if="filteredProducts.length">
            <!-- Iconos -->
            <section class="flex flex-wrap">
                <figure><img src="@/assets/images/icono_ASEO_azul.svg" alt="icono ASEO"></figure>
                <figure><img src="@/assets/images/icono_CARNICO_azul.svg" alt="icono CARNICO"></figure>
                <figure><img src="@/assets/images/icono_CERVEZA_azul.svg" alt="icono CERVEZA"></figure>
                <figure><img src="@/assets/images/icono_CONFITURA_azul.svg" alt="icono CONFITURA"></figure>
                <figure><img src="@/assets/images/icono_LACTEOS_azul.svg" alt="icono LACTEOS"></figure>
                <figure><img src="@/assets/images/icono_PASTAS_azul.svg" alt="icono PASTAS"></figure>
                <figure><img src="@/assets/images/icono_UTILEL_HOGAR_azul.svg" alt="icono UTILEL HOGAR"></figure>
            </section>
           
           <!-- {{ filteredProducts }}    -->        
            <div class="grid grid-cols-1 gap-8" v-for="(category, index) in filteredProducts" :key="index">                          

                    <!-- Link to Category -->                
                    <router-link :to="{name: 'ListProduct',params: { keyword: category.alias }}" >
                        <h3 class="text-sky-800 text-2xl font-bold capitalize text-left">{{ category.alias }}</h3>
                    </router-link>

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
                        

                        <swiper-slide
                            v-for="(product, index) in category.products" :key="index"
                            :virtualIndex="index"
                            class="pb-5 slide"
                        >
                            <CardListTemplate :item="product" :style="{transitionDelay: `${index * 0.8}s` }"/>
                        </swiper-slide>

                    </swiper>

                </div>
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
const filterProductsByCategory = (categoryId) => {
  return productsAPI.value.filter(product => {
    return product.marketplace_categories.some(category => category.id === categoryId);
  });
};

// Se crea un obj con las categorias y productos
const filteredProducts = computed(() => {
    if (!categoriesAPI.value) return [];
    return categoriesAPI.value
    .map(category => ({
        ...category,
        products: filterProductsByCategory(category.id)
    }))
    .filter(category => category.products.length > 0);
});

// console.log(filteredProducts)

</script>


<style scoped>
:deep() .swiper-button-next, 
:deep() .swiper-button-prev {
  background-color: rgba(114,114,114, 1);
  border-radius: 9999px;
  width: 50px;
  height: 50px;
}

:deep() .swiper-button-next:after, 
:deep() .swiper-button-prev:after {
  color: #ffffff;
  font-size: 20px;
}

</style>