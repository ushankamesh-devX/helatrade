import React from 'react'
import Logo from '../../assets/logo.svg'

const Sidebar = ({ isOpen, onClose }) => {
  const categories = [
    { name: 'Vegetables', icon: '🥬', count: 245, trending: true },
    { name: 'Fruits', icon: '🍎', count: 189, trending: false },
    { name: 'Grains & Rice', icon: '🌾', count: 156, trending: true },
    { name: 'Spices', icon: '🌶️', count: 98, trending: false },
    { name: 'Tea & Coffee', icon: '🍃', count: 67, trending: true },
    { name: 'Coconut Products', icon: '🥥', count: 89, trending: false },
    { name: 'Seafood', icon: '🐟', count: 134, trending: false },
    { name: 'Dairy Products', icon: '🥛', count: 45, trending: false },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-80 bg-white border-r border-primary-200 shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:fixed lg:translate-x-0 lg:h-screen lg:shadow-sm lg:z-40
      `}>
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-200 lg:hidden flex-shrink-0">
          <h2 className="text-lg font-semibold text-primary-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo and Branding */}
        <div className="flex items-start justify-start p-4  border-b border-primary-200">
          <img
            src={Logo}
            alt="HelaTrade Logo"
            className="h-8 "
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Categories Section */}
            <div className="p-3">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-primary-700 uppercase tracking-wide mb-2">
                  Product Categories
                </h4>
                <p className="text-xs text-primary-500">
                  Browse products by category
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-primary-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-primary-900 group-hover:text-orange-600">
                          {category.name}
                        </p>
                        <p className="text-xs text-primary-500">
                          {category.count} products
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {category.trending && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mr-2">
                          Trending
                        </span>
                      )}
                      <svg className="w-4 h-4 text-primary-400 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <h4 className="text-sm font-semibold text-orange-800 mb-2">Featured Category</h4>
                <p className="text-xs text-orange-700 mb-3">
                  Explore our premium export-quality spices collection
                </p>
                <button className="text-xs font-medium text-orange-600 hover:text-orange-700 underline">
                  View Premium Spices →
                </button>
              </div>

              {/* Version Info */}
              <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <div className="text-center">
                  <p className="text-xs text-primary-600 mb-1">HelaTrade Platform</p>
                  <p className="text-xs text-primary-500">v1.0.0 • © 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
