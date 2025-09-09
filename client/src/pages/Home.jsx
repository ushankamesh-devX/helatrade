import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import Hero from '../components/home/Hero';
import TrendingPostsFeed from '../components/home/TrendingPostsFeed';
import FeaturedProducers from '../components/home/FeaturedProducers';
import CategoryTiles from '../components/home/CategoryTiles';
import RecentActivity from '../components/home/RecentActivity';
import Statistics from '../components/home/Statistics';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Trending Posts Feed */}
      <TrendingPostsFeed />
      
      {/* Featured Producers */}
      <FeaturedProducers />
      
      {/* Category Tiles */}
      <CategoryTiles />
      
      {/* Recent Activity */}
      <RecentActivity />
      
      {/* Statistics Counter */}
      <Statistics />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
