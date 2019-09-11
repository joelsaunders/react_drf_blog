import React from 'react';
import {editPost} from "../../actions";
import {connect} from "react-redux";
import FormikPostForm from "../forms/PostForm";
import useCurrentPost from "../../hooks/useCurrentPost";


const PostEdit = (props) => {
    const postSlug = props.match.params.slug;
    const currentPost = useCurrentPost(postSlug);


    if (!currentPost) {
        return <div className="ui very padded loading segment" />
    }

    return <div className="ui segment">
        <h3 className="ui dividing header">
            <i className="edit icon"/>
            <div className="content">
                Edit post: {currentPost.title}
            </div>
        </h3>
        <FormikPostForm
            submitAction={(payload) => props.editPost(postSlug, payload)}
            post={currentPost}
            match={props.match}
        />
    </div>;
};

export default connect(null, {editPost})(PostEdit);
