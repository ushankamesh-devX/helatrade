import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)

  // Mock search suggestions
  const searchSuggestions = [
    { type: 'user', text: 'Fresh Vegetables Lanka', category: 'Producer' },
    { type: 'product', text: 'Organic Tomatoes', category: 'Vegetables' },
    { type: 'category', text: 'Export Quality Spices', category: 'Category' },
    { type: 'location', text: 'Kandy District', category: 'Location' },
  ]

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for 50kg rice',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'message',
      title: 'Message from Buyer',
      message: 'Inquiry about your organic vegetables',
      time: '15 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Profile Verification',
      message: 'Your producer profile has been verified',
      time: '1 hour ago',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-primary-200 shadow-sm">
      <div className="max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo or Empty */}
          <div className="flex items-center">
            {/* Logo or brand could go here */}
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search products, producers, categories..."
                className="block w-full pl-10 pr-4 py-2.5 border border-primary-300 rounded-full bg-primary-50 text-primary-900 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && (searchQuery || true) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-primary-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto custom-scrollbar">
                <div className="p-2">
                  <div className="text-xs font-semibold text-primary-500 uppercase tracking-wide px-2 py-1">
                    Quick Suggestions
                  </div>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center px-3 py-2 text-left hover:bg-primary-50 rounded-md transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion.text)
                        setIsSearchFocused(false)
                      }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        {suggestion.type === 'user' && (
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        )}
                        {suggestion.type === 'product' && (
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
                          </svg>
                        )}
                        {suggestion.type === 'category' && (
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                        )}
                        {suggestion.type === 'location' && (
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary-900 truncate">{suggestion.text}</p>
                        <p className="text-xs text-primary-500">{suggestion.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-2">
            
            {/* Navigation Menu Items */}
            <nav className="hidden lg:flex items-center bg-primary-50 rounded-lg p-1 relative">
              {/* Sliding indicator */}
              <div 
                className={`absolute top-1 bottom-1 bg-orange-100 border border-orange-200 rounded-md transition-all duration-300 ease-in-out ${
                  location.pathname === '/' 
                    ? 'left-1 w-[calc(33.33%-4px)]' 
                    : location.pathname === '/explore'
                    ? 'left-[calc(33.33%+2px)] w-[calc(33.33%-4px)]'
                    : 'left-[calc(66.66%+4px)] w-[calc(33.33%-4px)]'
                }`}
              />
              
              <button 
                onClick={() => navigate('/')}
                className={`relative z-10 flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-orange-700' 
                    : 'text-primary-600 hover:text-orange-600'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Home
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className={`relative z-10 flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  location.pathname === '/explore' 
                    ? 'text-orange-700' 
                    : 'text-primary-600 hover:text-orange-600'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
                </svg>
                Explore
              </button>
              <button 
                onClick={() => navigate('/explore-products')}
                className={`relative z-10 flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  location.pathname === '/explore-products' 
                    ? 'text-orange-700' 
                    : 'text-primary-600 hover:text-orange-600'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
                </svg>
                Products
              </button>
            </nav>
            
            {/* Create Button */}
            <button 
              onClick={() => navigate('/producer-dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ml-4"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Post
            </button>

            {/* Notifications */}
            <div className="relative ml-2">
              <button
                onClick={() => {
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                  setIsProfileDropdownOpen(false)
                }}
                className="relative p-2 text-primary-600 hover:text-orange-600 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-error-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-primary-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto custom-scrollbar">
                  <div className="p-4 border-b border-primary-100">
                    <h3 className="text-lg font-semibold text-primary-900">Notifications</h3>
                  </div>
                  <div className="divide-y divide-primary-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-primary-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                            notification.unread ? 'bg-orange-500' : 'bg-primary-300'
                          }`} />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-primary-900">{notification.title}</p>
                            <p className="text-sm text-primary-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-primary-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-primary-100">
                    <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  setIsNotificationDropdownOpen(false)
                }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-primary-900">John Doe</p>
                  <p className="text-xs text-primary-500">Producer</p>
                </div>
                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-primary-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-primary-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-medium">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900">John Doe</p>
                        <p className="text-xs text-primary-500">john.doe@example.com</p>
                        <p className="text-xs text-orange-600 font-medium">Verified Producer</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a href="/producer/highland-tea-estate" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      My Profile
                    </a>
                    <a href="/producer-dashboard" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Producer Dashboard
                    </a>
                    <button 
                      onClick={() => {
                        navigate('/producer-dashboard')
                        // You can add state to auto-select the profile tab
                        setTimeout(() => {
                          const event = new CustomEvent('selectProfileTab')
                          window.dispatchEvent(event)
                        }, 100)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors text-left"
                    >
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Edit Profile
                    </button>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      My Products
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Orders
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Saved Items
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Settings
                    </a>
                  </div>

                  <div className="border-t border-primary-100 py-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className="lg:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-primary-200">
          <button 
            onClick={() => navigate('/')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              location.pathname === '/' 
                ? 'text-orange-700 bg-orange-100 border-l-4 border-orange-600' 
                : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            Home
          </button>
          <button 
            onClick={() => navigate('/explore')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              location.pathname === '/explore' 
                ? 'text-orange-700 bg-orange-100 border-l-4 border-orange-600' 
                : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
            </svg>
            Explore
          </button>
          <button 
            onClick={() => navigate('/explore-products')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              location.pathname === '/explore-products' 
                ? 'text-orange-700 bg-orange-100 border-l-4 border-orange-600' 
                : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
            </svg>
            Products
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
