import axios from "axios";
import { Cookies } from 'react-cookie';

const ApiHttp = axios.create({
  baseURL: "/mini"
});

// AC 토큰을 얻어오는 함수
export const getAccessToken = () => {
  const cookie = new Cookies();
  const acToken = cookie.get('AC_TOKEN'); // 실제 AC 토큰 값 가져오기
  return acToken;
};

// API 요청을 보낼 때 AC 토큰을 포함한 설정 생성
export const ApiHttpWithAuth = axios.create({
  baseURL: "/mini"
});


ApiHttpWithAuth.interceptors.request.use(
  (config) => {
    const acToken = getAccessToken(); // AC 토큰 가져오기
    if (acToken) {
      config.headers.Authorization = `Bearer ${acToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiHttp;
