import axios from 'axios';

const APP_AUTH_API = '/api/auth';
const APP_POST_API = '/api/posts';

export const login = async (credentials) => {
  const response = await axios.post(`${APP_AUTH_API}/login`, credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${APP_AUTH_API}/signup`, userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${APP_AUTH_API}/logout`);
  return response.data;
};

export const getCurrentUser = async () => {};

export const getBanners = async (credentials) => {
  const response = await axios.get(`${APP_POST_API}/banner`, credentials);
  return response.data;
}

export const forgotPassword = async (email) => {
  const response = await axios.post(`${APP_AUTH_API}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${APP_AUTH_API}/reset-password`, { token, password });
  return response.data;
};