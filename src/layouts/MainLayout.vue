<template>    
    <!-- <div class="flex flex-col min-h-screen"> -->
        <!-- Header -->
        <component :is="headerComponent"/>
        
        <main class="flex-grow w-10/12 mx-auto mt-28 md:mt-20">           
                <slot ></slot>
        </main>
        
        <Footer />
    <!-- </div> -->
</template>

<script setup>
import { ref } from 'vue';
import HeaderDesktopTemplate from '@/components/common/HeaderDesktopTemplate.vue'
import HeaderMovilTemplate from '@/components/common/HeaderMovilTemplate.vue'
import Footer from '@/components/common/FooterTemplate.vue';

const detectDeviceType = () => {
    const userAgent = navigator.userAgent;
    const isMobile = !!userAgent.match(/iPhone|iPad|iPod|Android/i);
    const isTablet = !!userAgent.match(/iPad/i);
    const pointBreak = window.matchMedia('(min-width: 630px)').matches;
    const isDesktop = !isMobile && !isTablet && pointBreak;
    
    return isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile';
}
  
const isMovil = () => {
    if(detectDeviceType() === 'mobile')
        return true;
    return false; 
}

const headerComponent = ref(isMovil() ? HeaderMovilTemplate : HeaderDesktopTemplate);

</script>
