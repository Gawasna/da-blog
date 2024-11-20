import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const APP_ADMIN_DASHBOARD = '/admin/dashboard';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            console.log('Token being used:', token); 
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getDashboard = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(APP_ADMIN_DASHBOARD, {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to fetch dashboard data');
    }
};

// Helper function to validate token format
export const validateStoredToken = () => {
    const token = localStorage.getItem('access_token');
    console.log('Stored token:', token);
    if (!token) {
        console.error('No token found in localStorage');
        return false;
    }
    return true;
};