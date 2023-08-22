<template>
    <MainLayout>      
              
      <section class="flex flex-col lg:flex-row w-full justify-between bg-white p-5 mb-4 gap-10">
  
        <figure class="w-full flex justify-center bg-contain">
          <img src="http://via.placeholder.com/640x360" alt="">
        </figure>
  
        <form class="flex flex-col items-center justify-center w-full" @submit="sendRequest">

          <!-- Title -->
          <div class="mb-5 w-full">
            <h4>Registrarse</h4>
          </div>
          
          
          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">

              <!-- Nombre -->
              <div class="w-full mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.first_name}"
                v-model="form.first_name"
                @input="validateNameRules"
                type="text"
                placeholder="Nombre*">
                <span class="span_error">{{ errors.first_name }}</span>
              </div>
    
              <!-- Apellidos -->
              <div class="w-full mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.last_name}"
                v-model="form.last_name"
                @input="validateLastNameRules"
                type="text"
                placeholder="Apellidos*">
                <span class="span_error">{{ errors.last_name }}</span>
              </div>

          </div>


          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">
            
            <!-- Email -->
            <div class="w-full  mb-2">
              <input class="input_form"
              :class="{ 'input_form_error': errors.email}"
              v-model="form.email"
              @input="validateEmailRules"
              type="email"
              placeholder="Email*">
              <span class="span_error">{{ errors.email }}</span>
            </div>

            <!-- Phone -->
            <div class="w-full  mb-2">
              <input class="input_form"
              :class="{ 'input_form_error': errors.phone}"
              v-model="form.phone"
              @input="validatePhoneRules"
              type="tel"
              placeholder="Teléfono*">
              <span class="span_error">{{ errors.phone }}</span>
            </div>
            
          </div>


          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">
              
              <!-- Password -->
              <div class="w-full  mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.password}"
                v-model="form.password"
                @input="validatePassword"
                type="password"
                placeholder="Contraseña*">
                <span class="span_error">{{ errors.password }}</span>
              </div>

              <!-- Confirmacion Password -->
              <div class="w-full  mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.confirm_password}"
                v-model="form.confirm_password"
                @input="validateConfirmPassword"
                type="password"
                placeholder="Confirme la contraseña*">
                <span class="span_error">{{ errors.confirm_password }}</span>
              </div>

          </div>


          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">
              
              <!-- Country -->
              <div class="w-full mb-2">
                <model-select :options="countries"
                    placeholder="País*"
                    v-model="form.country"                    
                    required
                    class="input_form"
                    :class="{'input_form_error': errors.country}">
                </model-select>
                <span class="span_error">{{ errors.country }}</span>
              </div>

              <!-- zip_code -->
              <div class="w-full  mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.confirm_password}"
                v-model="form.zip_code"
                @input="validateConfirmPassword"
                type="text"
                placeholder="Código postal">
                <span class="span_error">{{ errors.confirm_password }}</span>
              </div>

          </div>


          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">

              <!-- Province -->
              <div class="w-full  mb-2">
                <model-select :options="provinces"
                        placeholder="Provincia*"
                        v-model="form.province"
                        @searchchange="updProvince"
                        required
                        class="input_form"
                        :class="{'input_form_error': errors.province}">
                </model-select>
                <span class="span_error">{{ errors.province }}</span>
              </div>

              <!-- City -->
              <div class="w-full  mb-2">
                <div class="py-6 text-3xl" v-show="loadingCities">
                    <i class="fa fa-spinner fa-pulse"></i>
                </div>
                <model-select 
                  :options="cities"
                  v-show="!loadingCities"
                  v-model="form.city"
                  placeholder="Municipio*"
                  required                                        
                  class="input_form"
                  :class="{'input_form_error': errors.city}">
                </model-select>
                <span class="span_error">{{ errors.city }}</span>
              </div>              

          </div>

          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">

            <!-- Address -->
            <div class="w-full mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.address}"
                v-model="form.address"
                type="text"
                placeholder="Dirección">
                <span class="span_error">{{ errors.address }}</span>
            </div>

            <!-- Gender -->
            <div class="w-full mb-2">
              <model-select 
                :options="genders"
                v-model="form.gender"
                placeholder="Genero*"
                required                                        
                class="input_form"
                :class="{'input_form_error': errors.gender}">
              </model-select>
                <span class="span_error">{{ errors.gender }}</span>
            </div>
          </div>


          <!-- <div class="flex justify-items-start mb-2 w-full gap-2">
            <input type="checkbox" >
            <label>Agencia</label>
          </div>

          <div class="flex flex-col md:flex-row gap-5 w-full mb-2">

              
              <div class="w-full  mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.confirm_password}"
                v-model="form.confirm_password"
                @input="validateConfirmPassword"
                type="text"
                placeholder="i_a_t_a">
                <span class="span_error">{{ errors.confirm_password }}</span>
              </div>

              
              <div class="w-full  mb-2">
                <input class="input_form"
                :class="{ 'input_form_error': errors.password}"
                v-model="form.password"
                @input="validatePassword"
                type="text"
                placeholder="Company">
                <span class="span_error">{{ errors.password }}</span>
              </div>              

          </div> -->
    

        
          
          <!-- Enviar -->
          <div class="flex items-center justify-end mb-5 w-full">                
              <button class="bg-sky-800 hover:bg-sky-800/80 text-white font-bold py-2 px-4 rounded" type="submit"
              @click="sendRequest">
              Enviar
              </button>
          </div>
          

        </form>        
  
      </section>
    </MainLayout>
  </template>
  
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref,onBeforeMount,watch } from "vue";
import useFormValidation  from '@/composables/validation'

