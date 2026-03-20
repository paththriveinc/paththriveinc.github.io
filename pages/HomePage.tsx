import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustedBySection from '../components/TrustedBySection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import StatsSection from '../components/StatsSection';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema, SITE_URL } from '../seo';

const HomePage = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Job search support',
    provider: {
      '@type': 'Organization',
      name: 'PathThrive',
      url: SITE_URL,
    },
    areaServed: 'US',
    description:
      'Human-assisted job application support, ATS-friendly resumes, LinkedIn optimization, and interview preparation for job seekers.',
  };

  return (
    <>
      <Seo
        title="PathThrive | Human-Powered Job Search Support for Faster Interviews"
        description="Get ATS-friendly resumes, LinkedIn optimization, and hands-on job application support from PathThrive so you can focus on interviews instead of repetitive admin work."
        schema={[buildBreadcrumbSchema([{ name: 'Home', path: '/' }]), serviceSchema]}
      />
      <HeroSection />
      <TrustedBySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
    </>
  );
};

export default HomePage;
