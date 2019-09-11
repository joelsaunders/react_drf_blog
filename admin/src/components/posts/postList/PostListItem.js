import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Modal from "../../Modal";

const renderDeleteModal = (setDeleteModalActive) => {
    return <Modal onDismiss={() => {setDeleteModalActive(false)}}>
        Are you sure you want to delete this post?
        <button>Delete</button>
        <button onClick={() => {setDeleteModalActive(false)}}>Cancel</button>
    </Modal>;
};

const renderPostButtons = (post, setDeleteModalActive) => {
    return <div className="extra content">
        <div className="ui two buttons">
            <Link className="ui basic green button" to={`/posts/edit/${post.slug}`} >
                Edit Post
            </Link>
            <button onClick={setDeleteModalActive} className="ui basic red button">Delete Post</button>
        </div>
    </div>
};


const PostItem = (props) => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);

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
        {props.currentUser === props.post.author ? renderPostButtons(props.post, setDeleteModalActive): null}
        {deleteModalActive? renderDeleteModal(setDeleteModalActive): null}
    </div>
};

const mapStateToProps = (state) => {
    return {currentUser: state.auth.user}
};

export default connect(mapStateToProps)(PostItem);
