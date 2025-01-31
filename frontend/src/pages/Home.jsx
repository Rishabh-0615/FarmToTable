import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import AboutUs from './AboutUs';
import { Footer } from './Footer';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600">

      
     
        <HeroSection />
      
      
      <HowItWorks />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
