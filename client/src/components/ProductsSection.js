import React, { useState } from 'react';
import './styles/ProductsSection.css';
import dressImage from '../assets/heroSection.png';


const productsData = [
{
    id: 1,
    category: "Women",
    discount: "50% off",
    image: "path/to/image1.jpg",
    title: "Trendy Brown Coat",
    newPrice: "$75.00",
    oldPrice: "$150.00",
    rating: 4.8,
    countdown: { days: 5, hours: 12, minutes: 30, seconds: 25 },
},
{
    id: 2,
    category: "Women",
    discount: "25% off",
    image: "path/to/image2.jpg",
    title: "Classy Light Coat",
    newPrice: "$165.00",
    oldPrice: "$220.00",
    rating: 4.9,
    countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
},
{
    id: 3,
    category: "Women",
    discount: "10% off",
    image: "path/to/image3.jpg",
    title: "Modern Brown Dress",
    newPrice: "$90.00",
    oldPrice: "$100.00",
    rating: 4.8,
    countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
},
// More products...
];

const categories = ["All", "Women", "Men", "Accessories","Handicraft"];

const ProductsSection = () => {
const [activeCategory, setActiveCategory] = useState("All");

const filteredProducts = activeCategory === "All" 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);

return (
    <div className="products-section">
        <h4>Our Products</h4>
        <h1>Our Top Seller Products</h1>
        <div className="tabs">
            {categories.map((category, index) => (
            <div
                key={index}
                className={`tab ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
            >
                {category}
            </div>
            ))}
        </div>
        <div className="product-grid">
            {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
                <img src={dressImage} alt={product.title} />
                <div className="discount">{product.discount}</div>
                {product.countdown.days > 0 && (
                <div className="countdown">
                    <div>{product.countdown.days} Days</div>
                    <div>{product.countdown.hours} Hours</div>
                    <div>{product.countdown.minutes} Mins</div>
                    <div>{product.countdown.seconds} Secs</div>
                </div>
                )}
                <div className="title">{product.title}</div>
                <div className="price">
                {product.newPrice} <span className="old-price">{product.oldPrice}</span>
                </div>
                <div className="rating">⭐ {product.rating}</div>
            </div>
            ))}
        </div>
    </div>
);
}

export default ProductsSection;
