import {combineReducers} from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import postDetailReducer from "./postDetailReducer";


export default combineReducers({
    posts: postReducer,
    auth: authReducer,
    currentPost: postDetailReducer
});
