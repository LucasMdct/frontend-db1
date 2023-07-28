import JwtDecode from 'jwt-decode';

const LocalStorageH = {
  setToken(tkn) {
    window.localStorage.setItem('AUTHENTICATION_TOKEN', tkn);
  },
  getToken() {
    return window.localStorage.getItem('AUTHENTICATION_TOKEN');
  },
  removeToken() {
    window.localStorage.removeItem('AUTHENTICATION_TOKEN');
  },
  isAuthenticated() {
    try {
      const tkn = LocalStorageH.getToken();

      if (!tkn) return false;

      const payload = JwtDecode(tkn);

      const expirationDate = new Date(payload.exp * 1000);
      const currentDate = new Date();

      return expirationDate > currentDate;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
};

export default LocalStorageH;
