import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const ProducerWelcome = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
    price: '',
    quantity: '',
    location: ''
  })

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for welcome/preferences
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      // Fallback categories while loading or if API fails
      return [
        { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
        { id: 'fruits', name: 'Fruits', icon: '🍎' },
        { id: 'grains', name: 'Grains & Rice', icon: '🌾' },
        { id: 'spices', name: 'Spices', icon: '🌶️' },
        { id: 'tea', name: 'Tea', icon: '🍃' },
        { id: 'coconut', name: 'Coconut Products', icon: '🥥' }
      ]
    }
    
    // Transform API categories to match expected format
    return apiCategories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon
    }))
  }, [apiCategories, categoriesLoading])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPostData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const skipToEnd = () => {
    navigate('/producer-dashboard')
  }

  const createFirstPost = () => {
    // Simulate post creation
    navigate('/producer-dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {currentStep === 1 && (
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-8">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              Welcome to HelaTrade! 🎉
            </h1>
            <p className="text-xl text-primary-600 mb-8">
              Your producer account has been successfully created
            </p>
            
            <div className="bg-white rounded-xl shadow-lg border border-primary-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                What's Next?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-900">Create Your First Post</h3>
                    <p className="text-sm text-primary-600">Showcase your products to potential buyers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-900">Connect with Stores</h3>
                    <p className="text-sm text-primary-600">Build relationships with potential buyers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-900">Manage Your Profile</h3>
                    <p className="text-sm text-primary-600">Keep your information updated and complete</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors"
              >
                Create First Post
              </button>
              <button
                onClick={skipToEnd}
                className="px-8 py-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 font-medium transition-colors"
              >
                Skip for Now
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-2">
                Create Your First Post
              </h2>
              <p className="text-primary-600">
                Let stores know what you have available
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-primary-200 p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-primary-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={postData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Fresh Organic Tomatoes"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-3">
                    Category *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setPostData(prev => ({ ...prev, category: category.id }))}
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          postData.category === category.id
                            ? 'bg-orange-100 border-orange-300 text-orange-700'
                            : 'bg-white border-primary-200 text-primary-600 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{category.icon}</div>
                        <div className="text-xs font-medium">{category.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={postData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Describe your product, quality, growing methods, etc..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-primary-700 mb-2">
                      Price (LKR/kg)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={postData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="150"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-primary-700 mb-2">
                      Available Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={postData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="500 kg"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={skipToEnd}
                    className="px-6 py-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Skip for Now
                  </button>
                  <button
                    type="button"
                    onClick={createFirstPost}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProducerWelcome