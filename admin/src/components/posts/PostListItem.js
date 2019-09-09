import React from 'react';
import {connect} from "react-redux";

const renderPostButtons = () => {
    return <div className="extra content">
        <div className="ui two buttons">
            <button className="ui basic green button">Edit Post</button>
            <button className="ui basic red button">Delete Post</button>
        </div>
    </div>
};


const PostItem = (props) => {
    return <div className="card">
        <div className="image">
            <img src={props.post.picture} alt="post"/>
        </div>
        <div className="content">
            <div className="header">
                {props.post.title}
            </div>
            <div className="meta">
                <span>{props.post.created}</span>
            </div>
            <div className="description">
                {props.post.description}
            </div>
        </div>
        {props.currentUser === props.post.author ? renderPostButtons(): null}
    </div>
};

const mapStateToProps = (state) => {
    return {currentUser: state.auth.user}
};

export default connect(mapStateToProps)(PostItem);
