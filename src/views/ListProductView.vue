<template>
    <MainLayout>
        
        <section class="flex md:relative gap-10 flex-col md:flex-row">
            <!-- Panel Lateral -->
            <FilterTemplate @updFilter="applyFiler()"/>
            
            <!-- Section de Productos -->
            <section class="flex flex-col flex-1 gap-8">                
                <h3 class="text-sky-800 text-2xl capitalize" v-if="category">{{ category }}</h3>
                <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div>
                <section class="flex flex-wrap gap-5 justify-items-center">
                    <CardListTemplate  v-for="(item, index) in productList" :key="index" :item="item" class=""/>
                </section>
            </section>
        </section>
        
    </MainLayout>
</template>

<script setup>


import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'
import FilterTemplate from '@/components/FilterTemplate.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'
// import { useCartStore } from '@/store/cartStore'

const route = useRoute()
const category = computed(() => route.params.keyword)

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

// const cart = useCartStore()

// TODO add loading
// TODO validar la ruta con las categorias de la BD sino existe mandar a not_found

const applyFiler = () => {
    alert('filtro aplicado')
}

</script>


<style scoped>
.height_aside{

}

.input_form {
    @apply flex w-full border border-gray-300 px-5 py-2 placeholder-gray-400 text-sky-800 rounded-lg
    focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>