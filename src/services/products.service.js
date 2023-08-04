import { apiService } from "@/services/api.service.js";


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
        let url = `/marketplace-items/${keyword}`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud del producto',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

};

