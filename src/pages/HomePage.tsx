import React from 'react';
import Hero from '../components/Home/Hero';
import HowItWorks from '../components/Home/HowItWorks';
import EmergencyGuide from '../components/Home/EmergencyGuide';
import FeaturedArtisans from '../components/Home/FeaturedArtisans';
import Testimonials from '../components/Home/Testimonials';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedArtisans />
      <EmergencyGuide />
      <Testimonials />
    </div>
  );
}
