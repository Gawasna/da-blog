import axios from 'axios';

const APP_POST_API = '/api/post';

export const getBanners = async (credentials) => {
    const response = await axios.get(`${APP_POST_API}/banner`, credentials);
    return response.data;
}

export const getLatestPosts = async (offset = 0, limit = 6) => {
    const response = await axios.get(`${APP_POST_API}/latest`, {
        params: { offset, limit }
    });
    return response.data;
}

export const liveSearching = async (query) => {
    const response = await axios.get(`${APP_POST_API}/live-search`, {
        params: { query } 
    });
    return response.data;
}