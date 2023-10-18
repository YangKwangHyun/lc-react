import React from 'react';
import {useParams} from "react-router-dom";

function BlogPost(props) {
    const params = useParams();

    return (
        <div className="container">
            This is blog post {params.id}
        </div>
    );
}

export default BlogPost;