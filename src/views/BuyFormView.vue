<template>
    <MainLayout>
        <!-- Formulario -->
        <section class="flex gap-5">
            <div class="flex flex-col w-10/12 gap-5">
                <!-- Comprador -->
                <div class="flex flex-col gap-5 my-2">
                    <div class="flex gap-5 w-full">
                        <input type="text" placeholder="Nombre del comprador" 
                            v-model="form.name_buy" 
                            :disabled="form.isSamePerson" 
                            class="input_form"
                            :class="{ 'disable': form.isSamePerson ,'input_form_error': validateNameBuy}"
                            title="Nombre solo acepta letras y espacios en blanco">
                        <input type="text" placeholder="Apellidos del comprador" 
                            v-model="form.last_name_buy" 
                            :disabled="form.isSamePerson" 
                            class="input_form"
                            :class="{ 'disable': form.isSamePerson }"
                            title="Apellidos solo acepta letras y espacios en blanco">
                    </div>
                    <div class="flex gap-5 w-full">
                        <input type="text" placeholder="Email del comprador" 
                            v-model="form.email_buy" 
                            :disabled="form.isSamePerson" 
                            class="input_form"
                            :class="{ 'disable': form.isSamePerson,'input_form_error': validateEmailBuy}">
                        <input type="text" placeholder="Teléfono del comprador" v-model="form.phone_buy" class="input_form"
                            :disabled="form.isSamePerson" :class="{ 'disable': form.isSamePerson }">
                    </div>
                </div>
                <!-- Receptor -->
                <div class="flex flex-col gap-3">
                    <div class="flex gap-2">
                        <input type="checkbox" v-model="form.isSamePerson" id="same_person" @click="disableIsSamePerson()">
                        <label for="same_person" class="text-cyan-800">Es la misma persona</label>                        
                    </div>
                    <div class="flex flex-col gap-5">
                        <div class="flex gap-5 w-full">
                            <input type="text" placeholder="Nombre del receptor" v-model="form.name_receiver" class="input_form" required>
                            <input type="text" placeholder="Apellido del receptor" v-model="form.last_name_receiver" required
                                class="input_form">                            
                        </div>
                        <input type="text" placeholder="Dirección del receptor" v-model="form.address_name_receiver" required
                            class="input_form">
                        <div class="flex gap-5 w-full">
                            <input type="text" placeholder="Email del receptor" v-model="form.email_receiver" class="input_form" required>
                            <input type="text" placeholder="Teléfono del receptor" v-model="form.phone_receiver" required
                                class="input_form">                            
                        </div>

                        <input type="text" placeholder="Código postal del receptor" v-model="form.postal_code_receiver" required
                            class="input_form">
                    </div>
                </div>
            </div>
            <div class="w-2/12">
                <PanelCart />
            </div>
        </section>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue'
import PanelCart from '@/components/PanelCart.vue';
import { ref,computed,/*watch ,defineExpose */ } from 'vue';
import useFormValidation  from '@/composables/validation'

const { validateOnlyText, validateEmail } = useFormValidation()

const form = ref({
    // Comprador
    name_buy: '',
    last_name_buy: '',
    email_buy: '',
    phone_buy: '',
    // Receptor
    isSamePerson: false,
    name_receiver: '',
    last_name_receiver: '',
    address_name_receiver: '',
    email_receiver: '',
    phone_receiver: '',
    postal_code_receiver: '',
})


const disableIsSamePerson = () => {
    if (!form.value.isSamePerson) {
        form.value.name_buy = null
        form.value.last_name_buy = null
        form.value.email_buy = null
        form.value.phone_buy = null
    }
}

const errors = ref({})

const validateField = (fieldName, validator, errorMessage) => {
  if (!validator(form.value[fieldName]) && form.value[fieldName] !== '') {
    errors.value[fieldName] = errorMessage
    return true
  }
  return false
}

let validateNameBuy = computed(() => validateField('name_buy', validateOnlyText, 'Name is not valid'));
let validateEmailBuy = computed(() => validateField('email_buy', validateEmail, 'Email is not valid'));

/* watch(form, () => {
  errors.value = {}
  if (!validateNameBuy.value) {
    errors.value.name_buy = 'Name is not valid'
  }
  if (!validateEmailBuy.value) {
    errors.value.email_buy = 'Email is not valid'
  }
}) */


// const validateNameBuy = computed(() => validateField('name_buy', validateOnlyText, 'Name is not valid'))
// const validateEmailBuy = computed(() => validateField('email_buy', validateEmail, 'Email is not valid'))

// defineExpose({
//   form,
//   errors,
//   validateNameBuy,
//   validateEmailBuy
// })
/* const validateNameBuy = () => {
  if (!validateOnlyText(form.value.name_buy) && form.value.name_buy !== '') {
    errors.value.name = 'Name is not valid'
    return true
  }
  return false
}

const validateEmailBuy = () => {    
  if (!validateEmail(form.value.email_buy) && form.value.email_buy !== '') {
    errors.value.email = 'Email is not valid'
    return true
  }
  return false
} */

</script>

<style scoped>
.style-remove-all {
    transition: opacity 0.5s ease-out;
    opacity: 0;
}

.input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-cyan-800
    focus:ring-1 focus:border-cyan-600 focus:outline-none;
}

.input_form_error {
    @apply flex w-full text-red-500 rounded-lg px-5 py-2 border border-red-500 
    focus:border-transparent focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none 
    focus:invalid:border-red-500 focus:invalid:ring-red-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    placeholder-slate-400
    invalid:border-red-500 invalid:text-red-500;
}

.disable {
    @apply bg-gray-300 text-gray-400;
}</style>