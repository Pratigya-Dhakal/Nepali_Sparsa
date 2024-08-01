import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Comment.css';
import { useParams } from 'react-router-dom';

const Comments = () => {
    const { productId } = useParams(); // Get productId from URL
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [commentIdToReply, setCommentIdToReply] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comments/${productId}`);
                setComments(response.data);
            } catch (err) {
                setError(err.message || 'Error fetching comments');
                console.error('Error fetching comments:', err);
            }
        };

        fetchComments();
    }, [productId]);

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const adminId = 1; // Replace with actual admin ID
            await axios.post('http://localhost:5000/api/replies', {
                commentId,
                userId: adminId,
                content: replyContent
            });

            setReplyContent('');
            setCommentIdToReply(null);

            const response = await axios.get(`http://localhost:5000/api/comments/${productId}`);
            setComments(response.data);
        } catch (error) {
            setError(error.message || 'Error adding reply');
            console.error('Error adding reply:', error);
        }
    };

    return (
        <div className="comments">
            <h2>Comments</h2>
            {error && <div className="error">Error: {error}</div>}
            {comments.length === 0 && <p>No comments available.</p>}
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <p><strong>{comment.user?.username}:</strong> {comment.content}</p>
                    <div className="replies">
                        {comment.replies && comment.replies.map((reply) => (
                            <p key={reply.id}><strong>{reply.user?.username} (Admin):</strong> {reply.content}</p>
                        ))}
                    </div>
                    <button onClick={() => setCommentIdToReply(comment.id)}>Reply as Admin</button>
                    {commentIdToReply === comment.id && (
                        <div className="reply-form">
                            <textarea value={replyContent} onChange={handleReplyChange} placeholder="Write a reply..."></textarea>
                            <button onClick={() => handleReplySubmit(comment.id)}>Submit Reply</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;
