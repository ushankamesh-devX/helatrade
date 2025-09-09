import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isJoinDropdownOpen, setIsJoinDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center flex-shrink-0 w-1/4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">📦</span>
              </div>
              <span className="text-xl font-bold text-gray-800">HelaTrade</span>
            </div>
          </div>

          {/* Middle Section - Search Bar and Navigation */}
          <div className="flex-1 flex items-center justify-center space-x-8 max-w-3xl">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[10px] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-[14px]"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-[14px] whitespace-nowrap">
                Home
              </a>
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center space-x-1 text-[14px] whitespace-nowrap"
                >
                  <span>Categories</span>
                  <svg className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Categories Dropdown Menu */}
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-[10px] shadow-lg border border-gray-200 py-2 z-50">
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Vegetables</a>
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Fruits</a>
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Spices & Herbs</a>
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Dairy Products</a>
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Seafood</a>
                    <a href="#" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Rice & Grains</a>
                  </div>
                )}
              </div>
              
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-[14px] whitespace-nowrap">
                Help
              </a>
            </nav>
          </div>

          {/* Right Section - Auth Buttons */}
          <div className="flex items-center justify-end space-x-3 w-1/4">
            <button className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-[14px] whitespace-nowrap">
              Login
            </button>
            
            {/* Join Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsJoinDropdownOpen(!isJoinDropdownOpen)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-[10px] font-medium transition-colors text-[14px] flex items-center space-x-1 whitespace-nowrap"
              >
                <span>Join</span>
                <svg className={`w-4 h-4 transition-transform ${isJoinDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Join Dropdown Menu */}
              {isJoinDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-[10px] shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <span>🌱</span>
                    <span>Join as Producer</span>
                  </a>
                  <a href="#" className="px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <span>🏪</span>
                    <span>Join as Store</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[10px] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-[14px]"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            
            {/* Mobile Categories */}
            <div>
              <button 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full text-left text-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                <span>Categories</span>
                <svg className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="pl-6 space-y-1">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Vegetables</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Fruits</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Spices & Herbs</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Dairy Products</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Seafood</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Rice & Grains</a>
                </div>
              )}
            </div>
            
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Help
            </a>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-y-2 flex-col">
                <button className="w-full text-left text-gray-700 hover:text-primary-600 font-medium transition-colors text-[14px]">
                  Login
                </button>
                
                {/* Mobile Join Dropdown */}
                <div className="w-full">
                  <button 
                    onClick={() => setIsJoinDropdownOpen(!isJoinDropdownOpen)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-[10px] font-medium transition-colors text-[14px] flex items-center justify-center space-x-1"
                  >
                    <span>Join</span>
                    <svg className={`w-4 h-4 transition-transform ${isJoinDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isJoinDropdownOpen && (
                    <div className="mt-2 w-full bg-white rounded-[10px] border border-gray-200 py-2">
                      <a href="#" className="px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <span>🌱</span>
                        <span>Join as Producer</span>
                      </a>
                      <a href="#" className="px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <span>🏪</span>
                        <span>Join as Store</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isCategoriesOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCategoriesOpen(false)}
        ></div>
      )}
      
      {/* Close join dropdown when clicking outside */}
      {isJoinDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsJoinDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
