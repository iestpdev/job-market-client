import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
