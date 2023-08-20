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
            let res = await apiService.request({ url })
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

};

