import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
    baseURL: !isLocal
        ? 'https://allcode-community-project-z4em.vercel.app'
        : 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor to dynamically set the token
axiosInstance.interceptors.request.use( 
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;