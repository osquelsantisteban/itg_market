<template>
    
        <article class="flex justify-between rounded-lg border border-gray-300 p-5 w-full ">
            
            <section class="flex flex-col w-11/12 px-1">
                
                <div class="flex justify-between w-full">
                    <!-- Orden -->
                    <span class="uppercase text-lg md:text-2xl text-gray-800">B321321</span>
                    <!-- Fecha -->
                    <div class="flex flex-col mb-2">
                        <span class="uppercase text-sm md:text-base text-gray-800">24/07/2023</span>
                        <span class="uppercase text-[8px] md:text-xs text-gray-800">08:30:58 am</span>
                    </div>
                </div>
                
                <section class="flex justify-between w-full">
                    <!-- Status -->
                    <span class="uppercase text-xs md:text-base text-gray-800">Lista para enviar</span>
                    
                    <!-- Price -->
                    <span class="uppercase text-lg md:text-2xl text-gray-800">$ 321</span>
                </section>

                <!-- Detail -->
                <section class="flex flex-col items-start mt-5" v-show="isDetail">
                    
                    <span class="text-sm md:text-lg">Lista de productos</span>
                    <hr class="w-full my-2" style="dashed">
                    <ul class="flex flex-col items-start w-full">
                        <li class="flex w-full justify-between items-center gap-5 py-2">
                            <span class="text-sm md:text-base">Producto 1</span>
                            <hr class="flex-grow m-2">
                            <span>$0.33</span>
                        </li>
                        <li class="flex w-full justify-between items-center gap-5 py-2">
                            <span class="text-sm md:text-base">Producto 2</span>
                            <hr class="flex-grow m-2">
                            <span>$0.33</span>
                        </li>
                        <li class="flex w-full justify-between items-center gap-5 py-2">
                            <span class="text-sm md:text-base">Producto 4</span>
                            <hr class="flex-grow m-2">
                            <span>$0.33</span>
                        </li>
                        <li class="flex w-full justify-between items-center gap-5 py-2">
                            <span class="text-sm md:text-base">Producto 5</span>
                            <hr class="flex-grow m-2">
                            <span>$0.33</span>
                        </li>
                        <hr class="w-full my-2" style="dashed">
                    </ul>
                    <div class="flex flex-col items-end w-full">
                        <span class="text-sm md:text-lg">Subtotal - $10.00</span>
                        <span class="text-sm md:text-lg">Transportación - $10.00</span>
                        <span class="text-sm md:text-lg">Total - $321.00</span>
                    </div>
                    

                </section>
            </section>

            
            <div class="flex flex-col border-l pl-3 justify-between">
                <i class="fa fa-share"></i>
                <i class="flex h-full items-end"  :class="{'fa fa-chevron-down':!isDetail,'fa fa-chevron-up':isDetail}" @click="isDetail=!isDetail"></i>
            </div>
            
        </article>        
</template>

<script setup>

import { ref,defineProps } from 'vue'

const props = defineProps({
  item: Object
})

console.log(props.item)

const isDetail = ref(false)

/* const openDetail = () => {
    isDetail.value = true
} */
</script>
<style scoped>
.line::before {
    content: '';
    border-top: 1px dotted black;
    flex-grow: 1;
    /*margin: auto;*/
  }
</style>