import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL : API_BASE_URL
})