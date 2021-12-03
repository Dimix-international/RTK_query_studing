import React from "react";
import {ICommentType} from "../models/IComment";
import {useGetCommentQuery} from "../services/CommentService";
import {EditableSpan} from "./EditableSpan";

type PostItemType = {
    comment: ICommentType
    id: number
    deleteComment: (id: number) => void
    disableBnt: boolean
    handleUpdateComment: (comment: ICommentType) => void
    isUpdatingComment: boolean
}
export const CommentItem: React.FC<PostItemType> = ({
                                                        comment,
                                                        deleteComment,
                                                        disableBnt,
                                                        id,
                                                        handleUpdateComment,
                                                        isUpdatingComment
                                                    }) => {

    const {data, isFetching} = useGetCommentQuery(id);
    console.log(data)

    const updateComment = (text: string) => {

        handleUpdateComment({...comment, body: text})
    }

    return (
        <div style={{border: '2px solid grey', padding: 5, marginBottom: 10}}>
            <EditableSpan text={comment.body}
                          callback={(text: string) => updateComment(text)}
                          isUpdatingComment={isUpdatingComment}/>
            <button disabled={disableBnt}
                    onClick={() => deleteComment(comment.id)}>delete
            </button>
        </div>
    )
}