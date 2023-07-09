// Busca en una lista de elemento y si no existe redirige al not found

import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useNotFound(list,reference) {
  const route = useRoute();
  const router = useRouter();

  const element = ref(null);
  onBeforeMount(() => {
    let keyword = route.params.keyword;
    element.value = list.find(el => el[reference] == keyword);
    // element.value = list.find(el => {
    //   console.log(el[reference]==keyword)
    //   // console.log(keyword)
    //   if(el[reference] == keyword)
    //   return el
    // });
    
    if (!element.value) {
      router.push({ name: 'NotFound' });
    }
  });

  /*
  onBeforeMount(async () => {
    try {
      const response = await promise;
      element.value = response.data;
      if (!element.value) {
        router.push({ name: 'NotFound' });
      }
    } catch (error) {
      console.error(error);
      router.push({ name: 'NotFound' });
    }
  });
  */

  return { element };
}