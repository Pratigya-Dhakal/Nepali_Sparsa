import React from 'react';
import CompanyHistory from '../components/CompanyHistory';
import MissionVision from '../components/MissionVision';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/Teams';
import SloganAboutUs from '../components/SloganAboutUs';

const AboutUs = () => {
    return (
        <div className="about-us">
            <Navbar/>
            <SloganAboutUs />
            <CompanyHistory />
            <MissionVision />
            <Team />
            <Footer />
        </div>
    );
}

export default AboutUs;
