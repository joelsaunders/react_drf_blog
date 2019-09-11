import _ from 'lodash';
import {EDIT_POST, FETCH_POSTS} from "../actions";

export default (state=[], action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload, 'slug');
        case EDIT_POST:
            return {...state, [action.payload.slug]: action.payload}
        default:
            return state
    }
};
