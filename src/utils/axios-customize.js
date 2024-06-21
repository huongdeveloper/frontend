
import axios from "axios";
import { doLogoutAction } from "../redux/account/accountSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";

const instance = axios.create({
    baseURL: `https://apilandinvest.gachmen.org`,
});

const handleLogOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    message.success('Đăng xuất thành công!');
  };
instance.interceptors.request.use(
  config => {
      const token = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      console.log("refreshToken: ",refreshToken)
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log("config: ",config)
          console.log("token: ",token)
      }
      if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response?.status === 401) {
        handleLogOut();
      }
  
      return Promise.reject(error);
    }
  );
export default instance;