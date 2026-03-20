import React from 'react';
import { TESTIMONIALS_DATA } from '../constants.tsx';
import TestimonialCard from '../components/TestimonialCard';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';
import { buildBreadcrumbSchema } from '../seo';

const WallOfLovePage = () => {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: TESTIMONIALS_DATA.map((testimonial, index) => ({
      '@type': 'Review',
      position: index + 1,
      author: { '@type': 'Person', name: testimonial.name },
      reviewBody: testimonial.fullStory ?? testimonial.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5,
      },
    })),
  };

  return (
    <>
      <Seo
        title="Success Stories | PathThrive Wall of Love"
        description="Read PathThrive success stories and testimonials from job seekers who used our resume, LinkedIn, and job application support services."
        path="/wall-of-love"
        schema={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Wall of Love', path: '/wall-of-love' },
          ]),
          reviewSchema,
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Wall of Love
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real stories from job seekers who transformed their search with PathThrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} detailed={true} />
          ))}
        </div>

        <div className="mt-16 text-center bg-indigo-50 p-10 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
            Ready to Share Your Success Story?
          </h2>
          <p className="text-slate-700 mb-8 max-w-xl mx-auto">
            If PathThrive helped you land your dream job, we'd love to hear about it!
            Alternatively, if you're ready to start your journey, explore our plans.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/contact?reason=share_story">
              <Button variant="primary" size="lg">Share Your Story</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="secondary" size="lg">Explore Plans</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WallOfLovePage;
