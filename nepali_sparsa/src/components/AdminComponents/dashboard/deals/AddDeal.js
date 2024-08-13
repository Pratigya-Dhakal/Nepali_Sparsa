import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/AdminDeals.css'; // Import the CSS file

const AddDeal = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const navigate = useNavigate();

    const [deal, setDeal] = useState({
        title: '',
        category: '',
        subcategory: '',
        discount: '',
        image: '',
        newPrice: '',
        oldPrice: '',
        rating: '',
        description: '',
        startDate: '',
        endDate: '',
        type: ''
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!id) return; // Avoid fetching if id is not provided

            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setDeal({
                    title: data.name || '',
                    category: data.categoryId || '',
                    subcategory: data.subcategoryId || '',
                    discount: '',
                    image: data.images?.[0]?.url || '',
                    newPrice: '',
                    oldPrice: data.price || '',
                    rating: '',
                    description: data.description || '',
                    startDate: '',
                    endDate: '',
                    type: ''
                });
            } catch (error) {
                console.error('Error fetching product details:', error);
                alert('An error occurred while fetching product details. Please try again later.');
            }
        };

        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('An error occurred while fetching categories. Please try again later.');
            }
        };

        fetchCategories();
        fetchProductDetails();
    }, [id]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (deal.category) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/subcategoriesByCategory?categoryId=${deal.category}`);
                    setSubcategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                    alert('An error occurred while fetching subcategories. Please try again later.');
                }
            } else {
                setSubcategories([]); // Clear subcategories if no category is selected
            }
        };

        fetchSubcategories();
    }, [deal.category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeal(prevDeal => ({ ...prevDeal, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!deal.title || !deal.category || !deal.subcategory || !deal.discount || !deal.image || !deal.newPrice || !deal.oldPrice || !deal.rating || !deal.description || !deal.startDate || !deal.endDate || !deal.type) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            console.log('Submitting data:', deal); // Log data to be sent
            await axios.post('http://localhost:5000/api/deals', {
                title: deal.title,
                categoryId: deal.category,
                subcategoryId: deal.subcategory,
                discount: deal.discount.toString(), // Ensure discount is a string
                image: deal.image,
                newPrice: parseFloat(deal.newPrice),
                oldPrice: parseFloat(deal.oldPrice),
                rating: parseFloat(deal.rating),
                description: deal.description,
                startDate: new Date(deal.startDate).toISOString(), // Ensure date format is correct
                endDate: new Date(deal.endDate).toISOString(),     // Ensure date format is correct
                type: deal.type
            });
            navigate('/admin/deals/all');
        } catch (error) {
            console.error('Error adding deal:', error);
            alert('An error occurred while adding the deal. Please check the console for details.');
        }
    };
    

    return (
        <div className="container">
            <h1>Add Deal</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={deal.title} 
                    onChange={handleChange} 
                    required 
                />
                <select 
                    name="category" 
                    value={deal.category} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <select 
                    name="subcategory" 
                    value={deal.subcategory} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select Subcategory</option>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))}
                </select>
                <input 
                    type="number" 
                    name="discount" 
                    placeholder="Discount (%)" 
                    value={deal.discount} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="image" 
                    placeholder="Image URL" 
                    value={deal.image} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="newPrice" 
                    placeholder="New Price" 
                    value={deal.newPrice} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="oldPrice" 
                    placeholder="Old Price" 
                    value={deal.oldPrice} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="rating" 
                    placeholder="Rating" 
                    value={deal.rating} 
                    onChange={handleChange} 
                    required 
                    min="0" 
                    max="5" 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={deal.description} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="date" 
                    name="startDate" 
                    placeholder="Start Date" 
                    value={deal.startDate} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="date" 
                    name="endDate" 
                    placeholder="End Date" 
                    value={deal.endDate} 
                    onChange={handleChange} 
                    required 
                />
                <select 
                    name="type" 
                    value={deal.type} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select Deal Type</option>
                    <option value="HOT">HOT</option>
                    <option value="FEATURED">FEATURED</option>
                    <option value="ON_SALE">ON_SALE</option>
                    <option value="FLASH_SALE">FLASH_SALE</option>
                    <option value="DISCOUNT">DISCOUNT</option>
                </select>
                <button className="button" type="submit">Add Deal</button>
            </form>
        </div>
    );
};

export default AddDeal;
