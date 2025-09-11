import React from 'react';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { name: 'All', icon: '🔥', count: 'All Posts' },
    { name: 'Vegetables', icon: '🥬', count: 245 },
    { name: 'Fruits', icon: '🍎', count: 189 },
    { name: 'Grains & Rice', icon: '🌾', count: 156 },
    { name: 'Spices', icon: '🌶️', count: 98 },
    { name: 'Tea & Coffee', icon: '🍃', count: 67 },
    { name: 'Coconut Products', icon: '🥥', count: 89 },
    { name: 'Seafood', icon: '🐟', count: 134 },
    { name: 'Dairy Products', icon: '🥛', count: 45 },
  ];

  return (
    <div className="bg-white border-b border-primary-200">
      <div className="max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Dropdown */}
        <div className="md:hidden py-4">
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-primary-300 rounded-lg bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.icon} {category.name} {category.count !== 'All Posts' ? `(${category.count})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <div className="flex space-x-1 overflow-x-auto py-4 pb-6 custom-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200
                  ${activeCategory === category.name
                    ? 'bg-orange-100 text-orange-700 border border-orange-200 shadow-sm'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-orange-600 border border-transparent'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeCategory === category.name
                    ? 'bg-orange-200 text-orange-800'
                    : 'bg-primary-200 text-primary-600'
                  }
                `}>
                  {category.count === 'All Posts' ? category.count : category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Statistics */}
        <div className="hidden lg:flex items-center justify-between py-3 border-t border-primary-100">
          <div className="flex items-center space-x-6 text-sm text-primary-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>
                {activeCategory === 'All' 
                  ? categories.reduce((sum, cat) => cat.count === 'All Posts' ? sum : sum + cat.count, 0)
                  : categories.find(cat => cat.name === activeCategory)?.count
                } active listings
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>24 new today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>156 verified producers</span>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
