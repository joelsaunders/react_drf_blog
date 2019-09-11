import React from 'react';
import FormikPostForm from "../forms/PostForm";
import {createPost} from "../../actions";
import {connect} from "react-redux";

const PostCreate = (props) => {

    return <div className="ui segment">
        <h3 className="ui dividing header">
            <i className="edit icon"/>
            <div className="content">
                Create A Post
            </div>
        </h3>
        <FormikPostForm
            submitAction={props.createPost}
            match={props.match}
        />
    </div>;
};

export default connect(null, {createPost})(PostCreate);
