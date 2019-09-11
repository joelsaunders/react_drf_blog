import React, {useEffect} from 'react';
import {editPost, fetchPost} from "../../../actions";
import {connect} from "react-redux";
import FormikPostEditForm from "./PostEditForm";


const PostEdit = (props) => {
    const postSlug = props.match.params.slug;
    const {fetchPost} = props;

    useEffect(() => {
        (async () => await fetchPost(postSlug))();
    }, [postSlug, fetchPost]);


    if (!props.currentPost) {
        return <div>Loading...</div>
    }

    return <div className="ui content">
        <h3 className="ui header">
            <i className="edit icon"/>
            <div className="content">
                Edit post: {props.currentPost.title}
            </div>
        </h3>
        <FormikPostEditForm
            editPostAction={props.editPost}
            post={props.currentPost}
            match={props.match}
        />
    </div>;
};

const mapStateToProps = (state) => {
    return {currentPost: state.currentPost}
};

export default connect(mapStateToProps, {fetchPost, editPost})(PostEdit);
