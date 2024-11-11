import axios from "axios";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/e-com-store";

const refreshAccessToken = async () => {
    const { token, refreshToken, setToken } = useEcomStore.getState();
    try {
        const response = await axios.post("http://localhost:3000/api/token", {
            
            token: refreshToken
        });
        
        // Set new access token in Zustand
        setToken(response.data.accessToken);

        return response.data.accessToken;
    } catch (err: any) {
        if (err.response && err.response.status === 403) {
            logout(); // Call logout if token is invalid
        }
        throw err;
    }
}

const logout = () => {
    const navigate = useNavigate();
    useEcomStore.getState().clearAuth(); // Clear authentication tokens in Zustand
    navigate("/"); // Redirect to home page
}

// Axios Interceptor Setup
const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const { token } = useEcomStore.getState();
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
