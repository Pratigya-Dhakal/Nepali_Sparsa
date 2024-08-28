import React from 'react';
import './styles/CategoryCard.css'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate(`/shop?category=${category.name}`);
    };

    const imageUrl = category.image ? `http://localhost:5000/${category.image.url}` : '/path/to/default-image.jpg';

    return (
        <div className="category-card" onClick={handleCategoryClick}>
            <img 
                src={imageUrl} 
                alt={category.name} 
                className="category-image"
            />
            <h2 className="category-name">{category.name}</h2>
        </div>
    );
};

export default CategoryCard;
