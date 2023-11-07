import { apiService } from "@/services/api.service.js";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "vue-router";

// const authStore = useAuthStore();
// const router = useRouter()

export const bookingService = {

    // all by user
    async allByUser(token,is_login, router) {
        
        // Si no esta logeado
        if (!is_login) router.push({ name: 'Login' });


        let options = {
            url: `/bookings/by-user`,
            token: token, 
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

    async create(data,token){

        // if(!authStore.token) authStore.getToken()
        
        let options = {
            url: `/booking/create`,
            token: token,
            method: 'post',
            data: {data}
        }
        console.log(options)
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