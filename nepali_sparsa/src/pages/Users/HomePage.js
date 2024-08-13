import React from 'react'
import Navbar from '../../components/UserComponents/Navbar';
import HeroSection from '../../components/UserComponents/HeroSection';
import ProductsSection from '../../components/UserComponents/ProductsSection';
import DealsSection from '../../components/UserComponents/DealsSection';
import TestimonialsSection from '../../components/UserComponents/TestimonialsSection';
import FAQSection from '../../components/UserComponents/FAQSection';
import Footer from '../../components/UserComponents/Footer';
import CategorySection from '../../components/UserComponents/CategorySection';
const HomePage = () => {
    return (
        <div className="HomePage">
            <Navbar />
            <HeroSection />
            <CategorySection />
            <ProductsSection />
            <DealsSection />
            <TestimonialsSection />
            <FAQSection />
            <Footer />
        </div>
    )
}

export default HomePage