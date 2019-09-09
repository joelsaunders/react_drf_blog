import theBookOfJoel from "../apis/theBookOfJoel";
import {saveState} from "../localStorage";

export const FETCH_POSTS = 'FETCH_POSTS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const fetchPosts = () => async dispatch => {
    const response = await theBookOfJoel.get(
        '/api/posts/',
        {params: {fields: 'slug,title,description,author,picture'}}
    );
    dispatch({type: FETCH_POSTS, payload: response.data.results})
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
