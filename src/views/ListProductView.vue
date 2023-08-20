<template>
    <MainLayout>
        
        <section class="flex gap-10 flex-row flex-wrap">      
            <!-- Panel Lateral -->
            <!-- <FilterTemplate @updFilter="applyFiler" @updCategory="applyCategory"/> -->
            
            <!-- Section de Productos -->
            
            <figure v-show="loading" class="m-auto"><img src="@/assets/images/loader.svg" alt="loading..."></figure>

            <section class="flex flex-col flex-1 gap-8" v-show="!loading">
                <div class="flex bg-red-500 m-auto p-20 rounded-lg" v-show="error">
                    <span class="text-lg text-white" v-text="errorMessage"></span>
                </div>
                <h3 class="text-sky-800 text-2xl capitalize" v-if="category">{{ category }}</h3>
                <!-- <div class="flex justify-end"><select class="w-24"><option value="">precio</option><option value="">más populares</option></select></div> -->
                <section class="flex flex-wrap gap-5 justify-items-center" v-if="productsAPI.length>0">                    
                    <CardListTemplate  v-for="(item, index) in productsAPI" :key="index" :item="item" class=""/>                    
                </section>
                <section class="flex mx-auto p-20" v-else>
                    <span class="text-lg">No hay productos para esta categoría</span>
                </section>
            </section>
        </section>
        
    </MainLayout>
</template>

<script setup>


import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'
// import FilterTemplate from '@/components/FilterTemplate.vue'
import { ref,onBeforeMount } from 'vue'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'

import { useRoute,useRouter } from 'vue-router'
import { computed } from 'vue'
// import { useSearchStore } from '@/store/searchStore'

// import { useCartStore } from '@/store/cartStore'


const route = useRoute()
const router = useRouter()
const loading = ref(true)
// const searchStore = useSearchStore()
let error = ref(false)
let errorMessage = ref('Error al consultar los datos, por favor intente más tarde')

const category = computed(() => route.params.keyword)
const categoriesAPI = ref([])
const productsAPI = ref([])

// const applyCategory = (item) => {
//     fetchData(item.alias);    
// }

onBeforeMount(() => {
  fetchData(category.value);
});

const fetchData = async (item) => {
  try {
    let params = {
      "type": "category",
      "value": item
    };

    [categoriesAPI.value, productsAPI.value] = await Promise.all([
      categoriesService.allCategories(),
      productsService.searchProduct(params)
    ]);
    loading.value = false

    if (!categoriesAPI.value) {
      error.value = true
      throw { msg: 'Error en obtener las categorías', error: categoriesAPI.value }
    }
    if (!productsAPI.value) {
      error.value = true
      throw { msg: 'Error en obtener las productos', error: categoriesAPI.value }
    }

    // Revisar si existe esa categoria sino enviar a not found
    let value = categoriesAPI.value.find(el => el.alias === category.value);
    if (!value) router.push({ name: 'NotFound' });

  } catch (error) {
    console.error("Error al obtener las categorías o los productos: ", error);
    throw error
  }
}

// const applyFiler = () => {
//     productsAPI.value.map(el => el.price >= searchStore.min && el.price <= searchStore.max)
// }

</script>


<style scoped>
.height_aside{

}

.input_form {
    @apply flex w-full border border-gray-300 px-5 py-2 placeholder-gray-400 text-sky-800 rounded-lg
    focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>