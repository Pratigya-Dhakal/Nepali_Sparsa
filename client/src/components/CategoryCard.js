import React from 'react';
import './styles/CategoryCard.css'; // Adjust path as needed

const CategoryCard = ({ category }) => {
    const imageUrl = category.image ? `http://localhost:5000/${category.image.url}` : '/path/to/default-image.jpg';

    return (
        <div className="category-card">
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
