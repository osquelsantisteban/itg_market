<template>
    <MainLayout>
        <div v-if="!bookings.length === 0" class="flex w-full gap-5">
            <div class="flex m-auto">No hay pedidos</div>            
        </div>
        <div v-else class="flex w-full gap-5">
            <div class="flex flex-col gap-5 w-full">
                <OrdersListTemplate 
                    v-for="(booking, index) in bookings" :key="index"
                    :item="booking"/>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import OrdersListTemplate from '@/components/OrdersListTemplate.vue'
import { bookingService } from '@/services/booking.service';
import {ref,onBeforeMount} from 'vue';
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const router = useRouter();
const bookings = ref([])

onBeforeMount(async () => {
    try {
        bookings.value = await bookingService.allByUser(authStore.token, authStore.is_login, router)

        if(!bookings.value) throw {msg: 'Error en cargar el historial de ordenes'}        
        
    } catch (error) {
        console.log(error)
        return Swal.fire({
            title: 'Error',
            text: `Error al cargar los datos de las ordenes`,
            icon: 'error',
            confirmButtonColor: '#3085d6',                            
        })
    }
})
</script>

<style scoped>
</style>