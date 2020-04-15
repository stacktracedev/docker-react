import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-builder-c30b8.firebaseio.com/' 
});

export default instance;