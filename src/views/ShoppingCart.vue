<template>
    <MainLayout>
        <div v-if="isList">
            <div v-for="(item, index) in shop.prod" :key="index" v-text="item.name +' '+item.count +' $'+item.price"></div>
        </div>
        <div v-else>No hay productos</div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import { useCarStore } from '@/store/carStore'

const shop = useCarStore()

const isList = () => {
    // No hay productos seleccionados
    if(!shop.prod) return false
    // No hay productos seleccionados
    if (shop.prod.length === 0) return false

    return true
}

</script>

<style scoped>
</style>