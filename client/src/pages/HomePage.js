import React from 'react'
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import DealsSection from '../components/DealsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
const HomePage = () => {
    return (
        <div className="HomePage">
            <Navbar />
            <HeroSection />
            <ProductsSection />
            <DealsSection />
            <TestimonialsSection />
            <FAQSection />
            <Footer />
        </div>
    )
}

export default HomePage