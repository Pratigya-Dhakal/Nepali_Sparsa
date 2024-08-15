import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles/DealsSection.css';

const DealsSection = () => {
    const [deals, setDeals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/deals');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Ensure data is an array
            if (Array.isArray(data)) {
                setDeals(data);
            } else {
                setError('No deals available at the moment.');
            }
        } catch (error) {
            console.error('Error fetching deals:', error);
            setError('Failed to fetch deals. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deals-section">
            <h4>Today’s Deals</h4>
            <h1>Deals of the Day</h1>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading-message">Loading deals...</div>
            ) : (
                <div className="deals-grid">
                    {deals.length > 0 ? (
                        deals.map(deal => (
                            <div className="deal-card" key={deal.id}>
                                <div className="image-slider">
                                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                        <SwiperSlide>
                                            <img
                                                src={`http://localhost:5000${deal.image}`}
                                                alt={deal.title}
                                                onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="discount">{deal.discount ? `${deal.discount}% OFF` : 'No discount'}</div>
                                <div className="title">{deal.title || 'Untitled Deal'}</div>
                                <div className="price">
                                    ${deal.newPrice.toFixed(2) || '0.00'} <span className="old-price">${deal.oldPrice.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="rating">⭐ {deal.rating || 'No Rating'}</div>
                                
                                {/* Ensure productId is passed correctly */}
                                {deal.productId && (
                                    <Link to={`/products/${deal.productId}`} className="shop-now">Shop Now ➜</Link>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No deals available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DealsSection;
