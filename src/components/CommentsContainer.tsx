import {
    useAddCommentMutation, useDeleteCommentMutation,
    useGetAllCommentsQuery, useUpdateCommentMutation
} from "../services/CommentService";
import {CommentItem} from "./CommentItem";
import {ChangeEvent, useState} from "react";
import {ICommentType} from "../models/IComment";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {commentInProgress} from "../store/reducers/CommentSlice";


export const CommentsContainer = () => {

    const [count, setCount] = useState('');
    const [newComment, setNewComment] = useState('');
    const dispatch = useAppDispatch();
    const actionsInProgress = useAppSelector(state => state.commentReducer.followingInProgress)

    const {
        data: comments,
        error,
        isLoading, //загрузка при первой загрузке страницы
        isFetching, // загрузка при последующих запросах
        isSuccess,
    } = useGetAllCommentsQuery(count);

    const [addNewComment, {
        error: newCommentError,
        isLoading: isLoadingAddingComment,
    }] = useAddCommentMutation();

    const handleAddComment = async () => {
        if (newComment) {
            await addNewComment({
                body: newComment,
                postId: 1
            } as ICommentType).unwrap()
                .then((payload) => console.log('fulfilled', payload))
                .catch((error) => console.error('rejected', error))
            //unwrap() - обеспечиват корректную работу со всеми дополнительными пропами:
            // error, isLoading и др.
            setNewComment('');
        }
    }

    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();

    const handleDeleteComment = async (id: number) => {
        dispatch(commentInProgress({id, isFetching: true}))
        await deleteComment(id).unwrap()
            .then(payload => {
                dispatch(commentInProgress({id, isFetching: false}))
            })
    }

    const handleUpdateComment = async (comment:ICommentType) => {
        dispatch(commentInProgress({id: comment.id, isFetching: true}))
        await updateComment(comment).unwrap();
        dispatch(commentInProgress({id: comment.id, isFetching: false}))
    }

    if (isLoading) {
        return <div>loading ...</div>
    }



    return (
        <div>
            {isFetching && <h2>...Fetching</h2>}
            <div>
                <div>
                    <input
                        type="text" value={newComment}
                        onChange={e => setNewComment(e.currentTarget.value)}/>
                    <button disabled={isLoadingAddingComment}
                            onClick={handleAddComment}>Add comment
                    </button>
                </div>
                <select
                    value={count}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCount(e.currentTarget.value)}>
                    <option value="">all</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                </select>
            </div>
            {isSuccess && (
                comments && comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        id={comment.id}
                        comment={comment}
                        deleteComment={handleDeleteComment}
                        disableBnt={isFetching || (actionsInProgress && actionsInProgress.some(elId => elId === comment.id))}
                        handleUpdateComment={handleUpdateComment}
                        isUpdatingComment={ isFetching || (actionsInProgress && actionsInProgress.some(elId => elId === comment.id))}
                    />
                ))
            )}
            {error && <div>
                {
                    // @ts-ignore
                    error.error
                }
            </div>}
        </div>
    )
}