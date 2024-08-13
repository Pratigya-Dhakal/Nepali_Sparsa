import React from 'react';
import CompanyHistory from '../../components/UserComponents/CompanyHistory';
import MissionVision from '../../components/UserComponents/MissionVision';
import Navbar from '../../components/UserComponents/Navbar';
import Footer from '../../components/UserComponents/Footer';
import Team from '../../components/UserComponents/Teams';
import SloganAboutUs from '../../components/UserComponents/SloganAboutUs';

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
