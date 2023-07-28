import router from "@/router";
import { defineStore } from "pinia";

export const useSearchStore = defineStore('searchStore',{
    state:   () => {
        return {
            search: '',
        }
    },    
    actions: {
        // Busca en los todos
        searchAll() {
            router.push({name: 'SearchResult',params:{keyword: this.search}})
            // alert(`vamos a buscar ${this.search}`)
        },

        // Busca en los productos
        searchProduct() {
            alert(`vamos a buscar ${this.search}`)
        },

        // Busca en las categorias
        searchCategories() {
            alert(`vamos a buscar ${this.search}`)
        },

        
    },
    persist: true
});