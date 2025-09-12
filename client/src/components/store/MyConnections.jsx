import React, { useState } from 'react'

const MyConnections = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for connections
  const connections = [
    {
      id: 1,
      name: "Highland Tea Estate",
      avatar: "HT",
      category: "Tea & Spices",
      location: "Nuwara Eliya",
      connections: 2450,
      connectionDate: "2024-08-15",
      status: "active",
      verified: true,
      lastPost: "2 hours ago",
      description: "Premium Ceylon tea producer with 25+ years experience",
      productsCount: 12,
      rating: 4.8,
      isFavorite: true,
      note: "Excellent quality tea, reliable supplier"
    },
    {
      id: 2,
      name: "Organic Valley Farms",
      avatar: "OV",
      category: "Vegetables",
      location: "Anuradhapura",
      connections: 1850,
      connectionDate: "2024-07-20",
      status: "active",
      verified: true,
      lastPost: "1 day ago",
      description: "Certified organic vegetable farm supplying fresh produce",
      productsCount: 25,
      rating: 4.9,
      isFavorite: false,
      note: "Great variety of organic vegetables"
    },
    {
      id: 3,
      name: "Spice Garden Lanka",
      avatar: "SG",
      category: "Spices",
      location: "Matale",
      connections: 3200,
      connectionDate: "2024-06-10",
      status: "active",
      verified: true,
      lastPost: "3 hours ago",
      description: "Traditional spice cultivation with modern processing",
      productsCount: 18,
      rating: 4.7,
      isFavorite: true,
      note: "Best cinnamon and cardamom quality"
    },
    {
      id: 4,
      name: "Coconut Paradise",
      avatar: "CP",
      category: "Coconut Products",
      location: "Kurunegala",
      connections: 1200,
      connectionDate: "2024-05-25",
      status: "inactive",
      verified: false,
      lastPost: "1 week ago",
      description: "Coconut-based products and virgin coconut oil",
      productsCount: 8,
      rating: 4.3,
      isFavorite: false,
      note: ""
    },
    {
      id: 5,
      name: "Fresh Fruit Co-op",
      avatar: "FF",
      category: "Tropical Fruits",
      location: "Gampaha",
      connections: 980,
      connectionDate: "2024-09-01",
      status: "active",
      verified: true,
      lastPost: "5 hours ago",
      description: "Tropical fruit collective from multiple farms",
      productsCount: 15,
      rating: 4.6,
      isFavorite: false,
      note: "Seasonal fruit specialist"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories', count: connections.length },
    { id: 'Tea & Spices', label: 'Tea & Spices', count: connections.filter(c => c.category === 'Tea & Spices').length },
    { id: 'Vegetables', label: 'Vegetables', count: connections.filter(c => c.category === 'Vegetables').length },
    { id: 'Spices', label: 'Spices', count: connections.filter(c => c.category === 'Spices').length },
    { id: 'Coconut Products', label: 'Coconut Products', count: connections.filter(c => c.category === 'Coconut Products').length },
    { id: 'Tropical Fruits', label: 'Tropical Fruits', count: connections.filter(c => c.category === 'Tropical Fruits').length }
  ]

  const filteredConnections = connections.filter(connection => {
    const matchesCategory = selectedCategory === 'all' || connection.category === selectedCategory
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const favoriteConnections = connections.filter(c => c.isFavorite)
  const activeConnections = connections.filter(c => c.status === 'active')

  const ConnectionCard = ({ connection, isListView = false }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-primary-200 hover:border-orange-200 transition-all duration-200 ${
      isListView ? 'p-4' : 'p-6'
    }`}>
      <div className={`flex ${isListView ? 'items-center space-x-4' : 'flex-col items-center text-center space-y-4'}`}>
        {/* Avatar and Basic Info */}
        <div className={`flex ${isListView ? 'items-center space-x-3' : 'flex-col items-center space-y-3'}`}>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-medium">{connection.avatar}</span>
            </div>
            {connection.isFavorite && (
              <div className="absolute -top-1 -right-1">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className={isListView ? '' : 'text-center'}>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-primary-900">{connection.name}</h3>
              {connection.verified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-primary-600">{connection.category}</p>
            <p className="text-xs text-primary-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {connection.location}
            </p>
          </div>
        </div>

        {/* Details and Actions */}
        <div className={`flex-1 ${isListView ? 'grid grid-cols-2 lg:grid-cols-4 gap-4 items-center' : 'w-full space-y-3'}`}>
          {/* Stats */}
          <div className={`${isListView ? '' : 'flex justify-center space-x-6'}`}>
            <div className={isListView ? 'text-center' : ''}>
              <p className="text-sm font-semibold text-primary-900">{connection.productsCount}</p>
              <p className="text-xs text-primary-500">Products</p>
            </div>
            {!isListView && (
              <>
                <div className="text-center">
                  <p className="text-sm font-semibold text-primary-900">{connection.connections}</p>
                  <p className="text-xs text-primary-500">Connections</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-primary-900">{connection.rating}</p>
                  <p className="text-xs text-primary-500">Rating</p>
                </div>
              </>
            )}
          </div>

          {isListView && (
            <>
              <div className="text-center">
                <p className="text-sm font-semibold text-primary-900">{connection.connections}</p>
                <p className="text-xs text-primary-500">Connections</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-primary-900">{connection.rating}</p>
                <p className="text-xs text-primary-500">Rating</p>
              </div>
            </>
          )}

          {/* Status and Last Activity */}
          <div className={isListView ? 'text-center' : ''}>
            <div className={`flex items-center ${isListView ? 'justify-center' : 'justify-center'} space-x-2 mb-1`}>
              <div className={`w-2 h-2 rounded-full ${connection.status === 'active' ? 'bg-success-500' : 'bg-primary-300'}`} />
              <span className={`text-xs ${connection.status === 'active' ? 'text-success-600' : 'text-primary-500'}`}>
                {connection.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-xs text-primary-500">Last post: {connection.lastPost}</p>
          </div>

          {/* Actions */}
          <div className={`flex ${isListView ? 'justify-center space-x-2' : 'justify-center space-x-3'}`}>
            <button className="p-2 text-primary-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="p-2 text-primary-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              connection.isFavorite 
                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                : 'text-primary-500 hover:text-yellow-600 hover:bg-yellow-50'
            }`}>
              <svg className="w-4 h-4" fill={connection.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Note */}
      {connection.note && !isListView && (
        <div className="mt-4 pt-4 border-t border-primary-100">
          <p className="text-sm text-primary-600 italic">"{connection.note}"</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-primary-900 mb-2">My Connections</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-600">
              <span>Total: {connections.length} producers</span>
              <span>Active: {activeConnections.length}</span>
              <span>Favorites: {favoriteConnections.length}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-primary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-primary-600'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-primary-600'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-primary-50 text-primary-600 hover:bg-orange-50 hover:text-orange-600 border border-primary-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Connections Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map(connection => (
            <ConnectionCard key={connection.id} connection={connection} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConnections.map(connection => (
            <ConnectionCard key={connection.id} connection={connection} isListView={true} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredConnections.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-12 text-center">
          <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-primary-900 mb-2">No connections found</h3>
          <p className="text-primary-500 mb-4">Try adjusting your search or category filters</p>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Discover Producers
          </button>
        </div>
      )}
    </div>
  )
}

export default MyConnections