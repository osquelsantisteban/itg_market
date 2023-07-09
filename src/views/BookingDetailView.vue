<template>
    <MainLayout>
        Booking Detail
        {{ booking }}
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import { useNotFound } from '@/composables/not_found'

// import { useCartStore } from '@/store/cartStore'

// const cart = useCartStore()

const bookings = [
    {id: 1, fecha: '06/07/2023', estado_entrega: 'entregado', precio: 333},
    {id: 2, fecha: '06/07/2023', estado_entrega: 'en proceso', precio: 333},
    {id: 3, fecha: '06/07/2023', estado_entrega: 'transportandose', precio: 333},
    {id: 4, fecha: '06/07/2023', estado_entrega: 'recibida', precio: 333},
    ]

const { booking } = useNotFound(bookings,'id');
</script>

<style scoped>
</style>