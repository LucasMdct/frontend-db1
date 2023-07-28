import axios from 'axios';
import LocalStorageH from './helpers/localstorage_h';


/**
 * Configura a URL base do backend, pegando o valor da variável de ambiente
 * do arquivo env.development
 *
 * Docs: https://vitejs.dev/guide/env-and-mode.html
 */
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use((request) => {
  /**
   * Utiliza um intessrceptor do axios para injetar automaticamente o token
   * de autenticação na requisição
   *
   * Docs: https://axios-http.com/docs/interceptors
   */
  const tkn = LocalStorageH.getToken();
  if (tkn) {
    request.headers.authorization = `Bearer ${tkn}`;
  }
  
  return request;
});
