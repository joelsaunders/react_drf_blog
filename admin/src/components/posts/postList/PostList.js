import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {fetchPosts} from "../../../actions";
import PostItem from "./PostListItem";

const PostList = ({fetchPosts, posts}) => {
    useEffect(
        () => {
            (async () =>  await fetchPosts())()
        },
        [fetchPosts]
    );

    return <div style={{width: "100%"}} className="ui cards">
        {posts.map((post) => <PostItem key={post.slug} post={post} />)}
    </div>
};

const mapStateToProps = (state) => {
    return {posts: state.posts}
};

export default connect(mapStateToProps, {fetchPosts})(PostList);
