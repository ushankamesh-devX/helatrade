import React, { useState } from 'react';

const ProductSearchFilters = ({ filters, onFiltersChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    'All Locations',
    'Colombo',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Ampara',
    'Negombo',
    'Jaffna',
    'Anuradhapura',
    'Puttalam',
    'Kurunegala',
    'Polonnaruwa'
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under Rs. 500' },
    { value: '500-1000', label: 'Rs. 500 - 1,000' },
    { value: '1000-2500', label: 'Rs. 1,000 - 2,500' },
    { value: '2500+', label: 'Above Rs. 2,500' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white border-b border-primary-200">
      <div className="max-w-7xlx mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          
          {/* Search Input */}
          <div className="flex-1 lg:max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, producers, brands..."
                className="block w-full pl-10 pr-12 py-3 border border-primary-300 rounded-lg bg-white text-primary-900 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-primary-400 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-4 py-3 border border-primary-300 rounded-lg bg-white hover:bg-primary-50 transition-colors"
          >
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            <span className="font-medium text-primary-700">Filters</span>
            <svg
              className={`w-4 h-4 text-primary-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filter Options */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location || 'All Locations'}
                  onChange={(e) => handleFilterChange('location', e.target.value === 'All Locations' ? '' : e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange || 'all'}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Features */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Product Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStockOnly || false}
                      onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-primary-600">In Stock Only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.organicOnly || false}
                      onChange={(e) => handleFilterChange('organicOnly', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-primary-600">Organic Only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.featuredOnly || false}
                      onChange={(e) => handleFilterChange('featuredOnly', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-primary-600">Featured Only</span>
                  </label>
                </div>
              </div>

              {/* Producer Type */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Producer Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.verifiedOnly || false}
                      onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-primary-600">Verified Only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.exportQuality || false}
                      onChange={(e) => handleFilterChange('exportQuality', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-primary-600">Export Quality</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-200">
              <button
                onClick={() => {
                  onFiltersChange({
                    category: 'All',
                    location: '',
                    sortBy: 'popularity',
                    priceRange: 'all',
                    inStockOnly: false,
                    organicOnly: false,
                    featuredOnly: false,
                    verifiedOnly: false,
                    exportQuality: false
                  });
                }}
                className="text-sm text-primary-600 hover:text-orange-600 font-medium"
              >
                Clear All Filters
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-primary-700 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.category !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange('category', 'All')}
                className="ml-2 text-orange-600 hover:text-orange-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange('location', '')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.priceRange && filters.priceRange !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Price: {priceRanges.find(range => range.value === filters.priceRange)?.label}
              <button
                onClick={() => handleFilterChange('priceRange', 'all')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.inStockOnly && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              In Stock Only
              <button
                onClick={() => handleFilterChange('inStockOnly', false)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.organicOnly && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800">
              Organic Only
              <button
                onClick={() => handleFilterChange('organicOnly', false)}
                className="ml-2 text-emerald-600 hover:text-emerald-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.verifiedOnly && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
              Verified Only
              <button
                onClick={() => handleFilterChange('verifiedOnly', false)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchFilters;