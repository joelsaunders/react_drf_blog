import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {fetchPosts} from "../../../actions";
import PostItem from "./PostListItem";
import {Link} from "react-router-dom";

const PostList = ({fetchPosts, posts}) => {
    useEffect(
        () => {
            (async () =>  await fetchPosts())()
        },
        [fetchPosts]
    );

    return <div className="ui vertical segment">
        <div style={{width: "100%"}} className="ui cards">
            {Object.values(posts).map((post) => <PostItem key={post.slug} post={post} />)}
        </div>
        <div className="ui very padded vertical segment">
            <Link to="/posts/create">
                <div className="ui right floated button positive">
                    Create Post
                </div>
            </Link>
        </div>
    </div>;
};

const mapStateToProps = (state) => {
    return {posts: state.posts}
};

export default connect(mapStateToProps, {fetchPosts})(PostList);
