import { apiService } from "@/services/api.service.js";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();


export const bookingService = {

    // all by user
    async allByUser() {
        let options = {
            url: `/bookings/by-user`,
            token: authStore.token, 
        }
        
        try {
            let res = await apiService.request(options)
            if(!res) throw {msg: 'Error en la solicitud de las allByUser',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${options.url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },        

    async create(data){
        let options = {
            url: `/bookings/create`,
            token: authStore.token,
            data: data
        }

        try {
            let res = await apiService.request(options)
            if(!res) throw {msg: 'Error en la solicitud de las create',error: res};

            return res;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${options.url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    }
  
};