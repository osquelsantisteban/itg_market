import { defineStore } from "pinia";

export const useCartStore = defineStore('cartStore',{
    state:   () => {
        return {
            prods:[],
        }
    },
    getters: {
        
        // Cantidad de elementos en el carrito 
        totalProducts(state){
            let totalProducts = 0; 
            state.prods.forEach((el) => {
                totalProducts += el.count
            })
            return totalProducts
        },
        
        // Suma de todos los precios de los productos
        totalPrice(state){
            let totalPrice = 0; 
            state.prods.forEach((el) => {                
                totalPrice += el.count*el.price
            })
            return totalPrice
        },

        // Suma los precios de un solo tipo de producto
        prodPrice: (state) => (prodId) => {
            const product = state.prods.find(prod => prod.id === prodId)
            return product ? product.count*product.price : 0
        }
    },
    actions: {
        // Add un producto
        addProduct(product) {
            const existingProduct = this.prods.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.count++;
            } else {
                this.prods.push({...product, count: 1});
            }
        },

        // Elimina un solo producto
        removeProduct(product) {
            const existingProduct = this.prods.find(p => p.id === product.id);
            if (existingProduct && existingProduct.count > 0) {
                existingProduct.count--;
                if (existingProduct.count === 0) {
                    this.prods = this.prods.filter(p => p.id !== product.id);
                }
            }
        },

        // Elimina todos los productos de ese tipo
        deleteAllProductsOf(prodId) {
            const index = this.prods.findIndex(prod => prod.name === prodId);            
            if (index !== -1) {
              this.prods.splice(index, 1);
              return true
            }else return false

        },

        // Elimina todos los productos del store
        clearAllProducts(){
            this.prods = [];
        }
    },
    persist: true
});