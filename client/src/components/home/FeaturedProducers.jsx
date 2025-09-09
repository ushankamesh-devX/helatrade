import React, { useState } from 'react';

const FeaturedProducers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for featured producers
  const featuredProducers = [
    {
      id: 1,
      name: "Ceylon Organic Farms",
      avatar: "🌾",
      coverImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=400&fit=crop",
      location: "Kandy, Central Province",
      specialty: "Organic Vegetables & Fruits",
      verified: true,
      rating: 4.9,
      totalProducts: 45,
      monthlyOrders: 120,
      description: "Premium organic produce from the heart of Sri Lanka. Certified organic farming with sustainable practices.",
      badges: ["🏆 Top Rated", "🌱 Organic Certified", "⚡ Fast Delivery"]
    },
    {
      id: 2,
      name: "Spice Island Co.",
      avatar: "🌶️",
      coverImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop",
      location: "Matale, Central Province",
      specialty: "Ceylon Spices & Herbs",
      verified: true,
      rating: 4.8,
      totalProducts: 28,
      monthlyOrders: 89,
      description: "Authentic Ceylon spices directly from the spice gardens. Export quality cinnamon, cardamom, and more.",
      badges: ["🌍 Export Quality", "👑 Premium Grade", "📜 ISO Certified"]
    },
    {
      id: 3,
      name: "Coastal Seafood",
      avatar: "🐟",
      coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
      location: "Negombo, Western Province",
      specialty: "Fresh Seafood & Fish",
      verified: true,
      rating: 4.7,
      totalProducts: 32,
      monthlyOrders: 156,
      description: "Fresh catch delivered daily from the western coast. Sustainable fishing practices with quality guarantee.",
      badges: ["🌊 Daily Fresh", "🎣 Sustainable", "❄️ Cold Chain"]
    },
    {
      id: 4,
      name: "Mountain Tea Gardens",
      avatar: "🍃",
      coverImage: "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&h=400&fit=crop",
      location: "Nuwara Eliya, Central Province",
      specialty: "Ceylon Tea & Herbal Teas",
      verified: true,
      rating: 4.9,
      totalProducts: 18,
      monthlyOrders: 78,
      description: "Premium Ceylon tea from high-altitude gardens. Single estate teas with authentic flavor profiles.",
      badges: ["⛰️ High Grown", "🏅 Award Winning", "🍵 Pure Ceylon"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProducers.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredProducers.length / 2)) % Math.ceil(featuredProducers.length / 2));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            ⭐ Featured Producers
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Meet our top-rated producers who consistently deliver quality products and exceptional service.
          </p>
        </div>

        {/* Producer Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Producer Cards */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(featuredProducers.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredProducers.slice(slideIndex * 2, slideIndex * 2 + 2).map((producer) => (
                      <div key={producer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Cover Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={producer.coverImage} 
                            alt={producer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNvdmVyIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <div className="flex items-center space-x-2">
                              <span className="bg-white text-4xl p-2 rounded-full shadow-md">
                                {producer.avatar}
                              </span>
                              {producer.verified && (
                                <div className="bg-blue-500 p-1 rounded-full">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm font-semibold text-gray-700">{producer.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Producer Info */}
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-primary-800 mb-1">{producer.name}</h3>
                            <p className="text-primary-600 text-sm mb-2">📍 {producer.location}</p>
                            <p className="text-orange-600 font-medium text-sm">{producer.specialty}</p>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {producer.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary-800">{producer.totalProducts}</div>
                              <div className="text-xs text-gray-500">Products</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary-800">{producer.monthlyOrders}</div>
                              <div className="text-xs text-gray-500">Monthly Orders</div>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {producer.badges.map((badge, index) => (
                              <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                                {badge}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                              View Profile
                            </button>
                            <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(featuredProducers.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            View All Featured Producers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducers;
