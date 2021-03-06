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
                 className="hover:text-teal-500"
            >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
        </Link>
        <button onClick={setDeleteModalActive} className="mr-2">
            <svg viewBox="0 0 24 24" width="24" height="24"
                 stroke="currentColor" strokeWidth="2" fill="none"
                 strokeLinecap="round" strokeLinejoin="round"
                 className="hover:text-teal-500"
            >
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
        </button>
    </div>
};

const PostTag = ({tagName}) => {
    return <div className="mr-2 rounded text-teal-500 text-sm border-teal-500 border px-2 hover:text-teal-100 hover:bg-teal-500">
        {tagName}
    </div>
};


const PostItem = (props) => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    return <div className="w-full rounded overflow-hidden shadow-lg my-4 flex flex-col md:flex-row bg-white relative md:h-full md:justify-end">
        <Link className="md:w-1/3 md:absolute md:left-0 md:h-full" to={`/${props.post.slug}`}>
            <img className="object-cover w-full h-64 md:h-full" src={props.post.picture} alt="post"/>
        </Link>
        <div className="w-full md:w-2/3 px-4 pl-4 pb-8">
            <h3 className="text-gray-900 font-bold text-xl mb-4 mt-4">
                <Link to={`/${props.post.slug}`}>
                    {props.post.title}
                </Link>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                <span>{props.post.created}</span>
            </p>
            <div className="flex flex-row mb-4 flex-wrap">
                {props.post.tags.map(({name}) => {
                    return <PostTag key={name} tagName={name} />
                })}
            </div>
            <p className="text-gray-700 text-base">
                {props.post.description}
            </p>

            {/*<Link to={`/${props.post.slug}`}>*/}
            {/*    <svg viewBox="0 0 24 24" width="24" height="24"*/}
            {/*         stroke="currentColor" strokeWidth="2" fill="none"*/}
            {/*         strokeLinecap="round" strokeLinejoin="round"*/}
            {/*         className="absolute right-0 bottom-0 mb-6 mr-8 hover:text-teal-500 hidden md:block"*/}
            {/*    >*/}
            {/*        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>*/}
            {/*        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>*/}
            {/*    </svg>*/}
            {/*</Link>*/}
        </div>
        {props.currentUser === props.post.author ? renderPostButtons(props.post, setDeleteModalActive): null}
        {deleteModalActive? renderDeleteModal(setDeleteModalActive): null}
    </div>
};

const mapStateToProps = (state) => {
    return {currentUser: state.auth.user}
};

export default connect(mapStateToProps)(PostItem);
