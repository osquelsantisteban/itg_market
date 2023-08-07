import { apiService }  from "./api.service";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();



const TextService = {
    async getTextByKeys(params){
        try {
            let url = `/text/by-key/${params}`            
            
            // const res = await apiService.getData(url)
            const res = await apiService.request({url})
            if(!res) throw {msg:'Error en la solicitud de textos del footer',error:res}
            return res

        } catch (error) {
            console.log(error)
        }
    },

    async getFooter(){
        try {
                
                if(!authStore.token) authStore.getToken()
                
                if(authStore.token){
                    
                    const [direccion, phones, copyright] = await Promise.all([
                        this.getTextByKeys('direccion'),
                        this.getTextByKeys('contact-phone'),
                        this.getTextByKeys('copyright'),
                    ])
                    
                
                return { direccion,phones, copyright }
                }
            
        } catch (error) {
            console.error(`Error: ${error}`);            
        }
    }
}

export default TextService