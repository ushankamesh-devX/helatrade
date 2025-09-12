import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import PostCard from '../components/ui/PostCard';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: parseInt(id) || 1,
    name: "Premium Ceylon Cinnamon Sticks",
    description: "Authentic Ceylon cinnamon with sweet, delicate flavor. Perfect for premium spice blends and gourmet cooking. Our cinnamon is harvested from the inner bark of evergreen trees belonging to the family Lauraceae. Ceylon cinnamon is lighter in color than the common cassia cinnamon and has a sweeter, more refined taste.",
    longDescription: "Ceylon cinnamon, also known as 'true cinnamon', is native to Sri Lanka and southern India. It is made from the inner bark of the Cinnamomum verum tree. Our premium quality cinnamon sticks are carefully hand-peeled and sun-dried to preserve their natural oils and delicate flavor profile. Unlike cassia cinnamon, Ceylon cinnamon has very low levels of coumarin, making it safer for regular consumption. The sticks have a light brown color and a papery texture that crumbles easily.",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&h=600&fit=crop"
    ],
    price: "Rs. 2,500/kg",
    originalPrice: "Rs. 3,000/kg",
    rating: 4.8,
    reviewCount: 234,
    category: "Spices",
    inStock: true,
    stockQuantity: 1200,
    isOrganic: true,
    isFeatured: true,
    exportQuality: true,
    minOrder: "50kg",
    maxOrder: "500kg",
    producer: {
      id: 1,
      name: "Spice Gardens Ceylon",
      location: "Matale",
      verified: true,
      avatar: "🌿",
      description: "Premium spice producer with 25+ years of experience",
      rating: 4.9,
      totalProducts: 45,
      responseTime: "Within 2 hours",
      establishedYear: 1998
    },
    specifications: {
      origin: "Matale, Sri Lanka",
      processingMethod: "Traditional sun-drying",
      moisture: "≤ 12%",
      packaging: "Food-grade sealed bags",
      shelfLife: "24 months",
      certifications: ["Organic", "Export Quality", "HACCP"]
    },
    nutritionalInfo: {
      calories: "247 per 100g",
      carbohydrates: "80.6g",
      fiber: "53.1g",
      protein: "3.9g",
      fat: "1.2g",
      calcium: "1002mg",
      iron: "8.3mg"
    },
    tags: ["organic", "premium", "export-quality", "ceylon", "cinnamon", "spices"],
    availability: "Year-round",
    paymentTerms: "50% advance, 50% on delivery",
    deliveryTime: "3-5 business days"
  };

  // Mock related posts data
  const mockRelatedPosts = [
    {
      id: 1,
      content: "Fresh harvest of Ceylon cinnamon ready for export! 🌿 Our premium grade cinnamon sticks maintain their natural oils and sweet aroma. Perfect for international buyers looking for authentic Ceylon spices.",
      images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop"],
      producer: {
        name: "Spice Gardens Ceylon",
        location: "Matale",
        verified: true,
        avatar: "🌿"
      },
      category: "Spices",
      likes: 87,
      comments: 23,
      timeAgo: "2 days ago",
      trending: true
    },
    {
      id: 2,
      content: "Behind the scenes: Traditional cinnamon peeling process 📸 Watch how our skilled craftsmen carefully peel and prepare Ceylon cinnamon using techniques passed down through generations.",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop"
      ],
      producer: {
        name: "Spice Gardens Ceylon",
        location: "Matale",
        verified: true,
        avatar: "🌿"
      },
      category: "Process",
      likes: 156,
      comments: 34,
      timeAgo: "1 week ago",
      trending: false
    },
    {
      id: 3,
      content: "Quality certification achieved! 🏆 Our Ceylon cinnamon has received organic and export quality certifications. This ensures our international buyers get the highest grade products.",
      images: ["https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&h=600&fit=crop"],
      producer: {
        name: "Spice Gardens Ceylon",
        location: "Matale",
        verified: true,
        avatar: "🌿"
      },
      category: "Certifications",
      likes: 92,
      comments: 18,
      timeAgo: "2 weeks ago",
      trending: false
    },
    {
      id: 4,
      content: "From our gardens to your table 🍃 See how we maintain sustainable farming practices while producing the world's finest Ceylon cinnamon. Quality and sustainability go hand in hand.",
      images: ["https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop"],
      producer: {
        name: "Spice Gardens Ceylon",
        location: "Matale",
        verified: true,
        avatar: "🌿"
      },
      category: "Sustainability",
      likes: 73,
      comments: 12,
      timeAgo: "3 weeks ago",
      trending: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setRelatedPosts(mockRelatedPosts);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleContactProducer = () => {
    setShowContactModal(true);
  };

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
    setShowImageModal(true);
  };

  const handlePostLike = (postId) => {
    setRelatedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1, isLiked: !post.isLiked }
          : post
      )
    );
  };

  const handlePostSave = (postId) => {
    setRelatedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
  };

  const handlePostComment = (post) => {
    console.log('Comment on post:', post);
  };

  const handlePostContactProducer = (producer) => {
    console.log('Contact producer:', producer);
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xlxxx mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Product Not Found</h2>
          <p className="text-primary-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/explore-products')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-primary-200">
        <div className="max-w-7xlxxx mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate('/')}
              className="text-primary-500 hover:text-orange-600"
            >
              Home
            </button>
            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <button 
              onClick={() => navigate('/explore-products')}
              className="text-primary-500 hover:text-orange-600"
            >
              Products
            </button>
            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-primary-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xlxxx mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Product Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-primary-200 overflow-hidden">
              {/* Main Image */}
              <div className="aspect-video bg-primary-100 relative">
                <img 
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleImageClick(activeImageIndex)}
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {activeImageIndex + 1} / {product.images.length}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          index === activeImageIndex 
                            ? 'border-orange-500' 
                            : 'border-primary-200 hover:border-orange-300'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg border border-primary-200 mt-6 p-6">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Product Details</h2>
              
              <div className="prose prose-primary max-w-none">
                <p className="text-primary-700 leading-relaxed mb-6">
                  {product.longDescription}
                </p>
                
                {/* Specifications */}
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-primary-100">
                      <span className="font-medium text-primary-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-primary-800">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Nutritional Information */}
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Nutritional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-primary-100">
                      <span className="font-medium text-primary-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-primary-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="space-y-6">
            
            {/* Product Info Card */}
            <div className="bg-white rounded-lg border border-primary-200 p-6">
              
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary-900 mb-2">{product.name}</h1>
                <p className="text-primary-600">{product.description}</p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.isOrganic && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      ✓ Organic
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                  {product.exportQuality && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      🌍 Export Quality
                    </span>
                  )}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    product.inStock 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-orange-600">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-primary-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-primary-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-primary-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-600">Minimum Order:</span>
                  <span className="font-medium text-primary-800">{product.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Maximum Order:</span>
                  <span className="font-medium text-primary-800">{product.maxOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Availability:</span>
                  <span className="font-medium text-primary-800">{product.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Delivery Time:</span>
                  <span className="font-medium text-primary-800">{product.deliveryTime}</span>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Quantity (kg)
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-primary-300 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-4 py-2 border border-primary-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-primary-300 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleContactProducer}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    product.inStock
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-primary-300 text-primary-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Contact for Order' : 'Out of Stock'}
                </button>
                
                <button className="w-full py-3 px-4 border border-primary-300 text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                  Save Product
                </button>
              </div>

              {/* Category */}
              <div className="mt-6 pt-6 border-t border-primary-200">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Producer Info Card */}
            <div className="bg-white rounded-lg border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Producer Information</h3>
              
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl">
                  {product.producer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-primary-800">{product.producer.name}</h4>
                    {product.producer.verified && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-primary-600 mb-1">📍 {product.producer.location}</p>
                  <p className="text-sm text-primary-600">{product.producer.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-primary-600">Rating:</span>
                  <span className="text-sm font-medium text-primary-800">⭐ {product.producer.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-primary-600">Total Products:</span>
                  <span className="text-sm font-medium text-primary-800">{product.producer.totalProducts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-primary-600">Response Time:</span>
                  <span className="text-sm font-medium text-primary-800">{product.producer.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-primary-600">Established:</span>
                  <span className="text-sm font-medium text-primary-800">{product.producer.establishedYear}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/producer/${product.producer.id}`)}
                className="w-full py-2 px-4 border border-orange-300 text-orange-700 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                View Producer Profile
              </button>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary-900">Related Posts</h2>
              <p className="text-primary-600 mt-1">See what the producer is sharing about this product</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handlePostLike}
                onSave={handlePostSave}
                onComment={handlePostComment}
                onContactProducer={handlePostContactProducer}
                isLiked={post.isLiked}
                isSaved={post.isSaved}
                size="default"
              />
            ))}
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Contact Producer</h3>
            <p className="text-primary-600 mb-6">
              Send a message to {product.producer.name} about "{product.name}"
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Hi, I'm interested in your Ceylon Cinnamon. Can you provide more details about pricing and availability?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Required Quantity
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., 100kg"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2 px-4 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SingleProduct;