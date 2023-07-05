<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <section class="grid grid-cols-1 gap-8" v-for="(category,index) in categories" :key="index" >
                <h3 class="flex w-10/12 text-red-500 text-base items-start">{{ category }}</h3>
                <swiper                
                    :modules="modules"
                    :slides-per-view="1"
                    :breakpoints="{
                        '640': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        },
                        '768': {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        },
                        '1024': {
                        slidesPerView: 5,
                        spaceBetween: 50,
                        },
                    }"
                    :space-between="20"                
                    :keyboard="{
                        enabled: true,
                    }"
                    :scrollbar="true"
                    :navigation="true"                
                    @swiper="setSwiperRef"
                    class="w-10/12"
                >
                    <swiper-slide
                        v-for="(slideContent, index) in productList"
                        :key="index"
                        :virtualIndex="index"
                    >
                        <CardListTemplate :item="slideContent"/>
                    </swiper-slide>
                </swiper>

            </section>
        </section>
        <!-- <section class="grid grid-cols-2 md:grid-cols-5 gap-5 justify-center items-center justify-items-center w-10/12 mx-auto">
            <CardListTemplate  v-for="(item, index) in productList" :key="index" :item="item"/>
        </section> -->
    </MainLayout>
</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Keyboard, Scrollbar, Navigation, Virtual } from 'swiper/modules';

import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

const categories = ['category1','category2','category3','category4']

const productList = [
    {id: 1,name: 'title1', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 2,name: 'title2', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 3,name: 'title3', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 4,name: 'title4', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 5,name: 'title5', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 6,name: 'title6', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 7,name: 'title7', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 8,name: 'title8', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 9,name: 'title9', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 10,name: 'title10', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 11,name: 'title11', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 12,name: 'title12', price: 123, src: require('@/assets/images/1.jpeg')},
    {id: 13,name: 'title13', price: 123, src: require('@/assets/images/1.jpeg')}]

const modules = [Keyboard, Scrollbar, Pagination, Navigation, Virtual];

let swiperRef = null;
const setSwiperRef = (swiper) => {
    swiperRef = swiper;
    console.log(swiperRef);
};


</script>


<style scoped>
</style>