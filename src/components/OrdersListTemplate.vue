<template>
    
        <article class="flex justify-between rounded-lg border border-gray-300 p-5 w-full ">
            
            <section class="flex flex-col w-11/12 px-1">
                
                <div class="flex justify-between w-full">
                    <!-- Orden -->
                    <span class="uppercase text-lg md:text-2xl text-gray-800" v-text="item.booking_number"></span>
                    <!-- Fecha -->
                    <div class="flex flex-col mb-2">
                        <span class="uppercase text-sm md:text-base text-gray-800" v-text="item.creation_date"></span>                        
                    </div>
                </div>
                
                <section class="flex justify-between w-full items-end">
                    <!-- Status -->
                    <span class="uppercase text-xs md:text-base text-gray-800" v-text="item.status.description"></span>
                    
                    <!-- Price -->
                    <div>
                        <span class="uppercase text-lg md:text-2xl text-gray-800">$</span>
                        <span class="uppercase text-lg md:text-2xl text-gray-800" v-text="item.import+20"></span>
                    </div>
                </section>

                <!-- Detail -->
                <section class="flex flex-col items-start mt-5" v-show="isDetail">
                    
                    <span class="text-sm md:text-lg">Lista de productos</span>
                    <hr class="w-full my-2" style="dashed">
                    <ul class="flex flex-col items-start w-full">
                        <li class="flex w-full justify-between items-center gap-5 py-2" 
                            v-for="(el, index) in item.bk_items" :key="index">
                            <div>
                                <span class="text-sm md:text-base" v-text="el.cant"></span>-
                                <span class="text-sm md:text-base" v-text="el.item"></span>
                            </div>
                            <hr class="flex-grow m-2">
                            <div>$<span v-text="el.price"></span>
                            </div>
                        </li>
                        
                        <hr class="w-full my-2" style="dashed">
                    </ul>
                    <div class="flex flex-col items-end w-full">
                        <span class="text-sm md:text-lg">Subtotal - $<span class="text-sm md:text-lg" v-text="item.import"></span></span>
                        <span class="text-sm md:text-lg">Transportación - $20.00</span>
                        <span class="text-sm md:text-lg" >Total - $<span class="text-sm md:text-lg" v-text="item.import+20"></span></span>
                    </div>
                    

                </section>
            </section>

            
            <div class="flex flex-col border-l pl-3 justify-between">
                <i class="far fa-copy relative" @click="copyCardDetailsToClipboard">
                    <i class="fa fa-check text-lime-500 absolute left-2 top-2" v-show="isCopy"></i>
                </i>
                <i class="flex h-full items-end"  :class="{'fa fa-chevron-down':!isDetail,'fa fa-chevron-up':isDetail}" @click="isDetail=!isDetail"></i>
            </div>
            
        </article>        
</template>

<script setup>

import { ref,defineProps } from 'vue'

const props = defineProps({
  item: Object
})

let isCopy = ref(false)

const isDetail = ref(false)

const copyCardDetailsToClipboard = async () => {
    isCopy.value = true
    const cardDetails = `
        Orden: ${props.item.booking_number}
        Fecha: ${props.item.creation_date}
        Status: ${props.item.status.description}
        Precio: $${props.item.import + 20}
        Detalle:
        ${props.item.bk_items.map(el => `${el.cant} - ${el.item} - $${el.price}`).join('\n')}
        Subtotal: $${props.item.import}
        Transportación: $20.00
        Total: $${props.item.import + 20}
    `;

    try {
        await navigator.clipboard.writeText(cardDetails);
        setTimeout(() => {
            isCopy.value = false;
        },5000)

    } catch (error) {
        console.error('Hubo un error al copiar los detalles del card:', error);
        isCopy.value = false;
    }
};
</script>
<style scoped>
.line::before {
    content: '';
    border-top: 1px dotted black;
    flex-grow: 1;    
  }
</style>