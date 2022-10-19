import axios from 'axios';

const token = localStorage.getItem('token') || null


export default axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {Authorization: `Bearer ${token}`},
    timeout: 2000
});