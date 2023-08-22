<template>
    <MainLayout>
        <!-- Formulario -->
        <section class="flex gap-5">
            <div class="flex flex-col w-11/12 gap-5">
                <span class="text-gray-400">Los campos con * son obligatorios</span>                                

                <!-- Receptor -->
                <div class="flex flex-col gap-3">
                    
                    <div class="flex flex-col gap-5">

                        <div class="flex flex-col md:flex-row gap-5 w-full">
                            <!-- Nombre Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="text" placeholder="Nombre del receptor*" 
                                    v-model="form.name_receiver"
                                    @input="validateNameReceiver"
                                    class="input_form" required
                                    :class="{'input_form_error': errors.name_receiver}">
                                <span class="span_error">{{ errors.name_receiver }}</span>
                            </div>

                            <!-- Apellidos Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="text" placeholder="Apellidos del receptor*" 
                                    v-model="form.last_name_receiver"
                                    @input="validateLastNameReceiver"
                                    class="input_form" required
                                    :class="{'input_form_error': errors.last_name_receiver}">
                                <span class="span_error">{{ errors.last_name_receiver }}</span>
                            </div>
                        </div>


                        <div class="flex flex-col md:flex-row gap-5 w-full">
                            <!-- Pais -->
                            <div class="flex flex-col flex-1">
                                <model-select 
                                        :options="countries"                                        
                                        v-model="form.country_receiver"
                                        placeholder="Seleccione el País*"
                                        required                                        
                                        class="input_form"
                                        :class="{'input_form_error': errors.country_receiver}">
                                </model-select>
                                <span class="span_error">{{ errors.country_receiver }}</span>
                            </div>

                            <!-- Dirección Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="text" placeholder="Dirección del receptor*" 
                                    v-model="form.address_receiver" required
                                    class="input_form"
                                    :class="{'input_form_error': errors.address_receiver}">
                                <span class="span_error">{{ errors.address_receiver }}</span>
                            </div>
                        </div>

                        <div class="flex flex-col md:flex-row gap-5 w-full">
                            <!-- Provincia Receptor -->                            
                            <div class="flex flex-col flex-1">
                                <model-select :options="provinces"
                                        placeholder="Seleccione la provincia*"
                                        v-model="form.province_receiver"
                                        @searchchange="updProvince"
                                        required
                                        class="input_form"
                                        :class="{'input_form_error': errors.province_receiver}">
                                </model-select>                               
                                <span class="span_error">{{ errors.province_receiver }}</span>
                            </div>

                            <!-- Municipio Receptor -->                            
                            <div class="flex flex-col flex-1">
                                <div class="py-6 text-3xl" v-show="loadingCities">
                                    <i class="fa fa-spinner fa-pulse"></i>
                                </div>
                                <model-select 
                                        :options="cities"
                                        v-show="!loadingCities"
                                        v-model="form.city_receiver"
                                        placeholder="Seleccione el municipio*"
                                        required                                        
                                        class="input_form"
                                        :class="{'input_form_error': errors.city_receiver}">
                                </model-select>
                                <span class="span_error">{{ errors.city_receiver }}</span>
                            </div>
                        </div>

                        
                        <div class="flex flex-col md:flex-row gap-5 w-full">
                            
                            <!-- CI -->
                            <div class="flex flex-col flex-1">
                                <input type="text" placeholder="Escriba su CI*" v-model="form.ci_receiver" required
                                    class="input_form"
                                    @input="validateCIReceiver"
                                    :class="{'input_form_error': errors.ci_receiver}">
                                <span class="span_error">{{ errors.ci_receiver }}</span>
                            </div>

                            <!-- Código Postal Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="text" placeholder="Código postal del receptor" v-model="form.postal_code_receiver" required
                                    class="input_form"
                                    @input="validatePostalCodeReceiver"
                                    :class="{'input_form_error': errors.postal_code_receiver}">
                                <span class="span_error">{{ errors.postal_code_receiver }}</span>
                            </div>
                            
                        </div>

                        <div class="flex flex-col md:flex-row gap-5 w-full">

                            <!-- Email Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="email" placeholder="Email del receptor" 
                                    v-model="form.email_receiver"
                                    @input="validateEmailReceiver"
                                    class="input_form" required
                                    :class="{'input_form_error': errors.email_receiver}">
                                <span class="span_error">{{ errors.email_receiver }}</span>
                            </div>

                            <!-- Teléfono Receptor -->
                            <div class="flex flex-col flex-1">
                                <input type="tel" placeholder="Teléfono del receptor*" 
                                    v-model="form.phone_receiver" required
                                    @input="validatePhoneReceiver"
                                    class="input_form"
                                    :class="{'input_form_error': errors.phone_receiver}">
                                <span class="span_error">{{ errors.phone_receiver }}</span>
                            </div>
                        </div>

                        <textarea v-model="form.obs" class="w-full input_form" placeholder="Escriba algún otro dato aquí"></textarea>
                        
                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit" class="btn-send" @click="sendToBuy">Enviar</button>
                </div>
            </div>
            
        </section>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layouts/MainLayout.vue';
