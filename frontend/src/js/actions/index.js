import axios from 'axios';

const API_URL = process.env.BASE_API_URL;

export const CURRENT_VIEW = 'CURRENT_VIEW';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';


function generateUrl(endpoint) {
    if (API_URL === null) {
        return `/api/${endpoint}/`;
    } else {
        return `${API_URL}${endpoint}/`;
    }
}


export function selectView(view) {
    return {
        type: CURRENT_VIEW,
        payload: view
    };
}

export function fetchPosts() {
    const url = generateUrl('posts');
    const request = axios.get(url);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function fetchPost(postId) {
    const url = generateUrl(`posts/${postId}`);
    const request = axios.get(url);

    return {
        type: FETCH_POST,
        payload: request
    };
}