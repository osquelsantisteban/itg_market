<template>
    <table class="table-auto bg-red-200 min-w-full text-left text-sm font-light">
        <thead class="border-b font-medium"><tr><th scope="col" class="px-6 py-4">orden</th><th scope="col" class="px-6 py-4">fecha</th><th scope="col" class="px-6 py-4">estado</th><th scope="col" class="px-6 py-4">detalles</th><th scope="col" class="px-6 py-4">precio</th></tr></thead>
        <tbody >
            <tr v-for="(item,index) in props.item" :key="index" class="border-b">
            <td class="whitespace-nowrap px-6 py-4">{{item.id}}</td>
            <td class="whitespace-nowrap px-6 py-4">{{item.fecha}}</td>
            <td class="whitespace-nowrap px-6 py-4 uppercase">{{item.estado_entrega}}</td>
            <td class="whitespace-nowrap px-6 py-4 uppercase">detalle</td>
            <td class="whitespace-nowrap px-6 py-4">{{item.precio}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import { defineProps } from 'vue'

const props = defineProps({
  item: Object
})

console.log(props.item)
</script>
