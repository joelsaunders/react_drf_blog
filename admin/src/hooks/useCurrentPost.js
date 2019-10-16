import {useEffect, useState} from 'react';
import theBookOfJoel from "../apis/theBookOfJoel";

export default (postSlug) => {
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await theBookOfJoel.get(
                `/api/posts/${postSlug}/`,
                {params: {fields: '__all__'}}
            );
            setCurrentPost(response.data);
        })();
    }, [postSlug]);

    return currentPost
};