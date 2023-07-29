import { apiService } from "@/services/api.service.js";


export const categoriesService = {

    // allCategories
    async allCategories() {
        let url = `/marketplace-category`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de las categories',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    // getCategory
    async getCategory(id) {
        let url = `/marketplace-category/${id}`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de la categoria',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },
  
};