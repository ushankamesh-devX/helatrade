import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gray-50 text-gray-800 min-h-[80vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-gray-900">
          Discover, Create,
          <br />
          <span className="text-gray-700">connect</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your hub for trending content, featured creators, and a vibrant community marketplace.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-[10px] transition-colors text-[14px] min-w-[160px]">
            Explore Trending
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-8 py-3 rounded-[10px] transition-colors text-[14px] min-w-[160px]">
            Join the Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
