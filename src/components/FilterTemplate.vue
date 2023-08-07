<template>
    <aside class="bg-white md:h-[80vh] md:sticky top-20 left-0 w-full md:w-4/12 mt-10 overflow-y-auto overflow-hidden border border-sky-800 rounded-lg">
        <div class="flex flex-col items-center gap-5 p-5">
            <h4 class="">Filtro de precios</h4>
            <button class="w-8/12 bg-amber-400 px-5 py-2 rounded-lg text-gray-800" @click="clear()">Limpiar Filtro</button>
            
            <div class="">
                <div class="flex gap-4 md:w-7/12 mx-auto mb-4">
                    <input type="number" class="input_form" placeholder="$ Min" v-model="searchStore.min">
                    <input type="number" class="input_form" placeholder="$ Max" v-model="searchStore.max">
                </div>
                <button class="bg-sky-800 text-white w-7/12 rounded-lg py-2 px-3" @click="emitUpdateFilter">Aplicar</button>
            </div>

            <h4 class="mt-5">Categorías</h4>
            <ul class="">
                <li 
                    v-for="(item, index) in categoriesAPI" 
                    :key="index" 
                    class="block"
                    >
                    <router-link 
                        :to="{name: 'ListProduct', params: { keyword: item.alias }}" 
                        v-text="item.alias"
                        @click="emitUpdateCategory(item)"
                    >
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref,onBeforeMount,defineEmits } from 'vue'
import { useSearchStore } from '@/store/searchStore'

import { categoriesService } from '@/services/categories.service'

const categoriesAPI = ref([])

const searchStore = useSearchStore()

const emits = defineEmits(['updFilter','updCategory'])

const emitUpdateFilter = () => {
  emits('updFilter')
}

const emitUpdateCategory = (item) => {
  emits('updCategory',item)
}

const clear = () => {
    searchStore.clearFilter()
    emits('updFilter')
}


onBeforeMount(async () => {
    try {

        [categoriesAPI.value] = await Promise.all([
            categoriesService.allCategories(),
        ]);

        if(!categoriesAPI.value) throw {msg: 'Error en obtener las categorías',error: categoriesAPI.value}

    } catch (error) {
        console.error("Error al obtener las categorías o los productos: ", error);
        throw error
    }
});
</script>

<style scoped>
.input_form {
    @apply flex w-full border border-gray-300 px-3 py-2 placeholder-gray-400 text-sky-800 text-sm rounded-lg
    focus:ring-1 focus:border-sky-600 focus:outline-none;
}
</style>