import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_URL; //default is localhost:3000/
const APP_ADMIN_DASHBOARD = '/admin/dashboard';
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

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

export const validateStoredToken = () => {
    const token = localStorage.getItem('access_token');
    console.log('Stored token:', token);
    if (!token) {
        console.error('No token found in localStorage');
        return false;
    }
    return true;
};

export const getID = () => {
    const currentUserId = localStorage.getItem('id');
    return currentUserId;
};

export const getAllPosts = async (page=1 , limit=10 ) => {
    try {
        const response = await api.get(`${BASE_URL}/api/post/all-post`, {
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
        throw new Error('Failed to fetch all posts');
    }
};

// Xóa bài viết
export const deletePost = async (postId) => {
    try {
        console.log('Sending delete request for postId:', postId);
        const response = await api.delete(`${BASE_URL}/api/post/delete-post/${postId}`);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to delete post');
    }
};

// Chỉnh sửa bài viết
export const modifyPost = async (postId, postData) => {
    try {
        console.log('Sending modify request for postId:', postId, 'with data:', postData);
        const response = await api.put(`${BASE_URL}/api/post/modify-post/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to modify post');
    }
};

export const getAllUsers = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`${BASE_URL}/users/admin/list-users`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to fetch users list');
    }
};

export const modifyUser = async (id, username, email) => {
    try {
        console.log('Sending modify request for userId:', id, 'with data:', { username, email });
        const response = await api.put(`${BASE_URL}/users/admin/modify-user/${id}`, { username, email });
        console.log('Modify user response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to modify user');
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`${BASE_URL}/users/admin/delete-user/${id}`);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to delete user');
    }
};

export const createUser = async (userData) => {
    try {
        const response = await api.post(`${BASE_URL}/users/admin/create-user`, userData);
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to create user');
    }
};

export const validateTargetUserId = (targetUserId, currentUserId) => {
    if (targetUserId === currentUserId) {
        throw new Error('Cannot modify your own role');
    }
    return true;
};

// Modified changeUserRole function with validation
export const changeUserRole = async (targetUserId) => {
    try {
        const currentUserId = localStorage.getItem('user_id');
        
        // Validate before making API call
        if (targetUserId === currentUserId) {
            throw new Error('You cannot change your own role');
        }

        const response = await api.put(`${BASE_URL}/users/admin/change-role`, null, {
            params: { userId: targetUserId, currentUserId: currentUserId }
        });
        return response.data;
    } catch (error) {
        if (error.message === 'You cannot change your own role') {
            console.error('Validation Error:', error.message);
            throw error;
        }
        
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data,
            headers: error.response?.headers
        });
        throw new Error('Failed to change user role');
    }
};