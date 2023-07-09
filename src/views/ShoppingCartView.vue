<template>
    <MainLayout>
        <div v-if="cart.totalProducts === 0 && !isClear" class="flex w-full gap-5">
            <div class="flex w-9/12">No hay productos</div>
            {{ isClear }}
            <div class="w-3/12">
                <PanelCart />
            </div>            
        </div>
        <div v-else class="flex w-full gap-5">
                
                <div class="flex flex-col gap-5 w-9/12" :class="{'style-remove-all': isClear }">
                    <CartLisTemplate v-for="(item, index) in cart.prods" :key="index" :item="item" />                    
                </div>

            <div class="w-3/12">
                <PanelCart @clearProducts="clearCart"/>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import { useCartStore } from '@/store/cartStore'
import CartLisTemplate from '@/components/CartListTemplate.vue'
import PanelCart from '@/components/PanelCart.vue';
import { ref,nextTick  } from 'vue';

const cart = useCartStore()
const isClear = ref(false)

const clearCart = async () => {
  isClear.value = true;  
  await nextTick(); 
  setTimeout(() => { 
    isClear.value = false; 
    cart.clearAllProducts();
  }, 3500); 
}

</script>

<style scoped>
.style-remove-all {
    transition: opacity 1.5s ease-out;
    opacity: 0;
  }
</style>