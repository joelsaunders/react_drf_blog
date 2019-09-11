import theBookOfJoel from "../apis/theBookOfJoel";
import {saveState} from "../localStorage";

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const EDIT_POST = 'EDIT_POST';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const fetchPosts = () => async dispatch => {
    const response = await theBookOfJoel.get(
        '/api/posts/',
        {params: {fields: 'slug,title,description,author,picture'}}
    );
    dispatch({type: FETCH_POSTS, payload: response.data.results})
};

export const fetchPost = (postId) => async dispatch => {
    const response = await theBookOfJoel.get(
        `/api/posts/${postId}/`,
        {params: {fields: '__all__'}}
    );
    dispatch({type: FETCH_POST, payload: response.data})
};

export const editPost = (postId, data) => async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await theBookOfJoel.patch(
        `/api/posts/${postId}/`,
        data,
        {headers: {Authorization: `Token ${token}`}}
    );

    dispatch({type: EDIT_POST, payload: response.data})
};

export const signIn = (user, token) => {
    const payload = {user: user, token: token};
    saveState({auth: payload});
    return {type: SIGN_IN, payload: payload}
};

export const signOut = () => {
    const payload = {user: null, token: null};
    saveState({auth: payload});
    return {type: SIGN_OUT, payload: payload}
};
