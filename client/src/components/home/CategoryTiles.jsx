import React from 'react';

const CategoryTiles = () => {
  // Categories data with Sri Lankan context
  const categories = [
    {
      id: 1,
      name: "Vegetables",
      icon: "🥕",
      color: "from-green-400 to-green-600",
      textColor: "text-green-800",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      producerCount: 245,
      productCount: "2.1k",
      trending: true,
      description: "Fresh organic vegetables"
    },
    {
      id: 2,
      name: "Spices & Herbs",
      icon: "🌶️",
      color: "from-red-400 to-red-600",
      textColor: "text-red-800",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      producerCount: 156,
      productCount: "890",
      trending: true,
      description: "Ceylon spices & herbs"
    },
    {
      id: 3,
      name: "Fruits",
      icon: "🥭",
      color: "from-orange-400 to-orange-600",
      textColor: "text-orange-800",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      producerCount: 189,
      productCount: "1.5k",
      trending: false,
      description: "Tropical & seasonal fruits"
    },
    {
      id: 4,
      name: "Dairy Products",
      icon: "🥛",
      color: "from-blue-400 to-blue-600",
      textColor: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      producerCount: 78,
      productCount: "340",
      trending: false,
      description: "Fresh milk & dairy"
    },
    {
      id: 5,
      name: "Seafood",
      icon: "🐟",
      color: "from-cyan-400 to-cyan-600",
      textColor: "text-cyan-800",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      producerCount: 92,
      productCount: "520",
      trending: true,
      description: "Fresh catch from coast"
    },
    {
      id: 6,
      name: "Rice & Grains",
      icon: "🌾",
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-800",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      producerCount: 134,
      productCount: "780",
      trending: false,
      description: "Premium rice varieties"
    },
    {
      id: 7,
      name: "Tea & Beverages",
      icon: "🍃",
      color: "from-emerald-400 to-emerald-600",
      textColor: "text-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      producerCount: 67,
      productCount: "290",
      trending: false,
      description: "Ceylon tea & drinks"
    },
    {
      id: 8,
      name: "Processed Foods",
      icon: "🍯",
      color: "from-amber-400 to-amber-600",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      producerCount: 198,
      productCount: "1.2k",
      trending: true,
      description: "Value-added products"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xlxxx mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Product Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl border-2 ${category.borderColor} ${category.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2`}
            >
              {/* Trending Badge */}
              {category.trending && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    🔥 Hot
                  </span>
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-6 text-center">
                {/* Icon */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Producers</span>
                    <span className={`font-semibold ${category.textColor}`}>{category.producerCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Products</span>
                    <span className={`font-semibold ${category.textColor}`}>{category.productCount}</span>
                  </div>
                </div>

                {/* View Button */}
                <button className={`mt-4 w-full py-2 px-4 border-2 ${category.borderColor} ${category.textColor} font-medium rounded-lg hover:bg-white transition-colors group-hover:shadow-md`}>
                  Explore Category
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-300 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-2xl p-8 border border-primary-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">8</div>
              <div className="text-primary-600 text-sm font-medium">Main Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">1,200+</div>
              <div className="text-primary-600 text-sm font-medium">Active Producers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">7.5k+</div>
              <div className="text-primary-600 text-sm font-medium">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">24/7</div>
              <div className="text-primary-600 text-sm font-medium">Platform Support</div>
            </div>
          </div>
        </div>

        {/* Featured Category Showcase */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-primary-800 mb-8">
            This Week's Featured Category
          </h3>
          
          <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="p-8 lg:p-12 text-white">
                <div className="text-6xl mb-4">🥕</div>
                <h4 className="text-3xl font-bold mb-4">Organic Vegetables</h4>
                <p className="text-green-100 mb-6 text-lg">
                  Discover fresh, organic vegetables from certified farmers across Sri Lanka. 
                  Farm-to-store delivery with quality guaranteed.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🌱 100% Organic</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📦 Same Day Delivery</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✅ Quality Certified</span>
                </div>
                <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                  Explore Vegetables
                </button>
              </div>

              {/* Right Image */}
              <div className="p-8 lg:p-0">
                <div className="aspect-square lg:aspect-video bg-white/10 rounded-xl lg:rounded-none lg:rounded-l-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop"
                    alt="Fresh vegetables"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkZyZXNoIFZlZ2V0YWJsZXM8L3RleHQ+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
