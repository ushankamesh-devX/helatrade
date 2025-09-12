import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import PostCard from '../components/ui/PostCard';
import ProductCard from '../components/ui/ProductCard';
import { useCategories } from '../hooks/useCategories';

const ProducerProfile = () => {
  const { producerId } = useParams();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  // Get categories from API to map IDs to names
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for display
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      // Fallback categories while loading or if API fails
      return [
        { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
        { id: 'fruits', name: 'Fruits', icon: '🍎' },
        { id: 'grains', name: 'Grains & Rice', icon: '🌾' },
        { id: 'spices', name: 'Spices', icon: '🌶️' },
        { id: 'tea', name: 'Tea', icon: '🍃' },
        { id: 'coconut', name: 'Coconut Products', icon: '🥥' },
        { id: 'dairy', name: 'Dairy', icon: '🐄' },
        { id: 'seafood', name: 'Seafood', icon: '🐟' },
        { id: 'herbs', name: 'Herbs', icon: '🌿' },
        { id: 'flowers', name: 'Flowers', icon: '🌺' }
      ]
    }
    
    // Transform API categories to match expected format
    return apiCategories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon
    }))
  }, [apiCategories, categoriesLoading])

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

  const handleContactForProduct = (product) => {
    console.log('Contacting for product:', product.name);
    // Implement contact for specific product logic here
  };

  const handleProductDetails = (product) => {
    console.log('Viewing product details:', product.name);
    // Implement product details view logic here
    // Could navigate to a product details page or open a modal
  };

  // Mock producer data - Enhanced with edit profile information
  const producer = {
    id: 'highland-tea-estate',
    name: "Highland Tea Estate",
    bio: "Premium Ceylon tea direct from high-altitude plantations in Nuwara Eliya. We are a family-owned business with over 50 years of experience in tea cultivation and processing. Our commitment to sustainable farming practices and traditional methods ensures the highest quality tea for our customers worldwide.",
    location: "Nuwara Eliya, Sri Lanka",
    avatar: "🍃",
    profileImage: "https://images.unsplash.com/photo-1566471369132-2f8bb474e60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1563822249366-dab87a7a5c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: true,
    connections: 245,
    posts: 127,
    likes: 8950,
    joinedDate: "March 2022",
    foundedYear: 1972,
    selectedCategories: ['tea', 'herbs', 'spices'], // Changed from single category to multiple categories
    
    // Business Details
    businessType: "Family-owned Tea Estate",
    specialties: ["Ceylon Black Tea", "Green Tea", "White Tea", "Organic Tea", "Tea Processing"],
    certifications: ["Organic Certification", "Fair Trade Certified", "Rainforest Alliance", "ISO 22000", "HACCP"],
    languages: ["English", "Sinhala", "Tamil"],
    
    // Contact & Social
    contact: {
      email: "info@highlandtea.lk",
      phone: "+94 777 123 456",
      website: "www.highlandtea.lk",
      address: "Highland Estate Road, Nuwara Eliya 22200, Sri Lanka"
    },
    socialMedia: {
      facebook: "https://facebook.com/highlandteaestate",
      instagram: "https://instagram.com/highland_tea_estate",
      twitter: "https://twitter.com/highland_tea",
      linkedin: "https://linkedin.com/company/highland-tea-estate",
      youtube: "https://youtube.com/channel/highland-tea-estate"
    },
    
    // Business Hours
    businessHours: {
      monday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      tuesday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      wednesday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      thursday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      friday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      saturday: { isOpen: true, openTime: "09:00", closeTime: "15:00" },
      sunday: { isOpen: false, openTime: "", closeTime: "" }
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
      description: "High-quality black tea from high-altitude plantations with rich flavor and aroma.",
      price: "$25/kg",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      inStock: true,
      category: "Black Tea",
      isOrganic: true,
      isFeatured: true,
      minOrder: "10kg"
    },
    {
      id: 2,
      name: "Green Tea Special",
      description: "Delicate green tea with natural antioxidants, perfect for health-conscious consumers.",
      price: "$30/kg",
      image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      inStock: true,
      category: "Green Tea",
      isOrganic: true,
      isFeatured: false,
      minOrder: "5kg"
    },
    {
      id: 3,
      name: "White Tea Premium",
      description: "Rare white tea with subtle flavor, handpicked from young tea buds.",
      price: "$45/kg",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      inStock: false,
      category: "White Tea",
      isOrganic: false,
      isFeatured: true,
      minOrder: "2kg"
    },
    {
      id: 4,
      name: "Earl Grey Blend",
      description: "Classic Earl Grey blend with bergamot oil, perfect for afternoon tea.",
      price: "$28/kg",
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      inStock: true,
      category: "Flavored Tea",
      isOrganic: false,
      isFeatured: false,
      minOrder: "8kg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />
        
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
              <div className="max-w-7xlxxx mx-auto">
                <div className="flex items-end space-x-6">
                  {/* Avatar */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30">
                    {producer.profileImage ? (
                      <img 
                        src={producer.profileImage} 
                        alt={producer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl md:text-5xl">{producer.avatar}</span>
                    )}
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
                      <span>•</span>
                      <span>{producer.selectedCategories.length > 0 ? 
                        producer.selectedCategories.map(catId => 
                          categories.find(cat => cat.id === catId)?.name || catId
                        ).join(', ') : 'No categories'}</span>
                      <span>•</span>
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
            <div className="max-w-7xlxxx mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">{producer.connections.toLocaleString()}</div>
                  <div className="text-sm text-primary-600">Connections</div>
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
          <div className="max-w-7xlxxx mx-auto px-6 py-8">
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
                      <ProductCard
                        key={product.id}
                        product={product}
                        onContact={handleContactForProduct}
                        onDetails={handleProductDetails}
                        showContactButton={true}
                        showDetailsButton={true}
                        size="default"
                      />
                    ))}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg border border-primary-200 p-6">
                      <h3 className="text-xl font-semibold text-primary-900 mb-4">About {producer.name}</h3>
                      <p className="text-primary-700 mb-6 leading-relaxed">{producer.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Business Information</h4>
                          <div className="space-y-2 text-sm text-primary-600">
                            <div className="flex justify-between">
                              <span>Business Type:</span>
                              <span className="font-medium text-primary-800">{producer.businessType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Founded:</span>
                              <span className="font-medium text-primary-800">{producer.foundedYear}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span className="font-medium text-primary-800">{producer.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {producer.languages.map((language, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specialties & Certifications */}
                    <div className="bg-white rounded-lg border border-primary-200 p-6">
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
                          <h4 className="font-semibold text-primary-900 mb-3">Certifications</h4>
                          <div className="space-y-2">
                            {producer.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-primary-700">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg border border-primary-200 p-6">
                      <h4 className="font-semibold text-primary-900 mb-4">Contact Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-primary-700">{producer.contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-primary-700">{producer.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                            </svg>
                            <span className="text-primary-700">{producer.contact.website}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-primary-700 text-sm">{producer.contact.address}</span>
                          </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                          <h5 className="font-medium text-primary-900 mb-3">Social Media</h5>
                          <div className="space-y-2">
                            {Object.entries(producer.socialMedia).map(([platform, url]) => (
                              <a 
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-primary-600 hover:text-orange-600 transition-colors"
                              >
                                {platform === 'facebook' && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                )}
                                {platform === 'instagram' && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                  </svg>
                                )}
                                {platform === 'twitter' && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                  </svg>
                                )}
                                {platform === 'linkedin' && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                )}
                                {platform === 'youtube' && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                  </svg>
                                )}
                                <span className="capitalize font-medium">{platform}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white rounded-lg border border-primary-200 p-6">
                      <h4 className="font-semibold text-primary-900 mb-4">Business Hours</h4>
                      <div className="space-y-2">
                        {Object.entries(producer.businessHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center py-2">
                            <span className="capitalize font-medium text-primary-800">{day}</span>
                            {hours.isOpen ? (
                              <span className="text-green-600 font-medium">
                                {hours.openTime} - {hours.closeTime}
                              </span>
                            ) : (
                              <span className="text-red-500 font-medium">Closed</span>
                            )}
                          </div>
                        ))}
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
                      { name: "Mountain Spice Co.", avatar: "🌶️", location: "Matale", connections: 890, id: "mountain-spice-co" },
                      { name: "Fresh Valley Farms", avatar: "🥬", location: "Kandy", connections: 675, id: "fresh-valley-farms" },
                      { name: "Golden Grain Mills", avatar: "🌾", location: "Ampara", connections: 456, id: "golden-grain-mills" }
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
                          Connect
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
