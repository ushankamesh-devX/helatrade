import React, { useState } from 'react'

const StoreHomeFeed = () => {
  const [filter, setFilter] = useState('all')

  // Mock data for connected producers' posts
  const connectedPosts = [
    {
      id: 1,
      producer: {
        name: "Highland Tea Estate",
        avatar: "HT",
        verified: true,
        category: "Tea & Spices"
      },
      content: "Fresh Ceylon black tea harvest just completed! Our high-altitude gardens have produced exceptional quality leaves this season. Perfect for premium exports.",
      image: "/api/placeholder/400/300",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      isLiked: false
    },
    {
      id: 2,
      producer: {
        name: "Organic Valley Farms",
        avatar: "OV",
        verified: true,
        category: "Vegetables"
      },
      content: "Introducing our new organic vegetable subscription box! Weekly delivery of fresh, pesticide-free vegetables straight from our farm to your store.",
      image: "/api/placeholder/400/250",
      likes: 18,
      comments: 12,
      timeAgo: "4 hours ago",
      isLiked: true
    },
    {
      id: 3,
      producer: {
        name: "Spice Garden Lanka",
        avatar: "SG",
        verified: true,
        category: "Spices"
      },
      content: "Premium cinnamon bark ready for export. AAA grade quality with international certifications. Contact us for bulk orders.",
      image: "/api/placeholder/400/280",
      likes: 31,
      comments: 15,
      timeAgo: "6 hours ago",
      isLiked: false
    }
  ]

  // Mock data for trending posts
  const trendingPosts = [
    {
      id: 4,
      producer: {
        name: "Coconut Paradise",
        avatar: "CP",
        verified: false,
        category: "Coconut Products"
      },
      content: "Virgin coconut oil production at its peak! Our traditional cold-pressed method ensures maximum nutrition retention.",
      trending: true,
      likes: 67,
      comments: 23,
      timeAgo: "1 day ago"
    },
    {
      id: 5,
      producer: {
        name: "Rice Valley Co-op",
        avatar: "RV",
        verified: true,
        category: "Grains"
      },
      content: "New season basmati rice now available! Premium quality grain perfect for retail distribution.",
      trending: true,
      likes: 45,
      comments: 19,
      timeAgo: "1 day ago"
    }
  ]

  // Mock data for recommended producers
  const recommendedProducers = [
    {
      id: 1,
      name: "Fresh Fruit Co-op",
      category: "Tropical Fruits",
      connections: 1250,
      avatar: "FF",
      description: "Premium tropical fruit supplier with 15+ years experience",
      isConnected: false
    },
    {
      id: 2,
      name: "Heritage Grains",
      category: "Ancient Grains",
      connections: 890,
      avatar: "HG",
      description: "Specializing in traditional and heritage grain varieties",
      isConnected: false
    },
    {
      id: 3,
      name: "Seafood Direct",
      category: "Fresh Seafood",
      connections: 2100,
      avatar: "SD",
      description: "Daily fresh catch from coastal fishing communities",
      isConnected: false
    }
  ]

  // Mock data for new products
  const newProducts = [
    {
      id: 1,
      name: "Organic Turmeric Powder",
      producer: "Spice Garden Lanka",
      price: "$12.50/kg",
      image: "/api/placeholder/150/150",
      inStock: true,
      category: "Spices"
    },
    {
      id: 2,
      name: "Premium Basmati Rice",
      producer: "Rice Valley Co-op",
      price: "$8.99/kg",
      image: "/api/placeholder/150/150",
      inStock: true,
      category: "Grains"
    },
    {
      id: 3,
      name: "Cold-Pressed Coconut Oil",
      producer: "Coconut Paradise",
      price: "$15.75/L",
      image: "/api/placeholder/150/150",
      inStock: false,
      category: "Oils"
    }
  ]

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6 mb-6">
      {/* Producer Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{post.producer.avatar}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-primary-900">{post.producer.name}</h3>
              {post.producer.verified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {post.trending && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Trending
                </span>
              )}
            </div>
            <p className="text-sm text-primary-500">{post.producer.category} • {post.timeAgo}</p>
          </div>
        </div>
        <button className="text-primary-400 hover:text-primary-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <p className="text-primary-800 mb-4">{post.content}</p>

      {/* Post Image */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-64 object-cover bg-primary-100"
          />
        </div>
      )}

      {/* Engagement Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-primary-100">
        <div className="flex items-center space-x-6">
          <button 
            className={`flex items-center space-x-2 ${post.isLiked ? 'text-orange-600' : 'text-primary-500 hover:text-orange-600'} transition-colors`}
          >
            <svg className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-primary-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-primary-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        <button className="text-primary-400 hover:text-orange-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-2">
        {/* Feed Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 bg-white rounded-lg p-1 shadow-sm border border-primary-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'all' ? 'bg-orange-100 text-orange-700' : 'text-primary-600 hover:text-orange-600'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilter('connected')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'connected' ? 'bg-orange-100 text-orange-700' : 'text-primary-600 hover:text-orange-600'
              }`}
            >
              Connected Producers
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'trending' ? 'bg-orange-100 text-orange-700' : 'text-primary-600 hover:text-orange-600'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div>
          {filter === 'all' && (
            <>
              {connectedPosts.map(post => <PostCard key={post.id} post={post} />)}
              {trendingPosts.map(post => <PostCard key={post.id} post={post} />)}
            </>
          )}
          {filter === 'connected' && connectedPosts.map(post => <PostCard key={post.id} post={post} />)}
          {filter === 'trending' && trendingPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-2 space-y-6">
        {/* Quick Connect */}
        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-900">Quick Connect</h3>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">See All</button>
          </div>
          <div className="space-y-4">
            {recommendedProducers.map(producer => (
              <div key={producer.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{producer.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-primary-900 text-sm">{producer.name}</p>
                    <p className="text-xs text-primary-500">{producer.category} • {producer.connections} connections</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Products */}
        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-900">New Products</h3>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {newProducts.map(product => (
              <div key={product.id} className="flex items-center space-x-3 p-3 border border-primary-100 rounded-lg hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-primary-500 mb-1">{product.producer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-orange-600">{product.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Today's Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-600">New Connections</span>
              <span className="text-sm font-semibold text-orange-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-600">Post Interactions</span>
              <span className="text-sm font-semibold text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-600">New Products</span>
              <span className="text-sm font-semibold text-orange-600">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-600">Notifications</span>
              <span className="text-sm font-semibold text-orange-600">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreHomeFeed