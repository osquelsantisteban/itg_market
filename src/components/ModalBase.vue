<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal" v-show="open">
    <div class="rounded-lg max-w-md w-full" :class="cssType">
      <div class=" relative">
          <i class="absolute right-0 top-0 text-slate-800 rounded-3xl px-2 py-1 hover:cursor-pointer fas fa-close" @click.self="closeModal"></i>

          <div class="p-5">
              <p v-text="props.msg" v-if="props.msg"></p>
              <slot v-else></slot>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,defineEmits,defineProps,onBeforeMount } from 'vue';

let open = ref(true)
let close = ref(6000)

const props = defineProps({
  msg: String,
  type: String,
  close: Number,
})

// Cierre automatico
onBeforeMount(() => {
  let timeOut = props.close || close.value
  setTimeout(()=>{
    open.value = false
  },timeOut)
})

const emit = defineEmits(['close']);

const closeModal = () => {
  open.value = false
  emit('close');
};

let cssType = ref('bg-white text-gray-800');


onBeforeMount(() => {
  let bgType    = 'bg-white';
  let textType  = 'text-gray-800';

  switch (props.type) {
    case 'success':
      bgType    = 'bg-green-200'
      textType  = 'text-green-500'
    break;

    case 'error':
      bgType    = 'bg-red-200'
      textType  = 'text-red-500'
    break;

    case 'warning':
      bgType    = 'bg-amber-100'
      textType  = 'text-amber-500'
    break;
  
    default:
      bgType    = 'bg-white'
      textType  = 'text-gray-800'
    break;
  }

  cssType= `${textType} ${bgType}`
})

</script>


<style scoped>
</style>
