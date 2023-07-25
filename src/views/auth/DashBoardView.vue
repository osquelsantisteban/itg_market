<template>
    <MainLayout>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 bg-white">            
            
            <!-- Órdenes -->
            <router-link :to="{name: 'Orders'}">
                <article class="group flex items-center bg-white rounded-lg p-4 gap-4 border border-sky-800 hover:scale-110 transition-all duration-200">
                    <figure class="bg-sky-800 rounded-lg h-12 w-12 text-white flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                        <i class="fas fa-clipboard-list"></i>
                    </figure>
                    <figcaption class="text-sky-800 text-lg group-hover:opacity-80 transition-opacity duration-200">Órdenes</figcaption>
                </article>
            </router-link>
            
            <!-- Datos Personales -->
            <router-link to="">
                <article class="group flex items-center bg-white rounded-lg p-4 gap-4 border border-sky-800 hover:scale-110 transition-all duration-200">
                    <figure class="bg-sky-800 rounded-lg h-12 w-12 text-white flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                        <i class="fas fa-clipboard-list"></i>
                    </figure>
                    <figcaption class="text-sky-800 text-lg group-hover:opacity-80 transition-opacity duration-200">Datos Personales</figcaption>
                </article>
            </router-link>
            
            <!-- Lista de Deseos -->
            <router-link to="">
                <article class="group flex items-center bg-white rounded-lg p-4 gap-4 border border-sky-800 hover:scale-110 transition-all duration-200">
                    <figure class="bg-sky-800 rounded-lg h-12 w-12 text-white flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                        <i class="fas fa-clipboard-list"></i>
                    </figure>
                    <figcaption class="text-sky-800 text-lg group-hover:opacity-80 transition-opacity duration-200">Lista de Deseos</figcaption>
                </article>
            </router-link>

            
            <!-- Beneficiarios -->
            <router-link to="">
                <article class="group flex items-center bg-white rounded-lg p-4 gap-4 border border-sky-800 hover:scale-110 transition-all duration-200">
                    <figure class="bg-sky-800 rounded-lg h-12 w-12 text-white flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                        <i class="fas fa-clipboard-list"></i>
                    </figure>
                    <figcaption class="text-sky-800 text-lg group-hover:opacity-80 transition-opacity duration-200">Beneficiarios</figcaption>
                </article>
            </router-link>
            
            <!-- Método de Pago -->
            <router-link to="">
                <article class="group flex items-center bg-white rounded-lg p-4 gap-4 border border-sky-800 hover:scale-110 transition-all duration-200">
                    <figure class="bg-sky-800 rounded-lg h-12 w-12 text-white flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                        <i class="fas fa-clipboard-list"></i>
                    </figure>
                    <figcaption class="text-sky-800 text-lg group-hover:opacity-80 transition-opacity duration-200">Método de Pago</figcaption>
                </article>
            </router-link>
        </section>
        
    </MainLayout>
</template>
  
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
  

</script>
<style scoped>
</style>