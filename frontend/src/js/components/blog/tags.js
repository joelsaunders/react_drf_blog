import React, {Component} from 'react';
import {Link} from "react-router";


class PostTags extends Component {

    render () {
        return (
            <div className={"post-tags"} >
                {this.props.tags.map(
                    (tag, index) => {
                        return (
                            <Link key={index} href={`/blog/tags/${tag.name}`}>
                                <span data-badge-caption={""} className={"post-tags-tag new badge green"}>
                                    {tag.name}
                                </span>
                            </Link>
                        )
                    }
                )}
            </div>
        )
    }
}

export default PostTags;
