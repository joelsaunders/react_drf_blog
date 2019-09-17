import React from 'react';
import MarkdownRenderer from "../../MarkdownRenderer/MardownRenderer";

const PostDetail = ({currentPost}) => {
    if (!currentPost) {
        return <div>Loading...</div>
    }

    return <div className="w-full my-6 rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full object-cover h-56" src={currentPost.picture} alt="post detail" />
        <div className="px-6 py-4">
            <h3 className="text-gray-900 font-bold text-xl mb-2">
                {currentPost.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
                {currentPost.created}
            </p>
            <MarkdownRenderer text={currentPost.body} />
        </div>
    </div>
};

export default PostDetail;
