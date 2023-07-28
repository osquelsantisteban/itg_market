import { apiService }  from "./api.service";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();



const TextService = {
    async getTextByKeys(params){
        try {
            let url = `/text/by-key/${params}`            
            
            const res = await apiService.getData(url)
            
            return res

        } catch (error) {
            console.log(error)
        }
    },

    async getFooter(){
        try {
                
                if(!authStore.bearer_token) authStore.getBearerToken()
                
                if(authStore.bearer_token){
                    
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