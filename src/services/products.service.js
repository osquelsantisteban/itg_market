import { apiService } from "@/services/api.service.js";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

export const productsService = {

    // allProducts
    async allProducts() {
        let url = `/marketplace-items`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de los productos',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // search-by-criteria
    async searchProduct(params) {
        let url = `/marketplace-items/search-by-criteria`
        try {

            if(!authStore.token) authStore.getToken()

            let options = {
                url,
                method: 'post',
                token: authStore.token,
                data: params
            }
            // console.log(options)

            let res = await apiService.request(options)
            // console.log(res)
            if(!res) throw {msg: 'Error en la solicitud del producto',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // getProduct by Id
    async getProductId(id) {
        let url = `/marketplace-items/${id}`
        try {
    
            if(!authStore.token) authStore.getToken()

            let options = {
                url,
                token: authStore.token
            }
            let res = await apiService.request(options)
            if(!res) throw {msg: 'Error en la solicitud del producto',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // getProduct by keyword
    async getProductKeyword(keyword) {

        if(!authStore.token) authStore.getToken()

        let options = {
            url: '/marketplace-items/search-by-criteria',
            method: 'post',
            token: authStore.token,
            data: { keyword: keyword }
        }
        
        try {
            let res = await apiService.request(options)
            if(!res) throw {msg: 'Error en la solicitud del producto',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${options.url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // getProducts
    async getProducts(list) {        
        try {
            let promises = list.map(el => this.getProductId(el.id));
            let listProducts = await Promise.all(promises);
    
            if(listProducts.length === 0) throw {msg: 'Error en la función getProducts'};
            return listProducts;
    
        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // mergeCartWithList
    mergeCartWithList(list,cart) {        
        try {
            list.forEach(product => {
                cart.forEach(item => {
                    if (product.id === item.id) {
                        product.count = item.count;
                    }
                });
            });
            return list;
    
        } catch (error) {            
            let errorMessage = {msg: 'Error en mergeCartWithList', error};
            throw new Error(errorMessage);
        }
    },  

    // getProductsWithPrice
    getProductsWithPrice(list) {        
        try {
            
            const prod = [];
            list.forEach(product => {
                const item = product;
                const newItem = {
                    marketplace_item_id: item.id,
                    date: new Date().toISOString().slice(0,10),
                    cant: item.count,
                    price: (item.count * item.price).toString()
                  };
                  prod.push(newItem);               
            });

            return prod;

        } catch (error) {            
            let errorMessage = {msg: 'Error en mergeCartWithList', error};
            throw new Error(errorMessage);
        }
    }, 

    // getTotalPriceOfAllProducts
    getTotalPriceOfAllProducts(list) {        
        try {
            let totalPrice = 0;
            list.forEach(product => {
                    totalPrice += product.count*product.price                
            });
            return totalPrice;
    
        } catch (error) {            
            let errorMessage = {msg: 'Error en mergeCartWithList', error};
            throw new Error(errorMessage);
        }
    },  
    

};

