import router from "@/router";
import { apiService } from "@/services/api.service";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore();

export const useSearchStore = defineStore('searchStore',{
    state:   () => {
        return {
            type: 'all',
            search: '',
            // filter
            min: null,
            max: null,
        }
    },    
    actions: {
        // Busca en los todos
        goToSearchView() {
            router.push({name: 'SearchResult',params:{keyword: this.search}})
            // alert(`vamos a buscar ${this.search}`)
        },

        // getSearch
        async getSearch() {

            let url = '/marketplace-items/search-by-criteria'
            if(!authStore.token) authStore.getToken()

            let options = {
                url,
                token: authStore.token,
                method: 'post',
                data:{
                    type: this.type,
                    value: this.search
                }
            }

            try {
                let res = await apiService.request(options)
                if(!res) throw {msg: 'Error en la búsqueda',error: res};

                // Uno los resultados y elimino duplicados
                if(this.type === 'all'){
                    const uniqueValues = new Set([...res[0], ...res[1]]);
                    return [...uniqueValues];
                }
                return res;

            } catch (error) {            
                let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
                throw new Error(errorMessage);
            }
        },

        // clearSearch
        clearSearch(){
            this.search = ''
        },

        // filter
        async filter(values) {
            let url = `/marketplace-items/search-by-criteria`
            let type = 'price'
            let {min,max} = values
            try {
                let res = await apiService.request({ url,data: {type,min,max} })
                if(!res) throw {msg: 'Error en la busqueda',error: res};

                return res;

            } catch (error) {            
                let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
                throw new Error(errorMessage);
            }
        },

        // clearfilter
        clearFilter(){
            this.min = null
            this.max = null
        },
        
    },
    persist: true
});