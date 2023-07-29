import axios from 'axios';
import API from '../../config.js';

const httpClient = axios.create(API.CONFIG);

export const apiService = {

    async request(conf) {
        try {
            
            let {url,params= {},headers = {},data = {}, method = 'get', auth = false, token = ''} = conf;
            
            headers = { ...headers, "Content-type": "application/json; charset=utf-8" };
            
            if (auth) {
                headers.Authorization = 'Bearer ' + token;
            }
            
            const options = {
                method,
                headers,
                data,
                params,
            };
            // console.log(options)
            
            const response = await httpClient(url, options);

            if (response.status === 200) return response.data;            

            throw response;

        } catch (error) {            
            let errorMessage = `Error ${error.response?.status}: ${error.response?.statusText}\nURL: ${conf.url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
            throw new Error(errorMessage);
        }
    },
    
};