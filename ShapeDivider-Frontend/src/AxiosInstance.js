import axios from 'axios';

axios.defaults.headers.authorization = localStorage.getItem('token');
const instance = axios.create({
	baseURL: 'https://zindustries.org/api',
	// baseURL: 'http://localhost:6005/',
});

// export const BASE_URL = 'http://localhost:6005/';
export const BASE_URL = 'https://zindustries.org/api/';
export default instance;