// import PanelCart from '@/components/PanelCart.vue';
// import bookingService from '@/services/booking.service';
import Swal from 'sweetalert2';
import { ref,onBeforeMount,watch/*computed,defineExpose */ } from 'vue';
import useFormValidation  from '@/composables/validation';
import { ModelSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';
import { countriesService } from '@/services/country.service';
import { provincesService } from '@/services/provinces.service';
import { citiesService } from '@/services/cities.service';
import {useAuthStore} from "@/store/authStore"

const authStore = useAuthStore();

const { validateOnlyText,validateOnlyInteger,validatePhone,validateCi,validateEmail } = useFormValidation()
const errors = ref({})
const provinces = ref([])
const cities = ref([])
const countries = ref([])
const loadingCities = ref(false)

onBeforeMount(async () => {
    // provinces.value = await provincesService.getSimpleList()
    [provinces.value,countries.value] = await Promise.all([
        provincesService.getSimpleList(),
        countriesService.getSimpleList()
    ])
})

const form = ref({
    name_receiver: '',
    last_name_receiver: '',
    country_receiver:'',
    province_receiver: null,
    city_receiver: null,
    address_receiver: '',
    email_receiver: '',
    phone_receiver: '',
    postal_code_receiver: '',
    ci_receiver: '',
    obs: ''
})

// Cada vez que se cambia la provincia se actualiza el municipio
const updProvince = async () => {    
    try {
        loadingCities.value = true
        cities.value = await citiesService.getSimpleList(form.value.province_receiver)
        
    } catch (error) {        
        console.log(error)
    }finally{
        loadingCities.value = false        
    }
}

// Se observa la provincia
watch(() => form.value.province_receiver, () => {
    updProvince();
});


const validateField = (fieldName, validator, errorMessage) => {
  if (!validator(form.value[fieldName]) && form.value[fieldName] !== '') {
    errors.value[fieldName] = errorMessage
    return true
  }
  errors.value[fieldName] = ''
  return false
}

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

//<!-- TODO revisar las validaciones
// Validacion Receptor
let validateNameReceiver        = () => validateField('name_receiver', validateOnlyText, 'El nombre no es válido');
let validateLastNameReceiver    = () => validateField('last_name_receiver', validateOnlyText, 'El apellido no es válido');
let validateEmailReceiver       = () => validateField('email_receiver', validateEmail, 'El email no es válido');
let validatePhoneReceiver       = () => validateField('phone_receiver', validatePhone, 'El teléfono no es válido');
let validatePostalCodeReceiver  = () => validateField('postal_code_receiver', validateOnlyInteger, 'El código postal no es válido');
let validateCIReceiver          = () => validateField('ci_receiver', validateCi, 'El CI no es válido');


const getDestination = (id) => {
    return countries.value.filter(el => el.value === id)
}

const getProvince = (id) => {    
    return provinces.value.filter(el => el.value === id)
}

const getCity = (id) => {
    return cities.value.filter(el => el.value === id)
}



const sendToBuy = (e) => {
    e.preventDefault();
    // console.log(authStore.decodeToken())
    console.log(authStore.decodeToken().client.name)
    console.log(authStore.decodeToken().client.email)

    // Solo estos son requeridos
    let requiredList = [
            'name_receiver',
            'last_name_receiver',
            'email_receiver',
            'phone_receiver',
            'province_receiver',
            'city_receiver',
            'address_receiver',
            'ci_receiver'
    ]
    
    // si validate fail
    if(!validateRequired(requiredList)) 
        return Swal.fire({
            title: 'Validación',
            text: `Error de validación, revise los datos introducidos`,
            icon: 'error',
            confirmButtonColor: '#3085d6',                            
        })
        
    // si validate is OK
    // console.log('province_receiver',form.value.province_receiver)
    // console.log(getProvince(form.value.province_receiver))
    let destinationText = getDestination(form.value.country_receiver) ? getDestination(form.value.country_receiver)[0].text : ''
    let provinceText    = getProvince(form.value.province_receiver) ? getProvince(form.value.province_receiver)[0].text : ''
    let cityText        = getCity(form.value.city_receiver) ? getCity(form.value.city_receiver)[0].text : ''

    console.log(destinationText)
    console.log(provinceText)
    console.log(cityText)
    
    // console.log(authStore.decodeToken())
    // let data = {
    //     description: form.value.obs,
    //     destination: destinationText,
    //     email: authStore.decodeToken().client.email,
    //     name: authStore.decodeToken().client.name,
    //     phone: 'phone',//TODO
    //     price: 100, //TODO
    //     product: 'MarketItem',
    //     deliver: {
    //         name: form.value.name_receiver,
    //         lastname: form.value.last_name_receiver,
    //         dni: form.value.ci_receiver,
    //         phone: form.value.phone_receiver,
    //         address: form.value.address_receiver,            
    //     },
    //     prod:{
    //         //TODO
    //     }
    // }
    // console.log(data)

    // bookingService.create(data)
    
    // console.log(`Nombre Receptor ${form.value.name_receiver}`)
    // console.log(`Apellidos Receptor ${form.value.last_name_receiver}`)
    // console.log(`Email Receptor ${form.value.email_receiver}`)
    // console.log(`Phone Receptor ${form.value.phone_receiver}`)
    // console.log(`Address Receptor ${form.value.address_receiver}`)
    // console.log(`Codigo Postal Receptor ${form.value.postal_code_receiver}`)
    // console.log(`Country ${form.value.country_receiver}`)
    // console.log(`Province Receptor ${form.value.province_receiver}`)
    // console.log(`city Receptor ${form.value.city_receiver}`)
    // console.log(`ci Receptor ${form.value.ci_receiver}`)
    // console.log(`Obs ${form.value.obs}`)
}

</script>

<style scoped>
.style-remove-all {
    transition: opacity 0.5s ease-out;
    opacity: 0;
}

.input_form {
    @apply flex w-full border border-gray-300 rounded-lg px-5 py-2 placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none;
}

:deep() .ui.selection.dropdown,.ui.dropdown.selected, .ui.dropdown .menu .selected.item{
    @apply flex w-full border border-gray-300 rounded-lg placeholder-gray-400 text-sky-800
    focus:ring-1 focus:border-sky-600 focus:outline-none
}

:deep() .ui.default.dropdown:not(.button) > .text{
    color: red;
}

.input_form_error {
    @apply flex w-full text-red-500 rounded-lg px-5 py-2 border border-red-500 
    focus:border-transparent focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none 
    focus:invalid:border-red-500 focus:invalid:ring-red-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    placeholder-red-500
    invalid:border-red-500 invalid:text-red-500;
}

.disable {
    @apply bg-gray-300 text-gray-400;
}

.span_error{
    @apply text-red-500 text-sm;
}

.btn-send{
    @apply px-3 py-2 bg-amber-400 text-gray-800 rounded-lg w-44 hover:bg-amber-400/80
}
</style>