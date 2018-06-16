import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Helmet } from "react-helmet";

import { fetchPosts } from '../../actions/index';
import PostTags from './tags';


class BlogIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts(this.props.params);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params !== prevProps.params) {
            this.props.fetchPosts(this.props.params)
        }
    }

    render () {
        return (
            <div>
                <Helmet>
                    <title>Joel Saunders Blog</title>
                    <meta name="description" content="Programming related blog focusing on Python and Javascript" />
                    <meta name="robots" content="index,follow" />
                </Helmet>
                <ul className="post-container">
                    {
                        this.props.posts.map(post => {
                            return (
                                <div key={post.title}>
                                    <li className="post generic-card" >
                                        <div className="post-picturecontainer">
                                            <Link to={`/blog/${post.slug}`}>
                                                <img src={post.picture} className="post-picture" />
                                            </Link>
                                        </div>
                                        <div className="post-textarea">
                                            <h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4>
                                            <PostTags tags={post.tags} />
                                            <h6>{post.created}</h6>
                                            <p className="post-text">{post.description}</p>
                                        </div>
                                    </li>
                                </div>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts.posts
    };
}

export default connect(mapStateToProps, { fetchPosts })(BlogIndex);