import Swal from 'sweetalert2';

import { ModelSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';
import { provincesService } from '@/services/provinces.service';
import { citiesService } from '@/services/cities.service';
import { genderService } from '@/services/gender.service';
import { countriesService } from '@/services/country.service';
import {useAuthStore} from "@/store/authStore"

const authStore = useAuthStore();

const { validateOnlyText,validatePhone,validateEmail } = useFormValidation()

const errors = ref({})
const countries = ref([])
const provinces = ref([])
const genders = ref([])
const cities = ref([])
const loadingCities = ref(false)

const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    country: '',
    zip_code: '',
    province: '',
    city: '',
    address: '',
    gender: '',
    is_travel_agency: false,
    i_a_t_a: '',
    company: '',
    confirmation_link: '/verify-user',
    roles: [9]
  });

// carga inicial
onBeforeMount(async () => {
    
    const results = await Promise.all([
      countriesService.getSimpleList(),
      provincesService.getSimpleList(),
      genderService.getSimpleList(),
    ]);

    countries.value = results[0];
    provinces.value = results[1];
    genders.value = results[2];
})


// Cada vez que se cambia la provincia se actualiza el municipio
const updProvince = async () => {    
    try {
        loadingCities.value = true
        cities.value = await citiesService.getSimpleList(form.value.province)
        
    } catch (error) {        
        console.log(error)
    }finally{
        loadingCities.value = false        
    }
}

// Se observa la provincia
watch(() => form.value.province, () => {
    updProvince();
});

// valida que todos los campos requeridos este llenos
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

// valida ademas el formato y tipo de dato
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

//<!-- TODO add mas validaciones 
let validateNameRules     = () => validateField('first_name', validateOnlyText, 'El nombre no es válido');
let validateLastNameRules = () => validateField('last_name', validateOnlyText, 'El apellido no es válido');
let validateEmailRules    = () => validateField('email', validateEmail, 'El email no es válido');
let validatePhoneRules    = () => validateField('phone', validatePhone, 'El teléfono no es válido');


const convertObj = (obj) => {

  const ob = JSON.parse(JSON.stringify(obj))

    const newObj = {
        ...ob,        
        gender_id: ob.gender,
        country_id: ob.country,
        password: authStore.encryptPass(ob.password)
    };

    // Eliminar claves no deseadas
    delete newObj.confirm_password;
    delete newObj.gender;
    delete newObj.country;

    return newObj;
};

const sendRequest = async (e) => {
  e.preventDefault();

  // Campos requeridos
  let requiredList = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'password',
    'confirm_password',
    'country',
    'zip_code',
    'province',
    'city',
    'address',
    'gender',
  ];

  if(!validateRequired(requiredList)) 
    return Swal.fire({
      title: 'Validación',
      text: `Error de validación`,
      icon: 'error',
      confirmButtonColor: '#3085d6',                            
    }) 

  let data = convertObj(form.value)
  try {
    let registro = await authStore.register(data)
    
    if (registro) 
      
      return Swal.fire({
        title: 'Confirmación',
        text: `Se realiza el registro exitosamente, revise su correo`,
        icon: 'success',
        confirmButtonColor: '#3085d6',                            
      }) 

    return Swal.fire({
      title: 'Error',
      text: `Error en la acción de registro, revise los datos e intentelo de nuevo`,
      icon: 'error',
      confirmButtonColor: '#3085d6',                            
    }) 
    
    
  } catch (error) {
    console.log(error)
    return Swal.fire({
      title: 'Error',
      text: `Error en la acción de registro, revise los datos e intentelo de nuevo`,
      icon: 'error',
      confirmButtonColor: '#3085d6',                            
    }) 
    
  }

}

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