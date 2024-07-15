import React, { useState } from 'react';
import './styles/ContactUsPage.css';
import Navbar from '../components/Navbar';
import ContactSupportForm from '../components/ContactSupportForm';

const ContactUs = () => {
const [isModalOpen, setModalOpen] = useState(false);

const openModal = () => {
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
};

return (
    <div>
    <Navbar />
    <div className="contact-us">
        <div className="contact-header">
        <h1>Get in touch</h1>
        <p>Want to get in touch? We'd love to hear from you. Here's how you can reach us...</p>
        </div>
        <div className="contact-options">
        <div className="contact-option">
            <div className="contact-icon">
            <i className="fas fa-phone"></i>
            </div>
            <h2>Talk to Sales</h2>
            <p>Interested in Nepali Sparsa's products? Just pick up the phone to chat with a member of our sales team.</p>
            <a href="tel:+9779824408275">+977 9824408275</a>
        </div>
        <div className="contact-option">
            <div className="contact-icon">
            <i className="fas fa-envelope"></i>
            </div>
            <h2>Contact Customer Support</h2>
            <p>Sometimes you need a little help from your friends. Or a Nepali Sparsa support rep. Don't worry... we're here for you.</p>
            <button className="contact-support-btn" onClick={openModal}>Contact Support</button>
        </div>
        </div>
    </div>
    {isModalOpen && <ContactSupportForm closeModal={closeModal} />}
    </div>
);
};

export default ContactUs;
