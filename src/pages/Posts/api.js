import axios from 'axios';

const APP_POST_API = '/api/post';
const BASE_API = '/api';

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

export const getCategories = async (skip = 0, take = 3) => {
    const response = await axios.get(`/api/categories`, {
        params: { skip, take }
    });
    return response.data;
}

/**
 * Get comments for a specific post
 * @param {number} postId - The ID of the post
 * @returns {Promise<Array<{
*   id: number,
*   post_id: number,
*   user_id: number,
*   content: string,
*   created_at: string,
*   user: {
*     id: number,
*     username: string,
*     avatar: string
*   }
* }>>} Array of comment objects
*/
export const getPostComments = async (postId, page = 1, limit = 5) => {
    const response = await axios.get(`${APP_POST_API}/post/${postId}/comments`, {
        params: { page, limit }
    });
    return response.data;
}

/**
 * Add a new comment to a post
 * @param {number} postId - The ID of the post
 * @param {{content: string}} commentData - The comment data
 * @returns {Promise<{
*   comment: {
*     id: number,
*     post_id: number,
*     content: string,
*     created_at: string,
*     user: {
*       id: number,
*       username: string,
*       avatar: string
*     }
*   },
*   total_comments: number
* }>} The created comment object and total comments count
*/
export const addPostComment = async (postId, commentData) => {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(`${APP_POST_API}/${postId}/comment`, commentData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

/**
 * Like or unlike a post
 * @param {number} postId - The ID of the post
 * @returns {Promise<{
*   message: "Post liked successfully" | "Post unliked successfully"
* }>} Success message indicating if post was liked or unliked
*/
export const likePost = async (postId) => {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(`${APP_POST_API}/${postId}/like`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

/**
 * Get the total number of comments for a post
 * @param {number} postId - The ID of the post
 * @returns {Promise<{
*   post_id: string,
*   total_comments: number
* }>} Object containing post ID and total comments count
*/
export const getPostCommentCount = async (postId) => {
    const response = await axios.get(`${APP_POST_API}/post/${postId}/comment-count`);
    return response.data;
}

export const getPostContent = async (postId) => {
    const response = await axios.get(`${APP_POST_API}/post/${postId}/content`);
    return response.data;
}

export const getPostThumbnail = async (postId) => {
    const response = await axios.get(`${APP_POST_API}/post/${postId}/thumbnail`);
    return response.data;
}

export const getPostById = async (postId) => {
    const response = await axios.get(`${APP_POST_API}/${postId}`);
    return response.data;
}

/**
 * @typedef {Object} Category
 * @property {string} name - The name of the category
 */

/**
 * @typedef {Object} Post
 * @property {number} id - The ID of the post
 * @property {string} title - The title of the post
 * @property {string} image_path - The path to the image associated with the post
 * @property {string} created_at - The creation date of the post in ISO format
 * @property {string} description - The description of the post
 * @property {Category} category - The category of the post
 */

/**
 * @typedef {Post[]} Posts
 */
export const getPopularPosts = async () => {
    const response = await axios.get(`${APP_POST_API}/popular`);
    return response.data;
}

/**
 * Check if the user has liked a post
 * @param {number} postId - The ID of the post
 * @param {Object} credentials - The user credentials
 * @returns {Promise<{ isLiked: boolean(true | false) }>} Object indicating if the post is liked by the user
 */
export const checkLike = async (postId) => {
    const token = localStorage.getItem('access_token'); // Or however you store your auth token
    const response = await axios.get(`${APP_POST_API}/${postId}/check-like`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const getNCategory = async () => {
    const res = await axios.get(`${BASE_API}/categories`);
    return res.data;
}