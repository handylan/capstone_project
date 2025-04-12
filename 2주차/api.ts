import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
    headers: {},
    withCredentials: true
});

axiosInstance.interceptors.response.use(res => res, error => {
    console.log('에러 인터셉터 : ', error);
    return Promise.reject(error)
})