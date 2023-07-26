<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal">
    <div class="bg-white rounded-lg max-w-md w-full">
      <div class=" relative">
          <i class="absolute right-0 top-0 text-slate-800 rounded-3xl px-2 py-1 hover:cursor-pointer fas fa-close" @click.self="closeModal"></i>

          <div class="p-5">
              <slot></slot>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>


<style scoped>
</style>
