<template>
    <MainLayout>
        
        <section class="flex md:relative gap-10 flex-col md:flex-row">
            <!-- Panel Lateral -->
            <FilterTemplate @updFilter="applyFiler"/>
            
            <!-- Resultado de Búsquedas -->                        
            <figure v-show="loading" class="m-auto"><img src="@/assets/images/loader.svg" alt="loading..."></figure>

            <section class="flex flex-col flex-1 gap-8" v-show="!loading">
                <div class="flex bg-red-500 m-auto p-20 rounded-lg" v-show="error">
                    <span class="text-lg text-white" v-text="errorMessage"></span>
                </div>
                <h3 class="text-sky-800 text-2xl" v-if="search">Resultado de búsqueda para {{ search }}</h3>
                <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div>
                <section class="flex flex-wrap gap-5 justify-items-center" v-if="results.length>0">                    
                    <CardListTemplate  v-for="(item, index) in results" :key="index" :item="item" class=""/>                    
                </section>
                <section class="flex mx-auto p-20" v-else>
                    <span class="text-lg">No hay productos para esta búsqueda</span>
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
import { ref,computed,onBeforeMount,watch } from 'vue'
import { useSearchStore } from '@/store/searchStore'

const loading = ref(true)
const route = useRoute()
const search = computed(() => route.params.keyword)
const searchStore = useSearchStore()
let error = ref(false)
let errorMessage = ref('Error al consultar los datos, por favor intente más tarde')

watch(search,  () => {
    loading.value = true
    getData()    
})



const results = ref([]);

const getData = async () => {
    try {
        results.value = await searchStore.getSearch()
        if(!results.value){
            error.value = true
            throw {msg: 'Error en la búsqueda',error:results.value}
        }    

        loading.value = false

    } catch (error) {
        console.log(error)
        throw error
    }    
}

onBeforeMount(async () => {
    await getData()
})



const applyFiler = () => {
    alert('filtro aplicado')
}

</script>


<style scoped>
</style>