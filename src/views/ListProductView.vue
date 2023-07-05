<template>
    <MainLayout>
        Productos en el Carrito - {{ cart.totalProducts }}
        <section class="grid grid-cols-3 gap-14 align-middle">
            <aside class="bg-gray-400">
                filtro de precio
                <router-link 
                    :to="{name: 'ListProduct', params: { keyword: item }}" 
                    v-for="(item, index) in categories" 
                    :key="index" 
                    v-text="item"
                    class="block"
                >
                </router-link>
            </aside>
            <section class="grid grid-cols-1 gap-8 col-span-2">                
                <h3 class="text-red-500 text-2xl capitalize" v-if="category">{{ category }}</h3>
                <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div>
                <section class="grid grid-cols-2 md:grid-cols-3 gap-5  justify-items-center">
                    <CardListTemplate  v-for="(item, index) in productList" :key="index" :item="item" class=""/>
                </section>


            </section>
        </section>
    </MainLayout>
</template>

<script setup>


import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCartStore } from '@/store/cartStore'

const route = useRoute()
const category = computed(() => route.params.keyword)

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

const cart = useCartStore()



</script>


<style scoped>
</style>