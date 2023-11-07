import { defineStore } from "pinia";
import { apiService } from "@/services/api.service.js";
import VueCookies from 'vue-cookies'
import CryptoJS from 'crypto-js'
import jwtDecode from 'jwt-decode';

export const useAuthStore = defineStore('authStore',{
    state:   () => {
        return {
            token:  null,
            is_login: false,            
        }
    },
    getters: {
                
    },
    actions: {
        async getToken(){
            try{

                let url = `/user-api/login`            
                const res = await apiService.request({url})
                if(!res.token) throw {Error: 'Error al conetarse al api y obtener el token'} 
                this.setToken(res.token);
            }catch(err){
                console.error(err)
                throw err
            }
        },

        async login(options){
            try {
                let {email,password} = options
                
                let url = `/clients/login`
                
                if(!this.token) this.getToken()
                
                const params = {                    
                    token: this.token,
                    url,
                    method: 'get',
                    headers: {
                        password,
                        email,
                    },
                }
                
                const res = await apiService.request(params)
                                
                // TODO mejorar
                // no se authentico
                if(!res) throw {message: 'Error en login',result: res}
                // if(!res.status === 'OK' || !res.data) return false;
                
                // login ok
                this.token = res.token
                this.is_login = true                
                VueCookies.set('auth',this.token)
                return true

            } catch (error) {
                console.log(error)
                throw {message: 'Error en login',result: error}
            }
        },

        async logout() {        
            try {
                
                let options = {
                    url: '/clients/logout',
                    token: this.token,
                } 
                const res = await apiService.request(options)
                // console.log(res)
                if(res) {
                    this.is_login = false
                    this.clearToken()
                    return true;
                }

                return false;

            } catch(e) {                
                console.log('problemas al desloguearse',e)
            }        
        },

        isLogin(){
            let authToken = VueCookies.get('authToken');
            if(authToken) return true
            return false
        },
        

        async whoIsLogin(){
            try {
                
                // x si no hay token
                if(!this.token) this.getToken()
                
                let id = this.decodeToken().client.id
                
                // x si no esta logeado
                if(!this.is_login && !id) return                

                let url = `/clients/${id}`                
                
                const options = {                    
                    token: this.token,
                    url,
                    method: 'get',
                }
                
                const res = await apiService.request(options)
                                                
                // hay error
                if(!res) throw {message: 'Error en login',result: res}

                return res

            } catch (error) {
                console.log(error)
                throw {message: 'Error en obtenet los datos de la persona logeado',result: error}
            }
        },

        encryptPass(pass) {
            // const decodeToken = this.decodeToken()
            const token = this.token.slice(-10)            
            let encrypted_pass = null        
            let salt = CryptoJS.lib.WordArray.random(128 / 8);        
            if (token) {
                encrypted_pass = CryptoJS.AES.encrypt(pass, token, salt).toString();
            }
            // console.log(encrypted_pass)
            return encrypted_pass
        },

        decodeToken() {
            return jwtDecode(this.token);
        },

        setToken(token) {
            this.token = token
        },

        clearToken() {
            this.token = null
        },

        async register(data){
            let result = false
            try {
                
                if(!this.token) this.getToken()
                
                let options = {
                    url: '/marketplace-user/create',
                    method: 'post',
                    token: this.token,
                    data
                }
                
                const res = await apiService.request(options)
                // console.log(res)
                if(!res) throw {message: 'Error en register',result: res}
                
                result = true
                return result
                
            } catch (error) {
                console.log(error)
                throw Error(error)
            }
            // return result

        },

        async verifyUser(data){
            
            try {
                
                // if(!this.token) this.getToken()
                // console.log(data)
                let options = {
                    url: '/verify-user',
                    method: 'post',
                    token: data.token//this.token,
                    // data
                }
                
                const res = await apiService.request(options)
                // console.log(res)
                if(!res) throw {message: 'Error en register',result: res}
                
                return true
                
            } catch (error) {
                console.log(error)
                throw Error(error)
            }        

        }
        
    },
    persist: true
});