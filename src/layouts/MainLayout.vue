<template>    
    <div class="flex flex-col min-h-screen">
        <Header />
        
        <main class="flex-grow w-10/12 mx-auto">           
                <slot ></slot>
        </main>
        
        <Footer />
    </div>
</template>

<script setup>
// import { ref } from 'vue';
// import ModalLocation from '@/components/ModalLocation.vue';
// import ModalLogin from '@/components/auth/ModalLogin.vue';
// import { useCartStore } from '@/store/cartStore'
import Header from '@/components/common/HeaderTemplate.vue'
import Footer from '@/components/common/FooterTemplate.vue';


// const cart = useCartStore()
// const loginModal = ref(false)


// const showModal = ref(false);

// onMounted(() => {
//   showModal.value = true;
// });


// I18n
// import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()
// const changeLanguage = (lang) => {
//   locale.value = lang
// }

</script>

<style scoped>
</style>