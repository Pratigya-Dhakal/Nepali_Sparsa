import React from 'react';
import './styles/DealsSection.css';

const dealsData = [
{
    id: 1,
    category: "Dress",
    discount: "50% off",
    image: "path/to/image1.jpg",
    title: "Stylist Dress",
    newPrice: "$75.00",
    oldPrice: "$150.00",
    rating: 4.8,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
},
{
    id: 2,
    category: "Dress",
    discount: "20% off",
    image: "path/to/image2.jpg",
    title: "Modern Party Dress",
    newPrice: "$80.00",
    oldPrice: "$100.00",
    rating: 4.9,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
},
// More deals...
];

const DealsSection = () => {
return (
    <div className="deals-section">
    <h4>Today Deals</h4>
    <h1>Deals of the Day</h1>
    <div className="deals-grid">
        {dealsData.map(deal => (
        <div className="deal-card" key={deal.id}>
            <img src={deal.image} alt={deal.title} />
            <div className="discount">{deal.discount}</div>
            <div className="category">{deal.category}</div>
            <div className="title">{deal.title}</div>
            <div className="price">
            {deal.newPrice} <span className="old-price">{deal.oldPrice}</span>
            </div>
            <div className="rating">⭐ {deal.rating}</div>
            <div className="description">{deal.description}</div>
            <a href="shop-now" className="shop-now">Shop Now ➜</a>
        </div>
        ))}
    </div>
    </div>
);
}

export default DealsSection;
