import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {fetchPosts} from "../../../actions";
import PostItem from "./PostListItem";
import {Link} from "react-router-dom";

const renderCreatePostButton = () => {
    return <div className="ui very padded vertical segment">
        <Link to="/posts/create">
            <div className="ui right floated button positive">
                Create Post
            </div>
        </Link>
    </div>
};

const PostList = ({fetchPosts, posts, loggedIn}) => {
    useEffect(
        () => {
            (async () =>  await fetchPosts())()
        },
        [fetchPosts]
    );

    return <div className="ui vertical segment">
        <div style={{width: "100%"}} className="ui four doubling stackable cards">
            {Object.values(posts).map((post) => <PostItem key={post.slug} post={post} />)}
        </div>
        {loggedIn? renderCreatePostButton(): null}

    </div>;
};

const mapStateToProps = (state) => {
    return {posts: state.posts, loggedIn: state.auth.token !== null}
};

export default connect(mapStateToProps, {fetchPosts})(PostList);
