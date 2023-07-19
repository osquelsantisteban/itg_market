<template>
    <MainLayout>
        <div v-if="booking === 0" class="flex w-full gap-5">
            <div class="flex">No hay pedidos</div>            
        </div>
        <div v-else class="flex w-full gap-5">
            <div class="flex flex-col gap-5 w-full">
                <BookingListTemplate :item="booking"/>
                <BookingListTemplate :item="booking"/>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import BookingListTemplate from '@/components/BookingListTemplate.vue'
// import { useCartStore } from '@/store/cartStore'

// const cart = useCartStore()

const booking = [
    {id: 1, fecha: '06/07/2023', estado_entrega: 'entregado', precio: 333},
    {id: 2, fecha: '06/07/2023', estado_entrega: 'en proceso', precio: 333},
    {id: 3, fecha: '06/07/2023', estado_entrega: 'transportandose', precio: 333},
    {id: 4, fecha: '06/07/2023', estado_entrega: 'recibida', precio: 333},
    ]

</script>

<style scoped>
</style>