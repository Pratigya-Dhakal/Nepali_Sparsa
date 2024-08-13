import React from 'react';
import './styles/FilterOptions.css';

const FilterOptions = () => {
return (
    <div className="filters">
    <h2>Filter Options</h2>
    <div className="filter-category">
        <h3>Category</h3>
        <ul>
        <li>Men</li>
        <li>Women</li>
        <li>T-Shirts</li>
        <li>Handbags</li>
        <li>Jackets and Coats</li>
        <li>Watches</li>
        <li>Hat</li>
        </ul>
    </div>
    <div className="filter-price">
        <h3>Price</h3>
        <input type="range" min="25" max="125" />
        <span>$25.00 - $125.00</span>
    </div>
    <div className="filter-color">
        <h3>Color</h3>
        <ul>
        <li>Black</li>
        <li>Grey</li>
        <li>Green</li>
        <li>Red</li>
        <li>Orange</li>
        <li>Blue</li>
        <li>Pink</li>
        <li>White</li>
        </ul>
    </div>
    <div className="filter-size">
        <h3>Size</h3>
        <ul>
        <li>S</li>
        <li>M</li>
        <li>L</li>
        <li>XL</li>
        <li>XXL</li>
        <li>XXXL</li>
        </ul>
    </div>
    </div>
);
};

export default FilterOptions;
