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
    return <div className="absolute flex flex-row top-0 right-0 mt-2">
        <Link className="mr-2" to={`/posts/edit/${post.slug}`} >
            <svg viewBox="0 0 24 24" width="24" height="24"
                 stroke="currentColor" strokeWidth="2" fill="none"
                 strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
        </Link>
        <button onClick={setDeleteModalActive} className="mr-2">
            <svg viewBox="0 0 24 24" width="24" height="24"
                 stroke="currentColor" strokeWidth="2" fill="none"
                 strokeLinecap="round" strokeLinejoin="round"
            >
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
        </button>
    </div>
};


const PostItem = (props) => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    return <div className="w-full rounded overflow-hidden shadow-lg my-6 flex flex-col md:flex-row bg-white h-auto relative">
        <Link className="h-48 md:w-1/3 md:h-auto" to={`/props/posts/${props.post.slug}`}>
            <img className="object-cover w-full h-48 md:h-full" src={props.post.picture} alt="post"/>
        </Link>
        <div className="w-full md:w-2/3 p-5">
            <Link to={`/posts/${props.post.slug}`}>
                <h3 className="text-gray-900 font-bold text-xl mb-2">
                    {props.post.title}
                </h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">
                <span>{props.post.created}</span>
            </p>
            <p className="text-gray-700 text-base">
                {props.post.description}
            </p>
        </div>
        {props.currentUser === props.post.author ? renderPostButtons(props.post, setDeleteModalActive): null}
        {deleteModalActive? renderDeleteModal(setDeleteModalActive): null}
    </div>
};

const mapStateToProps = (state) => {
    return {currentUser: state.auth.user}
};

export default connect(mapStateToProps)(PostItem);
