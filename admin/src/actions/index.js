import theBookOfJoel from "../apis/theBookOfJoel";
import {saveState} from "../localStorage";

export const FETCH_POSTS = 'FETCH_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const CREATE_POST = 'CREATE_POST';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';


export const fetchPosts = () => async dispatch => {
    const response = await theBookOfJoel.get(
        'api/posts/',
        {params: {fields: 'slug,title,description,author,picture,created,tags'}}
    );
    dispatch({type: FETCH_POSTS, payload: response.data.results})
};

export const editPost = (postId, data) => async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
        const response = await theBookOfJoel.patch(
            `/api/posts/${postId}/`,
            data,
            {headers: {Authorization: `Token ${token}`}}
        );
        dispatch({type: EDIT_POST, payload: response.data})
    } catch (err) {
        if (err.response.status === 401) {
            dispatch(signOut())
        }
        console.log(err);
    }
};

export const createPost = (data) => async (dispatch, getState) => {
    const {token, user} = getState().auth;


    try {
        const response = await theBookOfJoel.post(
            `api/posts/`,
            {...data, ...{author: user, published: true}},
            {headers: {Authorization: `Token ${token}`}}
        );
        dispatch({type: CREATE_POST, payload: response.data})
    } catch (err) {
        if (err.response.status === 401) {
            dispatch(signOut())
        }
        console.log(err);
    }
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
