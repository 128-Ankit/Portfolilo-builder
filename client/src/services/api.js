 
import axios from 'axios';

const baseURL = 'http://localhost:5000'
const api = axios.create({
    baseURL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signup = (data) => api.post('/api/auth/signup', data);
export const login = (data) => api.post('/api/auth/login', data);
export const getTemplates = () => api.get('/api/portfolio');
export const getTemplateById = (templateId) => api.get(`/api/portfolio/${templateId}`);
export const createPortfolio = (data,templateId) => api.post(`/api/${templateId}`, data);
export const getPortfolioById = (portfolioId) => api.get(`/api/portfolios/${portfolioId}`);
export const getHome = () => api.get(`/api/portfolio/${id}`);
export const updateHome = (data) => api.put('/api/home', data);

export default api;