import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import AboutUs from './AboutUs';
import { Footer } from './Footer';

const Home = () => {
  return (
    
    <div>

      <Navbar/>
      <HowItWorks/>
      <AboutUs/>
      <Footer/>
      
      <HowItWorks />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
