import { apiService } from "@/services/api.service.js";


export const provincesService = {

    // allProvinces
    async all() {
        let url = `/marketplace-items/provinces`
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
    async getSimpleList() {
        let url = `/marketplace-items/provinces`
        try {
            let res = await apiService.request({ url })
            if(!res) throw {msg: 'Error en la solicitud de las categories',error: res};
                            
            // if (res.status !== 200) throw {msg: 'Error en la solicitud de las categories',error: res};
            // console.log(res)
            const list = [];
            for (let item of res) {
                 
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