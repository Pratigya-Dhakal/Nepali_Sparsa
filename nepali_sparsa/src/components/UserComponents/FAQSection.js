import React, { useState } from 'react';
import './styles/FAQSection.css';

const faqData = [
    {
        question: "How can I place an order?",
        answer: "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout. Follow the instructions to complete your purchase.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit/debit cards, PayPal, and Apple Pay. You can choose your preferred payment method at checkout.",
    },
    {
        question: "Can I track my order after it's been placed?",
        answer: "Yes, once your order has been shipped, you will receive a tracking number via email. You can use this number to track your order on our website.",
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, we offer customer support via email and phone. You can reach out to us with any questions or concerns, and we will be happy to assist you.",
    },
    {
        question: "What is your return policy?",
        answer: "Our return policy allows you to return products within 30 days of receipt. Items must be in original condition and packaging. Please contact our support team for return instructions.",
    },
    {
        question: "How to Create Account?",
        answer: "To create an account, click on the 'Sign Up' button at the top of our website. Fill in your details, and you will receive a confirmation email to activate your account.",
    },
    ];

    const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="FAQSection">
            <h4>FAQ</h4>
            <h1>Questions? Look here.</h1>
            <div className="faq-container">
                <ul>
                    {faqData.map((item, index) => (
                    <li key={index} onClick={() => handleToggle(index)} className={activeIndex === index ? 'active' : ''}>
                        <div className="question">
                        <span>{item.question}</span>
                        <span>{activeIndex === index ? '-' : '+'}</span>
                        </div>
                        {activeIndex === index && <div className="answer">{item.answer}</div>}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FAQSection;
