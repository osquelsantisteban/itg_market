<template>
    <MainLayout>
        <!-- Formulario -->
        <section class="flex gap-5">
            <div class="flex flex-col w-11/12 gap-5">
                <span class="text-gray-400">Los campos con * son obligatorios</span>
                
                <!-- Comprador -->
                <div class="flex flex-col gap-5 my-2">
                
                    <div class="flex flex-col md:flex-row gap-5 w-full">
                        <!-- Nombre del Comprador -->
                        <div class="flex flex-col flex-1">
                            <input type="text" placeholder="Nombre del comprador" 
                                v-model="form.name_buy" 
                                :disabled="form.isSamePerson" 
                                @input="validateNameBuy"
                                class="input_form"
                                :class="{ 'disable': form.isSamePerson ,'input_form_error': errors.name_buy}"
                                title="Nombre solo acepta letras y espacios en blanco">
                            <span class="span_error">{{ errors.name_buy }}</span>
                        </div>
                        
                        <!-- Apellidos del Comprador -->
                        <div class="flex flex-col flex-1">
                            <input type="text" placeholder="Apellidos del comprador" 
                                v-model="form.last_name_buy" 
                                :disabled="form.isSamePerson" 
                                @input="validateLastNameBuy"
                                class="input_form"
                                :class="{ 'disable': form.isSamePerson,'input_form_error': errors.last_name_buy }"
                                title="Apellidos solo acepta letras y espacios en blanco">
                            <span class="span_error">{{ errors.last_name_buy }}</span>
                        </div>
                        
                    </div>

                    <div class="flex flex-col md:flex-row gap-5 w-full">
                        <!-- Email del Comprador -->
                        <div class="flex flex-col flex-1">
                            <input type="email" placeholder="Email del comprador" 
                                v-model="form.email_buy" 
                                :disabled="form.isSamePerson"
                                @input="validateEmailBuy"
                                class="input_form"
                                :class="{ 'disable': form.isSamePerson,'input_form_error': errors.email_buy}">
                            <span class="span_error">{{ errors.email_buy }}</span>
                        </div>
                        <!-- Teléfono del Comprador -->
                        <div class="flex flex-col flex-1">
                            <input type="tel" placeholder="Teléfono del comprador" 
                                v-model="form.phone_buy" 
                                :disabled="form.isSamePerson"
                                @input="validatePhoneBuy"
                                class="input_form"
                                :class="{ 'disable': form.isSamePerson,'input_form_error': errors.phone_buy }">
                            <span class="span_error">{{ errors.phone_buy }}</span>
                        </div>
                    </div>

                </div>

                <!-- Receptor -->
                <div class="flex flex-col gap-3">
                    <div class="flex gap-2">
                        <input type="checkbox" v-model="form.isSamePerson" id="same_person" @click="disableIsSamePerson()">
                        <label for="same_person" class="text-sky-800">Es la misma persona</label>                        
                    </div>
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

                        <!-- Dirección Receptor -->
                        <div class="flex flex-col flex-1">
                            <input type="text" placeholder="Dirección del receptor*" 
                                v-model="form.address_receiver" required
                                class="input_form"
                                :class="{'input_form_error': errors.address_receiver}">
                            <span class="span_error">{{ errors.address_receiver }}</span>
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
import { ref,onBeforeMount,watch/*computed,defineExpose */ } from 'vue';
import useFormValidation  from '@/composables/validation';
import { ModelSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';
import { provincesService } from '@/services/provinces.service';
import { citiesService } from '@/services/cities.service';

const { validateOnlyText,validateOnlyInteger,validatePhone,validateCi,validateEmail } = useFormValidation()
const errors = ref({})
const provinces = ref([])
const cities = ref([])
const loadingCities = ref(false)

onBeforeMount(async () => {
    provinces.value = await provincesService.getSimpleList()
})

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
    province_receiver: null,
    city_receiver: null,
    address_receiver: '',
    email_receiver: '',
    phone_receiver: '',
    postal_code_receiver: '',
    ci_receiver: '',
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


const disableIsSamePerson = () => {
    if (!form.value.isSamePerson) {
        form.value.name_buy = ''
        form.value.last_name_buy = ''
        form.value.email_buy = ''
        form.value.phone_buy = ''
    }
}

const getFields = () => {
  return Object.keys(form.value);
};

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

// Validacion Comprador
let validateNameBuy     = () => validateField('name_buy', validateOnlyText, 'El nombre no es válido');
let validateLastNameBuy = () => validateField('last_name_buy', validateOnlyText, 'El apellido no es válido');
let validateEmailBuy    = () => validateField('email_buy', validateEmail, 'El email no es válido');
let validatePhoneBuy    = () => validateField('phone_buy', validatePhone, 'El teléfono no es válido');

// Validacion Receptor
let validateNameReceiver        = () => validateField('name_receiver', validateOnlyText, 'El nombre no es válido');
let validateLastNameReceiver    = () => validateField('last_name_receiver', validateOnlyText, 'El apellido no es válido');
let validateEmailReceiver       = () => validateField('email_receiver', validateEmail, 'El email no es válido');
let validatePhoneReceiver       = () => validateField('phone_receiver', validatePhone, 'El teléfono no es válido');
let validatePostalCodeReceiver  = () => validateField('postal_code_receiver', validateOnlyInteger, 'El código postal no es válido');
let validateCIReceiver          = () => validateField('ci_receiver', validateCi, 'El CI no es válido');

const sendToBuy = (e) => {
    e.preventDefault();

    let requiredList = [];
    if(form.value.isSamePerson)
        // Solo estos son requeridos
        requiredList = [
            'name_receiver',
            'last_name_receiver',
            'email_receiver',
            'phone_receiver',
            'province_receiver',
            'city_receiver',
            'address_receiver',
            'ci_receiver'
        ]
    else
        // Todos son obligatorios
        requiredList = getFields()
    
    // si validate fail
    if(!validateRequired(requiredList)) return alert('Error de validación')
        
    // si validate is OK
    console.log(`Nombre Comprador ${form.value.name_buy}`)
    console.log(`Nombre Receptor ${form.value.name_receiver}`)

    console.log(`Apellidos Comprador ${form.value.last_name_buy}`)
    console.log(`Apellidos Receptor ${form.value.last_name_receiver}`)

    console.log(`Email Comprador ${form.value.email_buy}`)
    console.log(`Email Receptor ${form.value.email_receiver}`)

    console.log(`Phone Comprador ${form.value.phone_buy}`)
    console.log(`Phone Receptor ${form.value.phone_receiver}`)

    console.log(`Address Receptor ${form.value.address_receiver}`)
    console.log(`Codigo Postal Receptor ${form.value.postal_code_receiver}`)

    console.log(`Province Receptor ${form.value.province_receiver}`)
    console.log(`city Receptor ${form.value.city_receiver}`)
    console.log(`ci Receptor ${form.value.ci_receiver}`)
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