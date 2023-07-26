<template>
    <MainLayout>
  
      <section class="flex flex-col md:flex-row w-full justify-between bg-white p-5 mb-4 gap-10">
  
        <figure class="w-full">
          <img src="http://via.placeholder.com/640x360" alt="">
        </figure>
  
        <div class="flex flex-col items-center justify-center w-full">

          <!-- Title -->
          <div class="mb-5 w-full">
            <h4>Registrarse</h4>
          </div>

          <!-- Nombre y Apellidos -->
          <div class="mb-5 w-full">
              <div class="flex gap-5 w-full">
                  <div class="block w-1/2">
                    <input class="input_form"
                    :class="{ 'input_form_error': errors.name}"
                    v-model="form.name"
                    @input="validateNameRules"
                    type="text"
                    placeholder="Nombre">
                    <span class="span_error">{{ errors.name }}</span>
                  </div>

                  <div class="block w-1/2">
                    <input class="input_form"
                    :class="{ 'input_form_error': errors.last_name}"
                    v-model="form.last_name"
                    @input="validateLastNameRules"
                    type="text"
                    placeholder="Apellidos">
                    <span class="span_error">{{ errors.last_name }}</span>
                  </div>
              </div>
          </div>

          <!-- Email -->
          <div class="mb-5 w-full">
              <input class="input_form"
              :class="{ 'input_form_error': errors.email}"
              v-model="form.email"
              @input="validateEmailRules"
              type="email"
              placeholder="Email">
              <span class="span_error">{{ errors.email }}</span>
          </div>


          <div class="flex flex-row mb-5 w-full gap-3">
              
              <!-- Password -->
              <div class="block w-1/2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.password}"
                v-model="form.password"
                @input="validatePassword"
                type="password"
                placeholder="Escriba la contraseña">
                <span class="span_error">{{ errors.password }}</span>
              </div>

              <!-- Confirmacion Password -->
              <div class="block w-1/2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.confirm_password}"
                v-model="form.confirm_password"
                @input="validateConfirmPassword"
                type="password"
                placeholder="Confirme la contraseña">
                <span class="span_error">{{ errors.confirm_password }}</span>            
              </div>

          </div>              

          <!-- Address -->
          <div class="mb-5 w-full">
              <input class="input_form"
              :class="{ 'input_form_error': errors.address}"
              v-model="form.address"
              type="text"
              placeholder="Dirección">
              <span class="span_error">{{ errors.address }}</span>
          </div>

          <!-- Phone -->
          <div class="mb-5 w-full">
              <input class="input_form"
              :class="{ 'input_form_error': errors.phone}"
              v-model="form.phone"
              @input="validatePhoneRules"
              type="text"
              placeholder="Teléfono">
              <span class="span_error">{{ errors.phone }}</span>
          </div>
        
          
          <!-- Enviar -->
          <div class="flex items-center justify-end mb-5 w-full">                
              <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="button"
              @click="sendRequest()">
              Enviar
              </button>
          </div>
          
        </div>
  
      </section>
    </MainLayout>
  </template>
  
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from "vue";
import useFormValidation  from '@/composables/validation'

//   import {useAuthStore} from "@/store/authStore"
//   const authStore = useAuthStore();

const { validateOnlyText,validatePhone,validateEmail } = useFormValidation()

const errors = ref({})  
const form = ref({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    phone: '',
  });
  
const getFields = () => {
  return Object.keys(form.value);
};

const validateRequired = (requiredList) => {
    let validateRulesRequired = true
    requiredList.forEach((el) => {
        if(!form.value[el]) {
            errors.value[el] = 'El campo es requerido'
            validateRulesRequired = false
        }
        else errors.value[el] = ''
    })

    return validateRulesRequired;  
}

const validateField = (fieldName, validator, errorMessage) => {
  if (!validator(form.value[fieldName]) && form.value[fieldName] !== '') {
    errors.value[fieldName] = errorMessage
    return true
  }
  errors.value[fieldName] = ''
  return false
}

const validatePassword = () => {
  if(form.value.password.length > 20) {
    errors.value['password'] = 'El campo es muy largo';
  } else {
    errors.value['password'] = '';
  }
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  if(form.value.password !== form.value.confirm_password) {
    errors.value['confirm_password'] = 'Los password no son iguales';
  } else {
    errors.value['confirm_password'] = '';
  }
};


let validateNameRules     = () => validateField('name', validateOnlyText, 'El nombre no es válido');
let validateLastNameRules = () => validateField('last_name', validateOnlyText, 'El apellido no es válido');
let validateEmailRules    = () => validateField('email', validateEmail, 'El email no es válido');
let validatePhoneRules    = () => validateField('phone', validatePhone, 'El teléfono no es válido');


const sendRequest = (async () => {

  let requiredList = getFields()
  if(!validateRequired(requiredList)) return alert('Error de validación')

  let msg = 
  `nombre ${form.value.name}
  apellido ${form.value.last_name}
  email ${form.value.email}
  password ${form.value.password}
  confirm_password ${form.value.confirm_password}
  address ${form.value.address}
  phone ${form.value.phone}`
  alert(msg)    
})

</script>
  <style scoped>
  .input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none;
  }

  .input_form_error {
    @apply flex w-full text-red-500 rounded-lg px-5 py-2 border border-red-500 
    focus:border-transparent focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none 
    focus:invalid:border-red-500 focus:invalid:ring-red-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    placeholder-red-500
    invalid:border-red-500 invalid:text-red-500;
}

.span_error{
  @apply text-red-500 text-sm;
}

</style>