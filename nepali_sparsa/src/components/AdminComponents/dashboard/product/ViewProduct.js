import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/ViewProduct.css'; // Import the CSS file for styling

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [commentIdToReply, setCommentIdToReply] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchProductAndComments = async () => {
            try {
                // Fetch product details
                const { data: productData } = await axios.get(`http://localhost:5000/api/admin/products/${id}`);
                setProduct(productData);

                // Fetch comments for the product
                const { data: commentsData } = await axios.get(`http://localhost:5000/api/admin/comments/${id}`);
                setComments(commentsData);

            } catch (error) {
                console.error('Error fetching product or comments:', error);
                setError('Failed to fetch product or comments. Please try again later.'); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndComments();
    }, [id]);

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const adminId = 1; // Replace with actual admin ID
            await axios.post('http://localhost:5000/api/admin/replies', {
                commentId,
                userId: adminId,
                content: replyContent
            });

            setReplyContent('');
            setCommentIdToReply(null);

            // Fetch updated comments after replying
            const { data: updatedComments } = await axios.get(`http://localhost:5000/api/comments/${id}`);
            setComments(updatedComments);
        } catch (error) {
            setError(error.message || 'Error adding reply');
            console.error('Error adding reply:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>; // Display error message
    if (!product) return <div>Product not found</div>;

    return (
        <div className="view-product">
            <div className="product-images">
                {product.images.length > 0 ? (
                    <div className="carousel">
                        {product.images.map((image, index) => (
                            <div key={index} className="carousel-item">
                                <img src={`http://localhost:5000/uploads/${image.url}`} alt={`Product ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-sku">SKU: {product.sku}</p>
                <p className="product-category">Category: {product.category ? product.category.name : 'N/A'}</p>
                <p className="product-subcategory">Subcategory: {product.subcategory ? product.subcategory.name : 'N/A'}</p>
                {product.inventory && (
                    <p className="product-inventory">Inventory: {product.inventory.quantity}</p>
                )}
                {product.discount && (
                    <p className="product-discount">Discount: {product.discount.discountPercent}%</p>
                )}
            </div>

            <div className="comments-section">
                <h2>Comments</h2>
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
                                <textarea
                                    value={replyContent}
                                    onChange={handleReplyChange}
                                    placeholder="Write a reply..."
                                ></textarea>
                                <button onClick={() => handleReplySubmit(comment.id)}>Submit Reply</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProduct;
