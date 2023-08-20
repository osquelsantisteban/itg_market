import axios from 'axios';
import API from '../../config.js';

const httpClient = axios.create(API.CONFIG);

export const apiService = {

      async request(conf) {
        try {
          const { url, params = {}, headers = {}, data = {}, method = 'get', token } = conf;
          const finalHeaders = { ...headers, "Content-type": "application/json; charset=utf-8" };

          if (token) {
            finalHeaders.Authorization = 'Bearer ' + token;
          }

          const options = {
            method,
            headers: finalHeaders,
            data,
            params,
          };

          if(!token){            
            options.auth = API.AUTH;
          }
          
          const response = await httpClient(url, options);          
          
          // Si la respuesta es exitosa, retorna los datos
          if (response.status === 200) return response.data;
                
          switch (response.status) {
            case 400:
              throw new Error('Solicitud incorrecta');
            
            case 401:
              throw new Error('No autorizado');
            
            case 404:
              throw new Error('Recurso no encontrado');
                      
            default:
              throw new Error(`Error inesperado: ${response.status}`);
          }
      
        } catch (error) {          
          let errorMessage = `Error ${error.response?.status || 'desconocido'}: ${error.response?.statusText || error.message}\nURL: ${conf.url}\nResponse data: ${JSON.stringify(error.response?.data)}`;
          throw new Error(errorMessage);
        }
      },
    
};