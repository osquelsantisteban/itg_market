import { apiService } from "@/services/api.service.js";


export const citiesService = {

    // allCities
    async all() {
        let url = `/marketplace-items/city`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de las categories',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },
    
    // getSimpleList
    async getSimpleList(province) {
        let url = `/marketplace-items/city`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de las categories',error: res};
                            
            //filtro los municipios de esa provincia
            let cities = res.filter(el => el.marketplace_province_id === province)
            // console.log(province)
            // console.log(cities)

            const list = [];
            for (let item of cities) {
                 
                const option = {
                    value: item.id,
                    text: item.name
                };
                
                list.push(option);
            }
            
            return list; 

            // return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

     


  
};