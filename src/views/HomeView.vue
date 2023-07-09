<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-14 items-center">
            
            <section class="grid grid-cols-1 gap-8" v-for="(category,index) in categories" :key="index" >
                <h3 class="text-cyan-800 text-2xl font-bold capitalize text-left">{{ category }}</h3>
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
                    class="w-full"
                    :breakpoints="{
                        '640': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        },
                        '768': {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        },
                        '1024': {
                        slidesPerView: 5,
                        spaceBetween: 10,
                        },
                    }">
                    <swiper-slide
                        v-for="(slideContent, index) in productList"
                        :key="index"
                        :virtualIndex="index"
                        class="pb-5 slide"
                    >
                        <CardListTemplate :item="slideContent" :style="{transitionDelay: `${index * 0.8}s` }"/>
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

// import { useCartStore } from '@/store/cartStore'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

const categories = ['category1','category2','category3','category4']

const productList = [
    {id: 1,name: 'title1', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 2,name: 'title2', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 3,name: 'title3', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 4,name: 'title4', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 5,name: 'title5', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 6,name: 'title6', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 7,name: 'title7', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 8,name: 'title8', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 9,name: 'title9', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 10,name: 'title10', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 11,name: 'title11', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 12,name: 'title12', price: 123, src: require('@/assets/images/2.jpeg')},
    {id: 13,name: 'title13', price: 123, src: require('@/assets/images/1.jpeg')}]

const modules = [Autoplay,Keyboard, Scrollbar, Pagination, Navigation, Virtual];
// const cart = useCartStore()


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