import axios from 'axios';

const instance = axios.create({
   baseURL: 'YOUR_URL'
});

export default instance;