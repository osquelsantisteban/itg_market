import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createI18n } from 'vue-i18n'
import { messages } from './lang/home_translate'

import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles/main.css'

import VueCookies from 'vue-cookies'


//Opctions
const i18n = createI18n({
	legacy: false,
    locale: 'es',
	fallbackLocale: 'es',
    messages
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app
    .use(pinia)
    .use(router)
    .use(i18n)
    .use(VueCookies,{
        expires: '1d',
        secure: true,
        httpOnly: true,
        sameSite: 'Strict',
    })
    .mount('#app')
