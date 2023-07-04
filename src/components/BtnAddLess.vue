<template>
    <div class="w-full flex items-center justify-between rounded-lg">
        <button class="rounded-l-lg bg-gray-300 w-10" @click="add">+</button>
        <div class="w-10">{{ count }}</div>
        <button class="rounded-r-lg bg-gray-300 w-10" @click="less">-</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);

const add = () => count.value++
const less = () => { count.value > 0 ? count.value-- : count.value} 


</script>