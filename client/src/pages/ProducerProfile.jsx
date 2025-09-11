import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import Footer from '../components/ui/Footer';
import PostCard from '../components/ui/PostCard';

const ProducerProfile = () => {
  const { producerId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleSave = (postId) => {
    const newSavedPosts = new Set(savedPosts);
    if (newSavedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
  };

  const handleContactProducer = (producer) => {
    console.log('Contacting producer:', producer.name);
    // Implement contact producer logic here
  };

  // Mock producer data
  const producer = {
    id: 'highland-tea-estate',
    name: "Highland Tea Estate",
    bio: "Premium Ceylon tea direct from high-altitude plantations in Nuwara Eliya. We are a family-owned business with over 50 years of experience in tea cultivation and processing.",
    location: "Nuwara Eliya, Sri Lanka",
    avatar: "🍃",
    coverImage: "https://images.unsplash.com/photo-1563822249366-dab87a7a5c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: true,
    followers: 2450,
    following: 180,
    posts: 127,
    likes: 8950,
    joinedDate: "March 2022",
    specialties: ["Tea", "Coffee", "Spices"],
    contact: {
      email: "info@highlandtea.lk",
      phone: "+94 777 123 456",
      website: "www.highlandtea.lk"
    },
    rating: 4.8,
    totalOrders: 450
  };

  // Mock posts data - converted to match PostCard expected format
  const posts = [
    {
      id: 1,
      producer: {
        name: producer.name,
        avatar: producer.avatar,
        verified: producer.verified,
        location: producer.location.split(',')[0] // Just the city
      },
      content: "Fresh tea leaves harvested this morning from our high-altitude plantation. The quality of Ceylon tea is unmatched! 🍃",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: 245,
      comments: 23,
      shares: 15,
      timeAgo: "2 hours ago",
      timestamp: "2 hours ago",
      category: "Tea",
      trending: false
    },
    {
      id: 2,
      producer: {
        name: producer.name,
        avatar: producer.avatar,
        verified: producer.verified,
        location: producer.location.split(',')[0]
      },
      content: "Take a tour of our tea processing facility. From leaf to cup, every step is carefully monitored for quality.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: 189,
      comments: 31,
      shares: 12,
      timeAgo: "1 day ago",
      timestamp: "1 day ago",
      category: "Process",
      trending: false
    },
    {
      id: 3,
      producer: {
        name: producer.name,
        avatar: producer.avatar,
        verified: producer.verified,
        location: producer.location.split(',')[0]
      },
      content: "Our premium black tea selection ready for export. Available in bulk quantities for international buyers.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: 156,
      comments: 18,
      shares: 8,
      timeAgo: "3 days ago",
      timestamp: "3 days ago",
      category: "Product",
      trending: false
    }
  ];

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Premium Ceylon Black Tea",
      price: "$25/kg",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      inStock: true
    },
    {
      id: 2,
      name: "Green Tea Special",
      price: "$30/kg",
      image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: "White Tea Premium",
      price: "$45/kg",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      inStock: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar - Fixed position */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      </div>

      {/* Right Main Content with left margin for fixed sidebar */}
      <div className="min-h-screen flex flex-col lg:ml-80">
        {/* Header */}
        <Header onSidebarToggle={handleSidebarToggle} />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Cover Image/Banner */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ 
                backgroundImage: `url(${producer.coverImage})` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Producer Basic Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-end space-x-6">
                  {/* Avatar */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl md:text-5xl border-4 border-white/30">
                    {producer.avatar}
                  </div>
                  
                  {/* Name and basic info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl md:text-4xl font-bold truncate">{producer.name}</h1>
                      {producer.verified && (
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-white/90 text-sm md:text-base">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {producer.location}
                      </span>
                      <span>Joined {producer.joinedDate}</span>
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <div className="hidden md:block">
                    <button
                      onClick={handleConnect}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        isConnected
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-orange-600 text-white hover:bg-orange-700'
                      }`}
                    >
                      {isConnected ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white border-b border-primary-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">{producer.followers.toLocaleString()}</div>
                  <div className="text-sm text-primary-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">{producer.following}</div>
                  <div className="text-sm text-primary-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">{producer.posts}</div>
                  <div className="text-sm text-primary-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">{producer.likes.toLocaleString()}</div>
                  <div className="text-sm text-primary-600">Likes</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-primary-900">{producer.rating}</span>
                  </div>
                  <div className="text-sm text-primary-600">Rating</div>
                </div>
              </div>

              {/* Mobile Connect Button */}
              <div className="md:hidden pb-4">
                <button
                  onClick={handleConnect}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isConnected
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {isConnected ? 'Connected ✓' : 'Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content - Posts/Products */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg border border-primary-200 p-6">
                  <div className="flex space-x-6 border-b border-primary-200">
                    {[
                      { id: 'posts', label: 'Posts', icon: '📝' },
                      { id: 'products', label: 'Products', icon: '📦' },
                      { id: 'about', label: 'About', icon: 'ℹ️' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-orange-600 text-orange-600'
                            : 'border-transparent text-primary-600 hover:text-orange-600'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posts Tab */}
                {activeTab === 'posts' && (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                        onSave={handleSave}
                        onContactProducer={handleContactProducer}
                        isLiked={likedPosts.has(post.id)}
                        isSaved={savedPosts.has(post.id)}
                        showTrendingBadge={false}
                        showCategory={true}
                        showContactButton={false}
                        size="default"
                      />
                    ))}
                  </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg border border-primary-200 overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-primary-900">{product.name}</h3>
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm text-primary-600">{product.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-orange-600">{product.price}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.inStock 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          
                          <button 
                            disabled={!product.inStock}
                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                              product.inStock
                                ? 'bg-orange-600 text-white hover:bg-orange-700'
                                : 'bg-primary-300 text-primary-500 cursor-not-allowed'
                            }`}
                          >
                            {product.inStock ? 'Contact for Order' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="bg-white rounded-lg border border-primary-200 p-6">
                    <h3 className="text-xl font-semibold text-primary-900 mb-4">About {producer.name}</h3>
                    <p className="text-primary-700 mb-6 leading-relaxed">{producer.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary-900 mb-3">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {producer.specialties.map((specialty, index) => (
                            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary-900 mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm text-primary-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span>{producer.contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{producer.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                            </svg>
                            <span>{producer.contact.website}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Quick Stats */}
                <div className="bg-white rounded-lg border border-primary-200 p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-primary-600">Total Orders:</span>
                      <span className="font-semibold text-primary-900">{producer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Response Rate:</span>
                      <span className="font-semibold text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Avg. Response:</span>
                      <span className="font-semibold text-primary-900">2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Member Since:</span>
                      <span className="font-semibold text-primary-900">{producer.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-lg border border-primary-200 p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Location</h3>
                  <div className="aspect-video bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm">{producer.location}</p>
                    </div>
                  </div>
                </div>

                {/* Similar Producers */}
                <div className="bg-white rounded-lg border border-primary-200 p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Similar Producers</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Mountain Spice Co.", avatar: "🌶️", location: "Matale", followers: 890, id: "mountain-spice-co" },
                      { name: "Fresh Valley Farms", avatar: "🥬", location: "Kandy", followers: 675, id: "fresh-valley-farms" },
                      { name: "Golden Grain Mills", avatar: "🌾", location: "Ampara", followers: 456, id: "golden-grain-mills" }
                    ].map((similar, index) => (
                      <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-primary-50 p-2 rounded-lg transition-colors" onClick={() => navigate(`/producer/${similar.id}`)}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-sm">
                            {similar.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-primary-900 text-sm">{similar.name}</p>
                            <p className="text-xs text-primary-500">{similar.location}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                        >
                          Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ProducerProfile;
