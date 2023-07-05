import { defineStore } from "pinia";

export const useCartStore = defineStore('cartStore',{
    state:   () => {
        return {
            prod:[],
        }
    },
    getters: {
        totalProducts(state){
            let totalProducts = 0; 
            state.prod.forEach((el)=>{
                console.log(el.count)
                totalProducts += el.count
            })
            return totalProducts
        }
    },
    actions: {
        addProduct(product) {
            const existingProduct = this.prod.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.count++;
            } else {
                this.prod.push({...product, count: 1});
            }
        },
        removeProduct(product) {
            const existingProduct = this.prod.find(p => p.id === product.id);
            if (existingProduct && existingProduct.count > 0) {
                existingProduct.count--;
                if (existingProduct.count === 0) {
                    this.prod = this.prod.filter(p => p.id !== product.id);
                }
            }
        },
    },
    persist: true
});