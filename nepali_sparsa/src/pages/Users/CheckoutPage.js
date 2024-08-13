import React, { useState } from 'react';
import './styles/Checkout.css';

const CheckoutPage = () => {
    const [shippingAddress, setShippingAddress] = useState({
        name: 'Pratigya Dhakal',
        phone: '9824408275',
        address: 'purano wada karyalaye lamachaur 19, Lamachaur Area, Pokhara, Gandaki Province',
    });

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h2>Checkout</h2>
            </div>

            <div className="checkout-body">
                <div className="checkout-section">
                    <h3>Shipping Address</h3>
                    <div className="address-details">
                        <p>{shippingAddress.name}</p>
                        <p>{shippingAddress.phone}</p>
                        <p>{shippingAddress.address}</p>
                    </div>
                    <button className="edit-button">EDIT</button>
                </div>

                <div className="checkout-section">
                    <h3>Package 1 of 1</h3>
                    <div className="delivery-option">
                        <input type="radio" id="standard-delivery" name="delivery" checked />
                        <label htmlFor="standard-delivery">
                            Rs. 120 Standard Delivery <br />
                            <small>Guaranteed by 13-14 Aug</small>
                        </label>
                    </div>

                    <div className="product-summary">
                        <img src="product-image.jpg" alt="Product" />
                        <div className="product-details">
                            <h4>Best Quality Soldering Wire Tripp 18/22 50g</h4>
                            <p>No Brand, Color Family:छोटी</p>
                            <p className="price">Rs. 114</p>
                            <p className="quantity">Qty: 1</p>
                        </div>
                    </div>
                </div>

                <div className="checkout-section">
                    <h3>Promotion</h3>
                    <div className="promo-code">
                        <input type="text" placeholder="Enter Store Code" />
                        <button className="apply-button">APPLY</button>
                    </div>
                </div>

                <div className="checkout-section">
                    <h3>Invoice and Contact Info</h3>
                    <button className="edit-button">EDIT</button>
                </div>

                <div className="checkout-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span>Items Total (1 Items):</span>
                        <span>Rs. 114</span>
                    </div>
                    <div className="summary-item">
                        <span>Delivery Fee:</span>
                        <span>Rs. 120</span>
                    </div>
                    <hr />
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>Rs. 234</span>
                    </div>
                    <button className="pay-button">Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
