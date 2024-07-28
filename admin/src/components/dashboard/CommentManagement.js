// admin/src/components/dashboard/CommentManagement.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment, updateComment } from '../slices/adminCommentSlice';

const CommentManagement = () => {
const dispatch = useDispatch();
const comments = useSelector((state) => state.adminComment.comments);

useEffect(() => {
    dispatch(fetchComments());
}, [dispatch]);

const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
};

const handleUpdateComment = (id, content) => {
    dispatch(updateComment({ id, content }));
};

return (
    <div>
        <h2>Comment Management</h2>
        <ul>
            {comments.map((comment) => (
            <li key={comment.id}>
                {comment.content}
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                <button onClick={() => handleUpdateComment(comment.id, prompt('Update content:', comment.content))}>Update</button>
            </li>
            ))}
        </ul>
    </div>
    );
};

export default CommentManagement;