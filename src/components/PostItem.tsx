import React, {MouseEvent} from "react";
import {IPostType} from "../models/IPost";

type PostItemType = {
    post: IPostType
    removePost: (post: IPostType) => void
    updatePost: (post: IPostType) => void
}
export const PostItem: React.FC<PostItemType> = ({post,updatePost, removePost}) => {

    const handleRemove = (event:MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        removePost(post)
    }
    const handleUpdate = (event:MouseEvent<HTMLDivElement>) => {
        const title = prompt() || '';
        updatePost({...post, title})
    }
    return (
        <div onClick={handleUpdate} style={{border: '2px solid grey', padding: 15, marginBottom: 10}}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={handleRemove}>DeletePost</button>
        </div>
    )
}