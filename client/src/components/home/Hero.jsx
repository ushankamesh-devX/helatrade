import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Banner Image Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&h=1080&fit=crop&auto=format&q=80"
          alt="Fresh colorful fruits and vegetables"
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjRkVGRkZGIi8+Cjx0ZXh0IHg9Ijk2MCIgeT0iNTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRDFEMURCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiPkZyZXNoIFByb2R1Y2U8L3RleHQ+CjxzdmcgeD0iODQwIiB5PSI0NjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTYwIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY4QzQyIiBvcGFjaXR5PSIwLjQiIHJ4PSI4Ii8+CjxyZWN0IHg9IjUwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZBNTAwIiBvcGFjaXR5PSIwLjQiIHJ4PSI4Ii8+CjxyZWN0IHg9IjEwMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZDMzAwIiBvcGFjaXR5PSIwLjQiIHJ4PSI4Ii8+CjxyZWN0IHg9IjE1MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzMwRUE1RCIgb3BhY2l0eT0iMC40IiByeD0iOCIvPgo8cmVjdCB4PSIyMDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzEwQjk4MSIgb3BhY2l0eT0iMC40IiByeD0iOCIvPgo8L3N2Zz4KPC9zdmc+Cg==';
          }}
        />
        {/* Light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50"></div>
      </div>
      
      <div className="relative max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-800">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sri Lanka's
              <br />
              <span className="text-orange-600">Premier</span>
              <br />
              Trade Platform
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-600 mb-8 leading-relaxed">
              Connect with local producers, discover trending products, and grow your business in Sri Lanka's vibrant marketplace.
            </p>
            
            {/* Features List */}
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200">
                🌱 Fresh Produce
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                🚚 Direct Delivery
              </span>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                ✅ Quality Assured
              </span>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg min-w-[200px] flex items-center justify-center space-x-2">
                <span>🔥</span>
                <span>Explore Trending</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-primary-700 border-2 border-primary-200 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-lg min-w-[200px] shadow-lg hover:shadow-xl">
                Join Community
              </button>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="lg:justify-self-end">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40 max-w-md">
              <h3 className="text-2xl font-bold text-primary-800 mb-6 text-center">
                🏆 Platform Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-800 mb-1">1,200+</div>
                  <div className="text-primary-600 text-sm font-medium">Active Producers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-800 mb-1">7.5k+</div>
                  <div className="text-primary-600 text-sm font-medium">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">95%</div>
                  <div className="text-primary-600 text-sm font-medium">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-primary-600 text-sm font-medium">Support</div>
                </div>
              </div>

              {/* Quick Access Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center space-x-2">
                  <span>📊</span>
                  <span>View Analytics</span>
                </button>
                <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center space-x-2">
                  <span>🤝</span>
                  <span>Partner with Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-primary-800">
                <h4 className="text-xl font-bold mb-2">Featured This Week</h4>
                <p className="text-primary-600">Organic vegetables from certified farmers across Sri Lanka</p>
              </div>
              <button className="bg-orange-600 text-white hover:bg-orange-700 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-md hover:shadow-lg">
                View Featured Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
