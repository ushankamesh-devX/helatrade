import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories';

const ProducerRegistration = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Profile Setup
    bio: '',
    profileImage: null,
    location: {
      province: '',
      district: '',
      city: '',
      address: ''
    },
    
    // Step 3: Categories
    selectedCategories: [],
    expertise: '',
    
    // Step 4: Phone Verification
    phone: '',
    verificationCode: ''
  })

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for registration (add id and maintain icon)
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

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern', 
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ]

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Personal details' },
    { number: 2, title: 'Profile Setup', description: 'Bio and location' },
    { number: 3, title: 'Categories', description: 'Areas of expertise' },
    { number: 4, title: 'Verification', description: 'Phone verification' }
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
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
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

  const sendVerificationCode = async () => {
    setIsLoading(true)
    // Simulate sending verification code
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    alert('Verification code sent to your phone!')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Navigate to welcome flow
    navigate('/producer-welcome')
    setIsLoading(false)
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password && 
               formData.password === formData.confirmPassword
      case 2:
        return formData.bio && formData.location.province && formData.location.district
      case 3:
        return formData.selectedCategories.length > 0
      case 4:
        return formData.phone && formData.verificationCode
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary-900">
            Join as a Producer
          </h2>
          <p className="mt-2 text-sm text-primary-600">
            Connect with stores and grow your business
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-orange-600 text-white'
                    : currentStep === step.number
                    ? 'bg-orange-100 text-orange-600 border-2 border-orange-600'
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
                    currentStep > step.number ? 'bg-orange-600' : 'bg-primary-200'
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
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
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
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirm your password"
                  />
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-sm text-error-600">Passwords do not match</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Profile Setup */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-primary-700 mb-2">
                    Bio / Description *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tell us about yourself and your farming background..."
                  />
                </div>

                <div>
                  <label htmlFor="profileImage" className="block text-sm font-medium text-primary-700 mb-2">
                    Profile Image
                  </label>
                  <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <svg className="mx-auto h-12 w-12 text-primary-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-2">
                        <span className="text-orange-600 font-medium">Upload a file</span>
                        <span className="text-primary-500"> or drag and drop</span>
                      </div>
                      <p className="text-xs text-primary-500">PNG, JPG, GIF up to 10MB</p>
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
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter district"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location.address" className="block text-sm font-medium text-primary-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="location.address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Farm address (optional)"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Categories */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    What do you produce? *
                  </h3>
                  <p className="text-sm text-primary-600 mb-6">
                    Select all categories that apply to your production
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                          formData.selectedCategories.includes(category.id)
                            ? 'bg-orange-100 border-orange-300 text-orange-700'
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
                  <label htmlFor="expertise" className="block text-sm font-medium text-primary-700 mb-2">
                    Tell us more about your expertise
                  </label>
                  <textarea
                    id="expertise"
                    name="expertise"
                    rows={3}
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Describe your farming methods, specialties, certifications, etc..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Phone Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-primary-900">
                    Verify your phone number
                  </h3>
                  <p className="text-sm text-primary-600">
                    We'll send a verification code to confirm your identity
                  </p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+94 70 123 4567"
                    />
                    <button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={!formData.phone || isLoading}
                      className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Sending...' : 'Send Code'}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-primary-700 mb-2">
                    Verification Code *
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    required
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
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
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep() || isLoading}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProducerRegistration