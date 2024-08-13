import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/CommentList.css';

const CommentsList = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comments/${productId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [productId]);

    const handleAddComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/comments', {
                productId,
                userId: 1, // Replace with actual user ID
                content: newComment
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleUpdateComment = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/comments/${id}`, {
                content: editingContent
            });
            setComments(comments.map(comment => comment.id === id ? response.data : comment));
            setEditingComment(null);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/comments/${id}`);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="comments-list">
            <h3>Comments</h3>
            <div className="add-comment">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-content">
                            {editingComment === comment.id ? (
                                <textarea
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                />
                            ) : (
                                <p>{comment.content}</p>
                            )}
                            <small>{comment.user.name}</small>
                        </div>
                        <div className="comment-actions">
                            {editingComment === comment.id ? (
                                <>
                                    <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                                    <button onClick={() => setEditingComment(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => {
                                        setEditingComment(comment.id);
                                        setEditingContent(comment.content);
                                    }}>Edit</button>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsList;
