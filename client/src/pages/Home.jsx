import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import Footer from '../components/ui/Footer';
import Hero from '../components/home/Hero';
import TrendingPostsFeed from '../components/home/TrendingPostsFeed';
import FeaturedProducers from '../components/home/FeaturedProducers';
import CategoryTiles from '../components/home/CategoryTiles';
import RecentActivity from '../components/home/RecentActivity';
import Statistics from '../components/home/Statistics';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar - Fixed position */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      </div>

      {/* Right Main Content with left margin for fixed sidebar */}
      <div className="min-h-screen flex flex-col lg:ml-80">
        {/* Header */}
        <Header 
          onSidebarToggle={handleSidebarToggle} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1">
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
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
