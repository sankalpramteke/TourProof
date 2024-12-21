import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

// Tours API
export const tourAPI = {
  getAll: () => api.get('/tours'),
  getById: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post('/tours', data),
  update: (id, data) => api.put(`/tours/${id}`, data),
  delete: (id) => api.delete(`/tours/${id}`),
  search: (params) => api.get('/tours/search', { params }),
  getPopular: (limit = 5) => api.get('/tours/popular', { params: { limit } }),
  getUpcoming: (limit = 5) => api.get('/tours/upcoming', { params: { limit } }),
  addReview: (id, data) => api.post(`/tours/${id}/reviews`, data),
};
