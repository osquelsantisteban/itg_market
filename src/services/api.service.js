import axios from 'axios';
import API from '../../config.js';

const httpClient = axios.create(API.CONFIG);

export const apiService = {

    async request({ url, params = {}, data = {}, method = 'get', auth = false, token = '' }) {
        try {
            const headers = { "Content-type": "application/json; charset=utf-8" };
            
            if (auth) {
                headers.Authorization = 'Bearer ' + token;
            }

            const options = {
                method,
                headers,
                data,
                params,
            };

            const response = await httpClient(url, options);

            if (response.status === 200) return response.data;            

            throw response;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },

    getData(url, params) {
        return this.request({ url, params, method: 'get' });
    },

    getBearerData(token,url,method,params) {
        return this.request({ url, params, method, auth: true, token });
    },
    
};

    

    /* init(baseURL) {
        httpClient.defaults.baseURL = baseURL;
    }, */

    /* setHeader() {
        httpClient.defaults.headers.common["Authorization"] = `Bearer ${useAuthStore.token}`
    }, */

    /* async login(){
        if (!useAuthStore.token) {
            try {
                const { status, data } = await httpClient.get(`/user-api/login`)
                if (status === 200) {
                    useAuthStore.setToken(data.token)
                    return data.token
                }
            } catch (e) {
                return {
                    success: false,
                    errors: e//.response.data.errors.password[0]
                }
            }
        }
    }, */



    /* async checkLogin(url, paramsData = {}, method = 'get') {
        // Check if we are logged in the API
        const request_config = {
                url,
                method
            },
            token = sessionStorage.getItem('token')

        if (paramsData.data) request_config.data = paramsData.data
        if (paramsData.params) request_config.params = paramsData.params

        if (sessionStorage.getItem('token')) {
            if (paramsData.auth === 'bearer') {           
                let req = null;
                if (method === 'get')
                    req = this.getAxiosToken(token, config.baseURL + url)
                else
                    req = this.otherAxiosToken(token, config.baseURL + url, paramsData, method)
                try {                    
                    return await req
                } catch (err) {
                    // Comprueba si el token está vencido
                    if (err.response && err.response.status === 401) {
                        // Refresca el token
                        await this.refreshToken();
                        // Reintenta la solicitud
                        if (method === 'get')
                            req = this.getAxiosToken(sessionStorage.getItem('token'), config.baseURL + url)
                        else
                            req = this.otherAxiosToken(sessionStorage.getItem('token'), config.baseURL + url, paramsData, method)
                    
                        return await req;
                    } else {
                        throw err;
                    }
                }
            }
            return axios.get(config.baseURL + url, { 
                auth: {
                    username: 'api@admin.com',
                    password: 'IT_api'
                }
            }).then(resp => {
                return resp
            }).catch(err => {
                return err
            })

        }
        await this.login()
        await this.checkLogin()

    }, */

/*     async logout() {        
        try {
            // Llamando al API para desloguearse
            const res = await this.checkLogin(`/clients/logout`, {auth: 'bearer'})
            if(res.status === 200) {
                sessionStorage.setItem('token', res.data.token)              
                authService.destroyLocalUserData()
            }
        } catch(e) {                
            console.log('problemas al desloguearse')
            console.log(e)
        }        
    }, */
