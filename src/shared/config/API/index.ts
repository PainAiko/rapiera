import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
