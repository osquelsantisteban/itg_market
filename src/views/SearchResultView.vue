<template>
    <MainLayout>
        
        <section class="flex gap-5 flex-row">
        <!-- <section class="flex md:relative gap-10 flex-col md:flex-row"> -->
            <!-- Panel Lateral -->
            <!-- <FilterTemplate @updFilter="applyFiler"/> -->
            
            <!-- Resultado de Búsquedas -->                        
            <figure v-show="loading" class="m-auto"><img src="@/assets/images/loader.svg" alt="loading..."></figure>

            <section class="flex flex-col flex-1 gap-8" v-show="!loading">
                <div class="flex bg-red-500 m-auto p-20 rounded-lg" v-show="error">
                    <span class="text-lg text-white" v-text="errorMessage"></span>
                </div>
                <h3 class="text-sky-800 text-2xl" v-if="search">Resultado de búsqueda para {{ search }}</h3>
                <!-- <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div> -->
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
import { useRoute } from 'vue-router'
import { ref,computed,watch } from 'vue'
import { useSearchStore } from '@/store/searchStore'
import Swal from 'sweetalert2';

const loading = ref(true)
const route = useRoute()
const search = computed(() => route.params.keyword)
const searchStore = useSearchStore()
let error = ref(false)
let errorMessage = ref('Error al consultar los datos, por favor intente más tarde')

const results = ref([]);

const getData = async () => {
    try {
        results.value = await searchStore.getSearch()
        if(!results.value) throw {msg: 'Error en la búsqueda',error:results.value}

    } catch (error) {
        console.log(error)
        error.value = true;
        return Swal.fire({
            title: 'Error',
            text: `Error al cargar los datos`,
            icon: 'error',
            confirmButtonColor: '#3085d6',                            
        })
    }
    finally{
        loading.value = false
    }
}

watch(() => route.params, async () => {
    loading.value = true
    await getData();
    loading.value = false
}, { immediate: true });

</script>


<style scoped>
</style>