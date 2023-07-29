import { defineStore } from "pinia";
import { apiService } from "@/services/api.service.js";
import VueCookies from 'vue-cookies'
import CryptoJS from 'crypto-js'

export const useAuthStore = defineStore('authStore',{
    state:   () => {
        return {
            bearer_token:  null,
            is_login: false,            
        }
    },
    getters: {
                
    },
    actions: {
        async getBearerToken(){
            try{

                let url = `/user-api/login`            
                const res = await apiService.request({url})
                if(!res.token) throw {Error: 'Error al conetarse al api y obtener el token'} 
                this.setBearerToken(res.token);
            }catch(err){
                console.error(err)
                throw err
            }
        },

        async login(options){
            try {
                let {email/* ,password */} = options
                
                // console.log(params)
                // password = this.encryptPass(password)
                // let encodedPassword = encodeURIComponent(password);
                let password = 'U2FsdGVkX19nKhj+FoOALeZYUcure2ZAUHKlkPkGoaEycIUupvFYSdUrIsknolqU'
                // let email = 'manager@iristravelgroup.com'
                // let url = `/clients/login`
                let url = `/clients/login?email=${email}&password=${password}`
                
                if(!this.bearer_token) this.getBearerToken()

                /* const params = {
                    auth: true,
                    token: this.bearer_token,
                    headers: {
                        password,
                        email,
                    },
                    url,
                } */
                const params = {
                    auth: true,
                    token: this.bearer_token,
                    /* headers: {
                        password,
                        email,
                    }, */
                    url,
                }
                
                // const res = await apiService.getBearerData(params)
                // console.log(params)
                const res = await apiService.request(params)
                console.log(res)
                if(!res) throw {message: 'Error en login',result: res}
                
                VueCookies.set('auth','hola cookie')
                // console.log(res)
                // VueCookies.set('auth',res.token);
            } catch (error) {
                console.log(error)
                throw {message: 'Error en login',result: error}
            }
        },

        isLogin(){
            let authToken = VueCookies.get('authToken');
            if(authToken) return true
            return false
        },

        whoIsLogin(){
            let username = VueCookies.get('username');
            if(username) return username
            return false
        },

        encryptPass(pass) {
            
            const token = this.bearer_token.slice(-10)            
            let encrypted_pass = null        
            let salt = CryptoJS.lib.WordArray.random(128 / 8);        
            if (token) {
                encrypted_pass = CryptoJS.AES.encrypt(pass, token, salt).toString();
            }
            // console.log(encrypted_pass)
            return encrypted_pass
        },

        setBearerToken(token) {
            this.bearer_token = token
        },

        clearToken() {
            this.bearer_token = null
        },
        
    },
    persist: true
});