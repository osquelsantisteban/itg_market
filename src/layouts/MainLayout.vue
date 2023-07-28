<template>    
        
        <Header />
        
        <main class="flex-grow w-full p-2 md:w-11/12 lg:w-10/12 mx-auto mt-28 md:mt-20">
            <slot ></slot>
        </main>
        
        <Footer />    
</template>

<script setup>
// import { ref } from 'vue';
import Header from '@/components/common/HeaderTemplate.vue'
import Footer from '@/components/common/FooterTemplate.vue';

// const detectDeviceType = () => {
//     const userAgent = navigator.userAgent;
//     const isMobile = !!userAgent.match(/iPhone|iPad|iPod|Android/i);
//     const isTablet = !!userAgent.match(/iPad/i);
//     const pointBreak = window.matchMedia('(min-width: 630px)').matches;
//     const isDesktop = !isMobile && !isTablet && pointBreak;
    
//     return isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile';
// }
  
// const isMovil = () => {
//     if(detectDeviceType() === 'mobile')
//         return true;
//     return false; 
// }

// const headerComponent = ref(isMovil() ? HeaderMovilTemplate : HeaderDesktopTemplate);

</script>
<style scoped>

main{
    min-height: calc(100vh - 300px);
}
</style>