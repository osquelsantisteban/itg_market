<template>
    <MainLayout>
        
        <section class="flex md:relative gap-10 flex-col md:flex-row">
            <!-- Panel Lateral -->
            <FilterTemplate @updFilter="applyFiler"/>

            {{ results }}

            <!-- Resultado de Búsquedas -->
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
import FilterTemplate from '@/components/FilterTemplate.vue'
import { useRoute } from 'vue-router'
import { ref,computed,onBeforeMount } from 'vue'
import { useSearchStore } from '@/store/searchStore'
// import { useCartStore } from '@/store/cartStore'

const loading = ref(false)
const route = useRoute()
const search = computed(() => route.params.keyword)
const searchStore = useSearchStore()

const results = ref(null);

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

const applyFiler = () => {
    alert('filtro aplicado')
}

</script>


<style scoped>
</style>