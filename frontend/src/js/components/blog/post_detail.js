import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost } from '../../actions/index';
import { parseMarkdown } from '../../utils/markdownParser'
import PostTags from './tags';


class PostDetail extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id)
    }

    render() {
        if (!Object.keys(this.props.post).length) {
            return <div>Loading.....</div>;
        }
        return (
            <div>
                <div className="detail-post-container generic-card">
                    <div className="detail-post-textarea">
                        <h3>{this.props.post.title}</h3>
                        <h4>{this.props.post.created}</h4>
                        <PostTags tags={this.props.post.tags} />
                        <div dangerouslySetInnerHTML={parseMarkdown(String(this.props.post.body))}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.posts.post
    };
}

export default connect(mapStateToProps, { fetchPost })(PostDetail);