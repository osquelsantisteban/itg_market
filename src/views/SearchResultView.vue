<template>
    <MainLayout>
        
        <section class="flex md:relative gap-10 flex-col md:flex-row">
            <!-- Panel Lateral -->
            <aside class="bg-white md:h-[80vh] md:sticky top-20 left-0 w-full md:w-4/12 mt-10 border border-sky-800 rounded-lg">
                <div class="flex flex-col items-center gap-5 p-5">
                    <h4 class="">Filtro de precios</h4>
                    <button class="w-8/12 bg-amber-400 px-5 py-2 rounded-lg text-gray-800" @click="searchStore.clearFilter()">Limpiar Filtro</button>
                    
                    <div class="">
                        <div class="flex gap-4 md:w-7/12 mx-auto mb-4">
                            <input type="number" class="input_form" placeholder="$ Min" v-model="searchStore.min">
                            <input type="number" class="input_form" placeholder="$ Max" v-model="searchStore.max">
                        </div>
                        <button class="bg-sky-800 text-white w-7/12 rounded-lg py-2 px-3">Aplicar</button>
                    </div>

                    <h4 class="mt-5">Categorías</h4>
                    <ul class="">
                        <li 
                            v-for="(item, index) in categories" 
                            :key="index" 
                            class="block"
                            >
                            <router-link 
                                :to="{name: 'ListProduct', params: { keyword: item }}" 
                                v-text="item"
                            >
                            </router-link>
                        </li>
                    </ul>
                </div>
            </aside>

            {{ results }}

            <!-- Section de Productos -->
            <section class="flex flex-col flex-1 gap-8">                
                <h3 class="text-sky-800 text-2xl" v-if="search">Resultado de búsqueda para {{ search }}</h3>
                <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div>

                <figure v-show="!loading" class="mx-auto"><img src="@/assets/images/loader.svg" alt="loading"></figure>
                <section v-show="loading" class="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
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
import { ref,computed,onBeforeMount } from 'vue'
import { useSearchStore } from '@/store/searchStore'
// import { useCartStore } from '@/store/cartStore'

const loading = ref(false)
const route = useRoute()
const search = computed(() => route.params.keyword)
const searchStore = useSearchStore()

const results = ref(null);
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

// const cart = useCartStore()
onBeforeMount(async () => {

    try {

        results.value = await searchStore.getSearch()
        if(!results.value) throw {msg: 'Error en la búsqueda',error:results.value}
        loading.value = true

    } catch (error) {
        console.log(error)
        throw error
    }

})



</script>


<style scoped>
.height_aside{

}

.input_form {
    @apply flex w-full border border-gray-300 px-5 py-2 placeholder-gray-400 text-sky-800 rounded-lg
    focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>