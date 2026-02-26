import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://fintrack-server-4n3g.onrender.com'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // হেডারে Bearer টোকেন সেট করা
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // ৪০১ বা ৪০৩ এরর (টোকেন সমস্যা) হলে অটো লগআউট করাবে
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;