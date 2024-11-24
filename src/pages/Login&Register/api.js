import axios from 'axios';

const APP_AUTH_API = '/api/auth';
const APP_POST_API = '/api/posts';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${APP_AUTH_API}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${APP_AUTH_API}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${APP_AUTH_API}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Add your implementation here
  } catch (error) {
    throw error;
  }
};

export const getBanners = async (credentials) => {
  try {
    const response = await axios.get(`${APP_POST_API}/banner`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestOtp = async (email) => {
  try {
    const response = await axios.post(`${APP_AUTH_API}/request-otp`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(`${APP_AUTH_API}/verify-otp&reset-password`, { email, otp, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};