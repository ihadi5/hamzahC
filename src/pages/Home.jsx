import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import ProductsSection from '../components/landing/ProductsSection';
import PaintsSection from '../components/landing/PaintsSection';
import ProjectsSection from '../components/landing/ProjectsSection';
import B2BSection from '../components/landing/B2BSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import MapSection from '../components/landing/MapSection';
import AppointmentSection from '../components/landing/AppointmentSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';
import WhatsAppButton from '../components/landing/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <PaintsSection />
      <ProjectsSection />
      <B2BSection />
      <AppointmentSection />
      <ReviewsSection />
      <MapSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}