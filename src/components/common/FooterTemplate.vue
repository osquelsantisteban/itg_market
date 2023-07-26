<template>
  <footer class="z-0 bg-sky-800 flex flex-col px-4 pt-10 pb-4 mt-10 border-t border-white">          
    <div class="flex flex-col gap-6 text-white md:flex-row">
      
      <!-- Logo and Social Media -->
      <figure class="flex flex-col items-center order-1 gap-5 py-3 md:w-3/12 md:order-1 justify-evenly sm:py-0">
          <!-- Logo -->
          <img
          :src="logo_img"
          class="w-2/6 m-auto sm:m-0"
          alt="logo"
          />
        <!-- Social Media -->
        <ul class="flex flex-row justify-center gap-6 p-2 text-3xl social-media sm:justify-end">
          <li class="flex items-center rounded-full bg-white text-sky-800 px-[6px]"><a href="https://instagram.com/iris_travel_group?igshid=YmMyMTA2M2Y="><i class="fab fa-instagram"></i></a></li>
          <li class="flex items-center rounded-full bg-white text-sky-800 px-[10px]"><a href="https://www.facebook.com/iristravelgroupUSA?mibextid=LQQJ4d"><i class="fab fa-facebook-f"></i></a></li>
          <li class="flex items-center rounded-full bg-white text-sky-800 px-[6px]"><a href="https://wa.me/17868006595"><i class="fab fa-whatsapp"></i></a></li>
        </ul>
      </figure>

      <!-- Soporte -->
      <div class="flex flex-col order-3 gap-4 md:w-2/12 md:order-1 md:text-left md:border-l-2 md:px-6">
        <h3 class="hidden text-base uppercase font-DIN-Bold md:block">soporte</h3>
        <ul class="flex flex-col text-sm lg:text-sm gap-1">
          <li><router-link :to="'/'" >Quienes Somos</router-link></li><!-- {name: 'About'} -->
          <li><router-link :to="'/'" target='_blank'>Términos y políticas</router-link></li><!-- {name: 'TermsAndPolicy'} -->
          <li><router-link :to="'/'" target='_blank'>Políticas de devolución</router-link></li><!-- {name: 'TermsAndPolicy'} -->
          <li><router-link :to="'/'" >Contáctanos</router-link></li><!-- {name: 'Contact'} -->
          <li><a href="http://blog.iristravelgroup.com/" target="_blank">Iristravel Group Blog</a></li>          
        </ul>
      </div>

      <!-- Contacto -->
      <div class="flex flex-col order-4 gap-4 md:order-1 md:text-left md:border-l-2 md:px-6">
        <h3 class="hidden text-base uppercase font-DIN-Bold md:block">Contacto</h3>        

        <!-- Teléfono -->
        <div class="mb-3">
          <h4 class="hidden text-sm font-DIN-Bold md:block"><i class="fa fa-phone mr-2"></i>Teléfono</h4>
          <div class="text-xs md:text-sm"><pre>{{ phones }}</pre></div>
        </div>

        <!-- Ubicacion -->
        <div>
          <a href="https://goo.gl/maps/P76yQdQ7y7BYijwv9">
          <h4 class="hidden text-sm font-DIN-Bold md:block"><i class="fa fa-map-marker-alt mr-2"></i>Ubicación</h4>
          <div class="text-xs lg:text-sm">
              <span class="break-words">{{ direccion }}</span>
            </div>
          </a>
        </div>

      </div>

      <!-- Other Links -->      
      <div class="flex flex-col order-2 md:w-2/12 md:order-1 md:text-left md:border-l-2 md:px-6 gap-4">
        <h3 class="hidden text-base uppercase font-DIN-Bold md:block">Links de interés</h3>
        <ul class="flex flex-col text-sm lg:text-sm gap-1 text-red-900">
          <li><router-link :to="'/'" >Productos rebajados</router-link></li>
          <li><router-link :to="'/'" >Productos con envió gratis</router-link></li>
          <li><router-link :to="'/'" >Combos de Alimentos</router-link></li>
          <li><router-link :to="'/'" >Tarifas de entregas</router-link></li>
          <li><router-link :to="'/'" >Tarifas de entregas</router-link></li>
        </ul>
      </div>

    </div>
    <div class="py-6 mx-auto text-white">
      <small class="text-xs">{{ copyright }}</small>
    </div>
  </footer>
</template>

<script setup>
import CONFIG from '../../../config.js'
import { ref,onBeforeMount } from "vue";
import textServices from "@/services/texts.service"
// import {useAuthStore} from "@/store/authStore"
// const authStore = useAuthStore();
// await authStore.getBearerToken();  

const logo_img  = ref(CONFIG.GALLERY + "general/logo/logo-white.png")

const direccion = ref(null)
const phones    = ref(null)
const copyright = ref(null)

onBeforeMount(async () => {
  
  const footerData = await textServices.getFooter()
  direccion.value = await footerData.direccion.description
  phones.value    = await footerData.phones.description
  copyright.value = await footerData.copyright.description
})

</script>
<style scoped>

footer .social-media p {
  font-size: 14px;
}
</style>
