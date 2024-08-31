import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://allcode-community-project-z4em.vercel.app',
    headers: {
        'x-access-token': localStorage.getItem("token"),
    },
});

export default axiosInstance;