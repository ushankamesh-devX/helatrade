import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories';
import { storesAPI } from '../services/api';

const StoreRegistration = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Store Details (Required fields)
    ownerName: '',
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    
    // Step 2: Contact & Location Info
    phone: '',
    website: '',
    description: '',
    businessFocus: '',
    location: {
      province: '',
      district: '',
      city: '',
      address: '',
      postalCode: ''
    },
    
    // Step 3: Categories & Specialties
    interestedCategories: [],
    specialties: [],
    
    // Step 4: Operations Setup
    deliveryOptions: [
      { type: 'pickup', available: true, cost: 0 },
      { type: 'local_delivery', available: false, cost: 0 }
    ],
    paymentMethods: [
      { type: 'cash', available: true },
      { type: 'card', available: false, provider: '' }
    ],
    operatingHours: {
      weekdays: '',
      weekends: ''
    },
    
    // Additional fields
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
      // Fallback categories while loading or if API fails - matching database categories_schema.sql
      return [
        { id: 1, name: 'Vegetables', icon: '�' },
        { id: 2, name: 'Spices & Herbs', icon: '�️' },
        { id: 3, name: 'Fruits', icon: '🥭' },
        { id: 4, name: 'Dairy Products', icon: '🥛' },
        { id: 5, name: 'Seafood', icon: '🐟' },
        { id: 6, name: 'Rice & Grains', icon: '🌾' },
        { id: 7, name: 'Tea & Beverages', icon: '🍃' },
        { id: 8, name: 'Processed Foods', icon: '🍯' },
        { id: 9, name: 'Coconut Products', icon: '🥥' }
      ]
    }
    
    // Use API categories as they are
    return apiCategories.map(cat => ({
      id: cat.id,
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
    { number: 1, title: 'Store Details', description: 'Basic information and credentials' },
    { number: 2, title: 'Contact & Location', description: 'Contact details and location' },
    { number: 3, title: 'Interests & Specialties', description: 'What you want to buy' },
    { number: 4, title: 'Operations Setup', description: 'Delivery and payment options' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target
    
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
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleDeliveryOptionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      )
    }))
  }

  const handlePaymentMethodChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method, i) => 
        i === index ? { ...method, [field]: value } : method
      )
    }))
  }

  const addSpecialty = () => {
    const specialty = document.getElementById('newSpecialty').value.trim()
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }))
      document.getElementById('newSpecialty').value = ''
    }
  }

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
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
    
    try {
      // Prepare request body according to API specification
      const requestBody = {
        ownerName: formData.ownerName,
        storeName: formData.storeName,
        email: formData.email,
        password: formData.password,
        businessType: formData.businessType,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
        description: formData.description || undefined,
        businessFocus: formData.businessFocus || undefined,
        location: {
          province: formData.location.province,
          district: formData.location.district,
          city: formData.location.city,
          address: formData.location.address || undefined,
          postalCode: formData.location.postalCode || undefined
        },
        interestedCategories: formData.interestedCategories,
        specialties: formData.specialties,
        deliveryOptions: formData.deliveryOptions.filter(option => option.available),
        paymentMethods: formData.paymentMethods.filter(method => method.available),
        operatingHours: formData.operatingHours
      }

      // Remove undefined values to keep request clean
      Object.keys(requestBody).forEach(key => {
        if (requestBody[key] === undefined) {
          delete requestBody[key]
        }
      })

      console.log('Store Registration Request Body:', requestBody)
      
      // Make the actual API call
      const response = await storesAPI.register(requestBody)
      
      if (response.success) {
        // Store the token if provided
        if (response.data.token) {
          localStorage.setItem('storeToken', response.data.token)
        }
        
        // Navigate to onboarding/tutorial
        navigate('/store-onboarding')
      } else {
        throw new Error(response.message || 'Registration failed')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      // Handle error - show error message to user
      alert(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        // Validate required fields and business rules
        const isOwnerNameValid = formData.ownerName && formData.ownerName.length >= 2 && formData.ownerName.length <= 255
        const isStoreNameValid = formData.storeName && formData.storeName.length >= 2 && formData.storeName.length <= 255
        const isEmailValid = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        const isPasswordValid = formData.password && formData.password.length >= 8 && 
                               /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
        const isPasswordConfirmed = formData.password === formData.confirmPassword
        const isBusinessTypeSelected = formData.businessType
        
        return isOwnerNameValid && isStoreNameValid && isEmailValid && 
               isPasswordValid && isPasswordConfirmed && isBusinessTypeSelected
      case 2:
        // Location is required, other fields are optional but should be valid if provided
        const isProvinceValid = formData.location.province
        const isDistrictValid = formData.location.district
        const isCityValid = formData.location.city
        const isPhoneValid = !formData.phone || /^\+94\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone)
        const isWebsiteValid = !formData.website || /^https?:\/\/.+/.test(formData.website)
        
        return isProvinceValid && isDistrictValid && isCityValid && isPhoneValid && isWebsiteValid
      case 3:
        return formData.interestedCategories.length > 0
      case 4:
        return true // All fields are optional in operations setup
      default:
        return false
    }
  }

  const getValidationErrors = () => {
    const errors = []
    
    if (currentStep === 1) {
      if (!formData.ownerName || formData.ownerName.length < 2) {
        errors.push('Owner name must be at least 2 characters')
      }
      if (!formData.storeName || formData.storeName.length < 2) {
        errors.push('Store name must be at least 2 characters')
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address')
      }
      if (!formData.password || formData.password.length < 8) {
        errors.push('Password must be at least 8 characters')
      }
      if (formData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.push('Password must contain uppercase, lowercase, and number')
      }
      if (formData.password !== formData.confirmPassword) {
        errors.push('Passwords do not match')
      }
      if (!formData.businessType) {
        errors.push('Please select a business type')
      }
    }
    
    if (currentStep === 2) {
      if (!formData.location.province) errors.push('Province is required')
      if (!formData.location.district) errors.push('District is required')
      if (!formData.location.city) errors.push('City is required')
      if (formData.phone && !/^\+94\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone)) {
        errors.push('Phone number should be in format: +94 77 123 4567')
      }
      if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        errors.push('Website should start with http:// or https://')
      }
    }
    
    if (currentStep === 3) {
      if (formData.interestedCategories.length === 0) {
        errors.push('Please select at least one category')
      }
    }
    
    return errors
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
                  <label htmlFor="ownerName" className="block text-sm font-medium text-primary-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter owner/manager name"
                  />
                </div>

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
                    placeholder="Create a strong password (min 8 chars with uppercase, lowercase, number)"
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
              </div>
            )}

            {/* Step 2: Contact & Location Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-primary-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://yourstore.lk"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                    Store Description
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

                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    Location Information *
                  </h3>
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

                    <div>
                      <label htmlFor="location.city" className="block text-sm font-medium text-primary-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="location.city"
                        name="location.city"
                        required
                        value={formData.location.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label htmlFor="location.postalCode" className="block text-sm font-medium text-primary-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="location.postalCode"
                        name="location.postalCode"
                        value={formData.location.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="00100"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="location.address" className="block text-sm font-medium text-primary-700 mb-2">
                      Full Address
                    </label>
                    <textarea
                      id="location.address"
                      name="location.address"
                      rows={2}
                      value={formData.location.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your store address"
                    />
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

            {/* Step 3: Interests & Specialties */}
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
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    Store Specialties
                  </h3>
                  <p className="text-sm text-primary-600 mb-4">
                    Add specific areas your store specializes in (e.g., "Organic Products", "Local Produce")
                  </p>
                  
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      id="newSpecialty"
                      placeholder="Enter a specialty..."
                      className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                    />
                    <button
                      type="button"
                      onClick={addSpecialty}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {formData.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{specialty}</span>
                          <button
                            type="button"
                            onClick={() => removeSpecialty(specialty)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Operations Setup */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    Delivery Options
                  </h3>
                  <p className="text-sm text-primary-600 mb-4">
                    Configure how you want to receive products from producers
                  </p>
                  
                  <div className="space-y-4">
                    {formData.deliveryOptions.map((option, index) => (
                      <div key={option.type} className="border border-primary-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={option.available}
                              onChange={(e) => handleDeliveryOptionChange(index, 'available', e.target.checked)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-primary-900 capitalize">
                              {option.type.replace('_', ' ')}
                            </span>
                          </label>
                        </div>
                        {option.available && (
                          <div className="ml-6">
                            <label className="block text-sm text-primary-600 mb-1">
                              Cost (LKR)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={option.cost}
                              onChange={(e) => handleDeliveryOptionChange(index, 'cost', parseFloat(e.target.value) || 0)}
                              className="w-32 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    Payment Methods
                  </h3>
                  <p className="text-sm text-primary-600 mb-4">
                    Select payment methods you accept from producers
                  </p>
                  
                  <div className="space-y-4">
                    {formData.paymentMethods.map((method, index) => (
                      <div key={method.type} className="border border-primary-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={method.available}
                              onChange={(e) => handlePaymentMethodChange(index, 'available', e.target.checked)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-primary-900 capitalize">
                              {method.type.replace('_', ' ')}
                            </span>
                          </label>
                        </div>
                        {method.available && method.type === 'card' && (
                          <div className="ml-6">
                            <label className="block text-sm text-primary-600 mb-1">
                              Provider
                            </label>
                            <input
                              type="text"
                              value={method.provider || ''}
                              onChange={(e) => handlePaymentMethodChange(index, 'provider', e.target.value)}
                              className="w-48 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Visa/Mastercard"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-900 mb-4">
                    Operating Hours
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="operatingHours.weekdays" className="block text-sm font-medium text-primary-700 mb-2">
                        Weekdays (Mon-Fri)
                      </label>
                      <input
                        type="text"
                        id="operatingHours.weekdays"
                        name="operatingHours.weekdays"
                        value={formData.operatingHours.weekdays}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="8:00 AM - 8:00 PM"
                      />
                    </div>
                    <div>
                      <label htmlFor="operatingHours.weekends" className="block text-sm font-medium text-primary-700 mb-2">
                        Weekends (Sat-Sun)
                      </label>
                      <input
                        type="text"
                        id="operatingHours.weekends"
                        name="operatingHours.weekends"
                        value={formData.operatingHours.weekends}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="8:00 AM - 9:00 PM"
                      />
                    </div>
                  </div>
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

              <div className="flex flex-col items-end">
                {!validateStep() && getValidationErrors().length > 0 && (
                  <div className="mb-2 text-right">
                    <div className="text-xs text-error-600 max-w-64">
                      {getValidationErrors().slice(0, 2).map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                      {getValidationErrors().length > 2 && (
                        <div>• And {getValidationErrors().length - 2} more...</div>
                      )}
                    </div>
                  </div>
                )}
                
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