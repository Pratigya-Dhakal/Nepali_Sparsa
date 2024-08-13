import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard'; // Adjust path as needed
import './styles/CategorySection.css'; // Adjust path as needed
const CategorySection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/categories');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-section">
            <h1>Categories</h1>
            <div className="category-container">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
