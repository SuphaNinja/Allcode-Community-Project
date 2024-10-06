import axios from 'axios';

// This is for development

/* const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'x-access-token': localStorage.getItem("token"),
    },
});

export default axiosInstance; */

/* This is for production */

const axiosInstance = axios.create({
    baseURL: 'https://allcode-community-project-z4em.vercel.app',
    headers: {
        'x-access-token': localStorage.getItem("token"),
    },
    withCredentials: true
});


export default axiosInstance;

