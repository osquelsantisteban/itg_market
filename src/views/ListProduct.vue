<template>
    <MainLayout>
        <section class="grid grid-cols-2 md:grid-cols-5 gap-5 justify-center items-center justify-items-center w-10/12 mx-auto">
            <CardListTemplate  v-for="(item, index) in items" :key="index" :item="item"/>
        </section>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import CardListTemplate from '@/components/CardListTemplate.vue'

const items = [
    {name: 'title1', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title2', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title3', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title4', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title5', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title6', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title7', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title8', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title9', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title10', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title11', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title12', price: 123, src: require('@/assets/images/1.jpeg')},
    {name: 'title13', price: 123, src: require('@/assets/images/1.jpeg')}]

</script>


<style scoped>
</style>