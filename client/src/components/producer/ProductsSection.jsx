import React, { useState } from 'react'

const ProductsSection = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    unit: '',
    stock: '',
    minOrder: '',
    images: [],
    tags: [],
    availability: 'in-stock'
  })

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Premium Ceylon Tea',
      description: 'High-quality Ceylon tea from the hill country, perfect for export.',
      category: 'Tea',
      price: 450,
      unit: 'per kg',
      stock: 500,
      minOrder: 10,
      images: ['/api/placeholder/200/200', '/api/placeholder/200/200'],
      tags: ['premium', 'ceylon', 'export-quality'],
      availability: 'in-stock',
      createdAt: '2024-01-15',
      analytics: { views: 1200, inquiries: 45, connections: 12 },
      linkedPosts: 3
    },
    {
      id: 2,
      name: 'Organic Cinnamon Sticks',
      description: 'Authentic Ceylon cinnamon sticks, organically grown and processed.',
      category: 'Spices',
      price: 1200,
      unit: 'per kg',
      stock: 150,
      minOrder: 5,
      images: ['/api/placeholder/200/200'],
      tags: ['organic', 'cinnamon', 'authentic'],
      availability: 'in-stock',
      createdAt: '2024-01-12',
      analytics: { views: 890, inquiries: 23, connections: 8 },
      linkedPosts: 2
    },
    {
      id: 3,
      name: 'Fresh Vegetable Mix',
      description: 'Seasonal vegetable mix including tomatoes, carrots, and leafy greens.',
      category: 'Vegetables',
      price: 180,
      unit: 'per kg',
      stock: 0,
      minOrder: 20,
      images: ['/api/placeholder/200/200', '/api/placeholder/200/200', '/api/placeholder/200/200'],
      tags: ['fresh', 'seasonal', 'mixed'],
      availability: 'out-of-stock',
      createdAt: '2024-01-10',
      analytics: { views: 650, inquiries: 18, connections: 5 },
      linkedPosts: 1
    },
    {
      id: 4,
      name: 'Premium Coconut Oil',
      description: 'Pure virgin coconut oil extracted using traditional methods.',
      category: 'Coconut Products',
      price: 800,
      unit: 'per liter',
      stock: 200,
      minOrder: 10,
      images: ['/api/placeholder/200/200'],
      tags: ['virgin', 'traditional', 'pure'],
      availability: 'limited',
      createdAt: '2024-01-08',
      analytics: { views: 1450, inquiries: 67, connections: 15 },
      linkedPosts: 4
    }
  ]

  const categories = ['All Categories', 'Tea', 'Spices', 'Vegetables', 'Fruits', 'Coconut Products', 'Other']
  const units = ['per kg', 'per liter', 'per piece', 'per bundle', 'per box']
  const availabilityOptions = [
    { value: 'in-stock', label: 'In Stock', color: 'green' },
    { value: 'limited', label: 'Limited Stock', color: 'yellow' },
    { value: 'out-of-stock', label: 'Out of Stock', color: 'red' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      case 'most-viewed':
        return b.analytics.views - a.analytics.views
      default:
        return 0
    }
  })

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct)
    setShowAddProduct(false)
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      unit: '',
      stock: '',
      minOrder: '',
      images: [],
      tags: [],
      availability: 'in-stock'
    })
  }

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files)
    const imageUrls = fileArray.map(file => URL.createObjectURL(file))
    setNewProduct(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const removeImage = (index) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const getAvailabilityBadge = (availability) => {
    const option = availabilityOptions.find(opt => opt.value === availability)
    const colorClass = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800'
    }[option.color]
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
        {option.label}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Products Catalog</h2>
            <p className="text-primary-600">Manage your product listings and inventory</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex bg-primary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary-900 shadow-sm' 
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary-900 shadow-sm' 
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                List
              </button>
            </div>
            
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-6 pt-6 border-t border-primary-100">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? 'all' : category}>
                {category}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200">
        {viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <div key={product.id} className="border border-primary-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="aspect-square bg-primary-100 relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.images.length > 1 && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      +{product.images.length - 1}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getAvailabilityBadge(product.availability)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-sm font-bold text-primary-900">
                      Rs. {product.price} {product.unit}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-primary-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-primary-600 line-clamp-2 mb-3">{product.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stock & Analytics */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-primary-500">
                      <span>Stock: {product.stock} kg</span>
                      <span>Min Order: {product.minOrder} kg</span>
                    </div>
                    <div className="flex justify-between text-xs text-primary-500">
                      <span>{product.analytics.views} views</span>
                      <span>{product.analytics.inquiries} inquiries</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-primary-100 text-primary-700 px-3 py-2 rounded text-sm hover:bg-primary-200 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 bg-orange-100 text-orange-700 px-3 py-2 rounded text-sm hover:bg-orange-200 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-primary-100">
            {sortedProducts.map(product => (
              <div key={product.id} className="p-6 hover:bg-primary-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-primary-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-primary-900">{product.name}</h3>
                          {getAvailabilityBadge(product.availability)}
                        </div>
                        <p className="text-sm text-primary-600 mb-2">{product.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-primary-500 mb-2">
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                            {product.category}
                          </span>
                          <span className="font-medium">Rs. {product.price} {product.unit}</span>
                          <span>Stock: {product.stock}</span>
                          <span>Min Order: {product.minOrder}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-primary-500">
                          <span>{product.analytics.views} views</span>
                          <span>{product.analytics.inquiries} inquiries</span>
                          <span>{product.analytics.connections} connections</span>
                          <span>{product.linkedPosts} linked posts</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-primary-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="p-2 text-primary-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="p-2 text-primary-600 hover:text-error-600 hover:bg-error-50 rounded transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-primary-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary-900">Add New Product</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="text-primary-400 hover:text-primary-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your product..."
                />
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Unit</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Min Order</label>
                  <input
                    type="number"
                    value={newProduct.minOrder}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, minOrder: e.target.value }))}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Product Images</label>
                <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <svg className="w-8 h-8 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-primary-600">Click to upload images</p>
                    </div>
                  </label>
                </div>
                
                {newProduct.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {newProduct.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Availability</label>
                <div className="space-y-2">
                  {availabilityOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={newProduct.availability === option.value}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, availability: e.target.value }))}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-primary-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-primary-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-4 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsSection