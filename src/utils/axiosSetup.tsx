import axios from "axios";
import { useNavigate } from "react-router-dom";



const refreshAccessToken = async () => {
    try {
        const response = await axios.post("api/token", {
            token: document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        });

        localStorage.setItem('accessToken', response.data.accessToken);

        return response.data.accessToken
    } catch (err: any) {
        if (err.response && err.response.status === 403) {
            logout(); // เรียก logout หาก token ไม่ถูกต้อง
        }
        throw err
    }
}

const logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    navigate("/") // ไปหน้าแรก
}

// ตั้งค่า Axios Interceptor
const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;