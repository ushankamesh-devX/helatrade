import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories';

const StoreRegistration = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Store Details
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Info
    businessType: '',
    logo: null,
    location: {
      province: '',
      district: '',
      city: '',
      address: ''
    },
    phone: '',
    website: '',
    description: '',
    
    // Step 3: Interests
    interestedCategories: [],
    businessFocus: '',
    
    // Step 4: Find Producers
    selectedProducers: [],
    connectWithAll: false
  })

  const businessTypes = [
    { id: 'retail', name: 'Retail Store', icon: '🏪', description: 'Selling directly to consumers' },
    { id: 'wholesale', name: 'Wholesale', icon: '📦', description: 'Bulk purchasing and distribution' },
    { id: 'restaurant', name: 'Restaurant/Hotel', icon: '🍽️', description: 'Food service business' },
    { id: 'export', name: 'Export Business', icon: '🚢', description: 'International trade' },
    { id: 'processing', name: 'Processing Unit', icon: '🏭', description: 'Food processing and packaging' },
    { id: 'online', name: 'Online Store', icon: '💻', description: 'E-commerce platform' }
  ]

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for store registration
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

  const mockProducers = [
    {
      id: 1,
      name: 'Highland Tea Estate',
      location: 'Kandy, Central',
      category: 'Tea',
      rating: 4.8,
      products: 15,
      image: '🍃'
    },
    {
      id: 2,
      name: 'Fresh Valley Farms',
      location: 'Nuwara Eliya, Central',
      category: 'Vegetables',
      rating: 4.9,
      products: 25,
      image: '🥬'
    },
    {
      id: 3,
      name: 'Spice Garden Lanka',
      location: 'Matale, Central',
      category: 'Spices',
      rating: 4.7,
      products: 30,
      image: '🌶️'
    },
    {
      id: 4,
      name: 'Coconut Paradise',
      location: 'Gampaha, Western',
      category: 'Coconut Products',
      rating: 4.6,
      products: 12,
      image: '🥥'
    },
    {
      id: 5,
      name: 'Golden Rice Mills',
      location: 'Polonnaruwa, North Central',
      category: 'Grains & Rice',
      rating: 4.8,
      products: 8,
      image: '🌾'
    }
  ]

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern', 
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ]

  const steps = [
    { number: 1, title: 'Store Details', description: 'Basic information' },
    { number: 2, title: 'Business Info', description: 'Location and contact' },
    { number: 3, title: 'Interests', description: 'What you want to buy' },
    { number: 4, title: 'Connect', description: 'Find producers' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const toggleCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      interestedCategories: prev.interestedCategories.includes(categoryId)
        ? prev.interestedCategories.filter(id => id !== categoryId)
        : [...prev.interestedCategories, categoryId]
    }))
  }

  const toggleProducer = (producerId) => {
    setFormData(prev => ({
      ...prev,
      selectedProducers: prev.selectedProducers.includes(producerId)
        ? prev.selectedProducers.filter(id => id !== producerId)
        : [...prev.selectedProducers, producerId]
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Navigate to onboarding/tutorial
    navigate('/store-onboarding')
    setIsLoading(false)
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.storeName && formData.email && formData.password && 
               formData.password === formData.confirmPassword
      case 2:
        return formData.businessType && formData.location.province && 
               formData.location.district && formData.phone
      case 3:
        return formData.interestedCategories.length > 0
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary-900">
            Join as a Store
          </h2>
          <p className="mt-2 text-sm text-primary-600">
            Connect with producers and source quality products
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white'
                    : currentStep === step.number
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-primary-200 text-primary-500'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-primary-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary-900">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-sm text-primary-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-primary-200 p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Store Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-primary-700 mb-2">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    required
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your store name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a strong password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-sm text-error-600">Passwords do not match</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Business Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-3">
                    Business Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {businessTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, businessType: type.id }))}
                        className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                          formData.businessType === type.id
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-white border-primary-200 text-primary-600 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{type.icon}</div>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-primary-500">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-primary-700 mb-2">
                    Store Logo
                  </label>
                  <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      <svg className="mx-auto h-12 w-12 text-primary-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-2">
                        <span className="text-blue-600 font-medium">Upload logo</span>
                        <span className="text-primary-500"> or drag and drop</span>
                      </div>
                      <p className="text-xs text-primary-500">PNG, JPG, SVG up to 5MB</p>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location.province" className="block text-sm font-medium text-primary-700 mb-2">
                      Province *
                    </label>
                    <select
                      id="location.province"
                      name="location.province"
                      required
                      value={formData.location.province}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location.district" className="block text-sm font-medium text-primary-700 mb-2">
                      District *
                    </label>
                    <input
                      type="text"
                      id="location.district"
                      name="location.district"
                      required
                      value={formData.location.district}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter district"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+94 11 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your business..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    What products are you interested in? *
                  </h3>
                  <p className="text-sm text-primary-600 mb-6">
                    Select categories you want to source from producers
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                          formData.interestedCategories.includes(category.id)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-white border-primary-200 text-primary-600 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="businessFocus" className="block text-sm font-medium text-primary-700 mb-2">
                    Business Focus
                  </label>
                  <textarea
                    id="businessFocus"
                    name="businessFocus"
                    rows={3}
                    value={formData.businessFocus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What are your specific requirements? Quality standards, quantities, etc..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Find Producers */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-primary-900 mb-2">
                    Connect with Producers
                  </h3>
                  <p className="text-sm text-primary-600">
                    Start building relationships with quality producers
                  </p>
                </div>

                <div className="space-y-4">
                  {mockProducers.map(producer => (
                    <div
                      key={producer.id}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        formData.selectedProducers.includes(producer.id)
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white border-primary-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                            {producer.image}
                          </div>
                          <div>
                            <h4 className="font-medium text-primary-900">{producer.name}</h4>
                            <p className="text-sm text-primary-600">{producer.location}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-primary-500">{producer.category}</span>
                              <span className="text-xs text-primary-500">⭐ {producer.rating}</span>
                              <span className="text-xs text-primary-500">{producer.products} products</span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleProducer(producer.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.selectedProducers.includes(producer.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          {formData.selectedProducers.includes(producer.id) ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4 border-t border-primary-200">
                  <p className="text-sm text-primary-600 mb-3">
                    Or connect with all recommended producers
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      connectWithAll: !prev.connectWithAll,
                      selectedProducers: !prev.connectWithAll ? mockProducers.map(p => p.id) : []
                    }))}
                    className="px-6 py-2 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {formData.connectWithAll ? 'Disconnect All' : 'Connect with All'}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-primary-200 mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-primary-300 rounded-lg text-primary-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-primary-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoreRegistration