import axios from 'axios';

const baseURL = 'https://harvesthub-backend.onrender.com/api';

const api = axios.create({
  baseURL,
});

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);


const apis = {
  registerUser,
  loginUser,
};

export default apis;
