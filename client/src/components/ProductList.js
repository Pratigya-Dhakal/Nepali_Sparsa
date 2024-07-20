import React from 'react';
import ProductItem from './ProductItem';
import './styles/ProductList.css';

const products = [
{
    id: 1,
    name: 'Trendy Brown Coat',
    image: '/images/brown-coat.jpg',
    price: 75,
    oldPrice: 150,
    rating: 4.8,
    category: 'Coats',
    discount: '50% off',
},
{
    id: 2,
    name: 'Classy Light Coat',
    image: '/images/light-coat.jpg',
    price: 165,
    oldPrice: 220,
    rating: 4.9,
    category: 'Coats',
    discount: '25% off',
},
{
    id: 3,
    name: 'Modern Brown Dress',
    image: '/images/brown-dress.jpg',
    price: 90,
    oldPrice: 100,
    rating: 4.8,
    category: 'Dresses',
    discount: '10% off',
},
// Add more products as needed
];

const ProductList = () => {
return (
    <div className="product-list">
    {products.map((product) => (
        <ProductItem key={product.id} product={product} />
    ))}
    </div>
);
};

export default ProductList;
