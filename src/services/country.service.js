import { apiService } from "@/services/api.service.js";


export const countriesService = {

    // allCountries
    async all() {
        let url = `/country`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de las country',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },        

    // getSimpleList
    async getSimpleList() {
        let url = `/country`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de los country',error: res};

            const list = [];
            for (let item of res) {
                 
                const option = {
                    value: item.id,
                    text: item.alias
                };
                
                list.push(option);
            }

            return list;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },
  
};