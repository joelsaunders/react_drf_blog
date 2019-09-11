import React from 'react';
import FormikPostForm from "../forms/PostForm";

const PostCreate = (props) => {

    return <div className="ui segment">
        <h3 className="ui dividing header">
            <i className="edit icon"/>
            <div className="content">
                Create A Post
            </div>
        </h3>
        <FormikPostForm
            submitAction={(payload) => {
                const pay = {...payload, ['body']: 'A', ['author']: 'joel', ['picture']: 'a'};
                console.log(pay)
            }}
            editPostAction={props.editPost}
            match={props.match}
        />
    </div>;
};

export default PostCreate;
