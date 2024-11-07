import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const loginUser = async (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const registerUser = async (email: string, password: string) => {
  return api.post('/register', { email, password });
};

export const fetchUsers = async (page = 1) => {
  return api.get(`/users?page=${page}`);
};

export const updateUser = async (id: string, userData: { first_name: string, last_name: string, email: string }) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = async (id: string) => {
  return api.delete(`/users/${id}`);
};
