import axios from 'axios';

const APP_POST_API = '/api/post';

export const getBanners = async (credentials) => {
    const response = await axios.get(`${APP_POST_API}/banner`, credentials);
    return response.data;
}

export const getLatestPosts = async (page = page, limit = limit) => {
    const response = await axios.get(`${APP_POST_API}/latest`, {
        params: { page, limit }
    });
    return response.data;
}

export const liveSearching = async (query) => {
    const response = await axios.get(`${APP_POST_API}/live-search`, {
        params: { query } 
    });
    return response.data;
}