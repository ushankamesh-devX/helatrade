import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories';
import { producersAPI } from '../services/api';

const ProducerRegistration = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info (Required fields)
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Profile Setup
    bio: '',
    location: '',
    avatar: '👨‍🌾', // Default avatar
    businessType: '',
    foundedYear: '',
    
    // Step 3: Contact Information
    contact: {
      email: '',
      phone: '',
      website: '',
      address: ''
    },
    
    // Step 4: Social Media (optional)
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    },
    
    // Step 5: Categories and Expertise
    categories: [], // Will store category IDs
    specialties: [],
    certifications: [],
    
    // Step 6: Languages
    languages: [
      { language: 'English', proficiency: 'intermediate' }
    ],
    
    // Step 7: Business Hours
    businessHours: {
      monday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      tuesday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      wednesday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      thursday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      friday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      saturday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
      sunday: { isOpen: false, openTime: '', closeTime: '' }
    },
    
    // Step 8: Phone Verification
    verificationCode: ''
  })

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for registration (add id and maintain icon)
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      // Fallback categories while loading or if API fails
      return [
        { id: 1, name: 'Vegetables', icon: '🥬' },
        { id: 2, name: 'Fruits', icon: '🍎' },
        { id: 3, name: 'Grains & Rice', icon: '🌾' },
        { id: 4, name: 'Spices', icon: '🌶️' },
        { id: 5, name: 'Tea', icon: '🍃' },
        { id: 6, name: 'Coconut Products', icon: '🥥' },
        { id: 7, name: 'Dairy', icon: '🐄' },
        { id: 8, name: 'Seafood', icon: '🐟' },
        { id: 9, name: 'Herbs', icon: '🌿' },
        { id: 10, name: 'Flowers', icon: '🌺' }
      ]
    }
    
    // Use the API categories with their actual numeric IDs
    return apiCategories.map(cat => ({
      id: cat.id, // Use the actual numeric ID from database
      name: cat.name,
      icon: cat.icon || '🌱' // Fallback icon if none provided
    }))
  }, [apiCategories, categoriesLoading])

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern', 
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ]

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Personal details' },
    { number: 2, title: 'Profile Setup', description: 'Bio and business details' },
    { number: 3, title: 'Contact Information', description: 'Contact details' },
    { number: 4, title: 'Social Media', description: 'Social media links (optional)' },
    { number: 5, title: 'Categories & Expertise', description: 'Areas of expertise' },
    { number: 6, title: 'Languages', description: 'Language preferences' },
    { number: 7, title: 'Business Hours', description: 'Operating hours' },
    { number: 8, title: 'Verification', description: 'Phone verification' }
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
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  const addSpecialty = (specialty) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }))
    }
  }

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
  }

  const addCertification = (certification) => {
    if (certification && !formData.certifications.includes(certification)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certification]
      }))
    }
  }

  const removeCertification = (certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }))
  }

  const updateLanguage = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', proficiency: 'intermediate' }]
    }))
  }

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  const updateBusinessHour = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 8) {
      // Auto-fill contact email from basic email if not already filled
      if (currentStep === 2 && !formData.contact.email) {
        setFormData(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            email: prev.email
          }
        }))
      }
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
    setError(null)
    try {
      // Simulate sending verification code
      // In real implementation, you would call an SMS/verification service
      await new Promise(resolve => setTimeout(resolve, 1500))
      setVerificationSent(true)
      alert('Verification code sent to your phone!')
    } catch (error) {
      setError('Failed to send verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // Format data according to validation middleware expectations
      const registrationData = {
        // Required fields (flat structure, not nested)
        name: formData.name,
        bio: formData.bio || '',
        location: formData.location || '',
        avatar: formData.avatar || '👨‍🌾',
        
        // Business details (match validation field names)
        businessType: formData.businessType || undefined,
        foundedYear: formData.foundedYear && formData.foundedYear.trim() !== '' ? parseInt(formData.foundedYear) : undefined,
        
        // Contact information (flat fields, not nested under 'contact')
        email: formData.contact.email || formData.email,
        phone: formData.contact.phone || '',
        website: formData.contact.website || '',
        address: formData.contact.address || '',
        
        // Social media (flat structure with correct field names)
        socialMedia: {
          facebook: formData.socialMedia.facebook || '',
          instagram: formData.socialMedia.instagram || '',
          twitter: formData.socialMedia.twitter || '',
          linkedin: formData.socialMedia.linkedin || '',
          youtube: formData.socialMedia.youtube || ''
        },
        
        // Categories (ensure they are valid integers and exist)
        categories: formData.categories
          .map(cat => {
            // Ensure we have valid numeric IDs
            const categoryId = typeof cat === 'string' ? parseInt(cat) : cat;
            return isNaN(categoryId) || categoryId <= 0 ? null : categoryId;
          })
          .filter(id => id !== null),
        
        // Specialties and certifications (as string arrays)
        specialties: formData.specialties.filter(s => s.trim() !== ''),
        certifications: formData.certifications.filter(c => c.trim() !== ''),
        
        // Languages (ensure proper format)
        languages: formData.languages
          .filter(lang => lang.language.trim() !== '')
          .map(lang => ({
            language: lang.language.trim(),
            proficiency: lang.proficiency || 'intermediate'
          })),
        
        // Business hours (conditionally include time fields)
        businessHours: Object.fromEntries(
          Object.entries(formData.businessHours).map(([day, hours]) => {
            const dayData = { isOpen: hours.isOpen };
            
            // Only include time fields if the day is open AND has valid times
            if (hours.isOpen) {
              if (hours.openTime && hours.openTime.trim() !== '') {
                dayData.openTime = hours.openTime;
              }
              if (hours.closeTime && hours.closeTime.trim() !== '') {
                dayData.closeTime = hours.closeTime;
              }
            }
            
            return [day, dayData];
          })
        ),
        
        // Authentication data for initial account creation
        password: formData.password,
      }

      // Remove empty social media fields to avoid validation errors
      Object.keys(registrationData.socialMedia).forEach(key => {
        if (!registrationData.socialMedia[key] || registrationData.socialMedia[key].trim() === '') {
          delete registrationData.socialMedia[key];
        }
      });

      // Remove undefined values to avoid validation issues
      Object.keys(registrationData).forEach(key => {
        if (registrationData[key] === undefined || registrationData[key] === '') {
          delete registrationData[key];
        }
      });

      console.log('Registration data to be sent:', registrationData)
      
      // Call the producer registration API
      const response = await producersAPI.register(registrationData)
      
      if (response.success) {
        console.log('Producer registered successfully:', response.data)
        
        // You might want to store user data or token here
        // localStorage.setItem('producerToken', response.token)
        // localStorage.setItem('producerData', JSON.stringify(response.data))
        
        // Navigate to welcome flow
        navigate('/producer-welcome', { 
          state: { 
            producer: response.data,
            message: 'Registration successful!' 
          } 
        })
      } else {
        throw new Error(response.message || 'Registration failed')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific error cases
      if (error.status === 409) {
        setError('A producer with this email already exists. Please use a different email or try logging in.')
      } else if (error.status === 422) {
        // Handle validation errors with detailed information
        if (error.data && error.data.details && Array.isArray(error.data.details)) {
          const fieldErrors = error.data.details.map(detail => 
            `${detail.field}: ${detail.message}`
          ).join(', ');
          setError(`Please fix these issues: ${fieldErrors}`);
        } else {
          setError('Please check your information and make sure all required fields are filled correctly.');
        }
      } else if (error.status === 503) {
        setError('Service is temporarily unavailable. Please try again later.')
      } else if (error.status === 0) {
        setError('Unable to connect to the server. Please check your internet connection.')
      } else {
        setError(error.message || 'Registration failed. Please try again.')
      }
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password && 
               formData.password === formData.confirmPassword
      case 2:
        return formData.bio && formData.location
      case 3:
        return formData.contact.email && formData.contact.phone
      case 4:
        return true // Social media is optional
      case 5:
        return formData.categories.length > 0
      case 6:
        return formData.languages.length > 0 && formData.languages.every(lang => lang.language)
      case 7:
        return true // Business hours have defaults
      case 8:
        return formData.contact.phone && formData.verificationCode
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
          
          {/* Error Alert */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
                  <div className="mt-1 text-sm text-red-700">{error}</div>
                  <div className="mt-2">
                    <button
                      onClick={() => setError(null)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  <label htmlFor="location" className="block text-sm font-medium text-primary-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Nuwara Eliya, Sri Lanka"
                  />
                </div>

                <div>
                  <label htmlFor="avatar" className="block text-sm font-medium text-primary-700 mb-2">
                    Avatar Emoji
                  </label>
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="🌾"
                    maxLength={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-primary-700 mb-2">
                      Business Type
                    </label>
                    <input
                      type="text"
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Family-owned Farm"
                    />
                  </div>

                  <div>
                    <label htmlFor="foundedYear" className="block text-sm font-medium text-primary-700 mb-2">
                      Founded Year
                    </label>
                    <input
                      type="number"
                      id="foundedYear"
                      name="foundedYear"
                      value={formData.foundedYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="2000"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="contact.email" className="block text-sm font-medium text-primary-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contact.email"
                    name="contact.email"
                    required
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="business@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact.phone" className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="contact.phone"
                    name="contact.phone"
                    required
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+94 70 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="contact.website" className="block text-sm font-medium text-primary-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="contact.website"
                    name="contact.website"
                    value={formData.contact.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://yourfarm.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact.address" className="block text-sm font-medium text-primary-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    id="contact.address"
                    name="contact.address"
                    rows={3}
                    value={formData.contact.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Full business address..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Social Media */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-primary-900 mb-2">
                    Social Media Profiles (Optional)
                  </h3>
                  <p className="text-sm text-primary-600">
                    Help customers find and connect with you on social media
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-primary-700 mb-2">
                      <span className="inline-flex items-center">
                        📘 Facebook
                      </span>
                    </label>
                    <input
                      type="url"
                      id="socialMedia.facebook"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://facebook.com/yourfarm"
                    />
                  </div>

                  <div>
                    <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-primary-700 mb-2">
                      <span className="inline-flex items-center">
                        📷 Instagram
                      </span>
                    </label>
                    <input
                      type="url"
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://instagram.com/yourfarm"
                    />
                  </div>

                  <div>
                    <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-primary-700 mb-2">
                      <span className="inline-flex items-center">
                        🐦 Twitter/X
                      </span>
                    </label>
                    <input
                      type="url"
                      id="socialMedia.twitter"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://twitter.com/yourfarm"
                    />
                  </div>

                  <div>
                    <label htmlFor="socialMedia.linkedin" className="block text-sm font-medium text-primary-700 mb-2">
                      <span className="inline-flex items-center">
                        💼 LinkedIn
                      </span>
                    </label>
                    <input
                      type="url"
                      id="socialMedia.linkedin"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://linkedin.com/company/yourfarm"
                    />
                  </div>

                  <div>
                    <label htmlFor="socialMedia.youtube" className="block text-sm font-medium text-primary-700 mb-2">
                      <span className="inline-flex items-center">
                        📺 YouTube
                      </span>
                    </label>
                    <input
                      type="url"
                      id="socialMedia.youtube"
                      name="socialMedia.youtube"
                      value={formData.socialMedia.youtube}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://youtube.com/c/yourfarm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Categories & Expertise */}
            {currentStep === 5 && (
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
                          formData.categories.includes(category.id)
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
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Specialties
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                        >
                          {specialty}
                          <button
                            type="button"
                            onClick={() => removeSpecialty(specialty)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a specialty..."
                        className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addSpecialty(e.target.value.trim())
                            e.target.value = ''
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.previousElementSibling
                          addSpecialty(input.value.trim())
                          input.value = ''
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Certifications
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeCertification(cert)}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a certification..."
                        className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addCertification(e.target.value.trim())
                            e.target.value = ''
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.previousElementSibling
                          addCertification(input.value.trim())
                          input.value = ''
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Languages */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-primary-900 mb-2">
                    Languages You Speak
                  </h3>
                  <p className="text-sm text-primary-600">
                    Help customers communicate with you effectively
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.languages.map((lang, index) => (
                    <div key={index} className="flex space-x-4 p-4 border border-primary-200 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-primary-700 mb-1">
                          Language
                        </label>
                        <input
                          type="text"
                          value={lang.language}
                          onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                          className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="e.g., English"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-primary-700 mb-1">
                          Proficiency
                        </label>
                        <select
                          value={lang.proficiency}
                          onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                          className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="basic">Basic</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="native">Native</option>
                        </select>
                      </div>
                      {formData.languages.length > 1 && (
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="w-full px-4 py-3 border-2 border-dashed border-primary-300 rounded-lg text-primary-600 hover:border-primary-400 hover:text-primary-700 transition-colors"
                  >
                    + Add Another Language
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Business Hours */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-primary-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-sm text-primary-600">
                    Let customers know when you're available
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(formData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4 p-4 border border-primary-200 rounded-lg">
                      <div className="w-24">
                        <span className="text-sm font-medium text-primary-700 capitalize">
                          {day}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => updateBusinessHour(day, 'isOpen', e.target.checked)}
                          className="rounded border-primary-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-primary-600">Open</span>
                      </div>
                      {hours.isOpen && (
                        <>
                          <div>
                            <input
                              type="time"
                              value={hours.openTime}
                              onChange={(e) => updateBusinessHour(day, 'openTime', e.target.value)}
                              className="px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <span className="text-primary-600">to</span>
                          <div>
                            <input
                              type="time"
                              value={hours.closeTime}
                              onChange={(e) => updateBusinessHour(day, 'closeTime', e.target.value)}
                              className="px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Phone Verification */}
            {currentStep === 8 && (
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
                    We'll send a verification code to {formData.contact.phone}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    disabled={!formData.contact.phone || isLoading}
                    className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Sending...' : verificationSent ? 'Resend Code' : 'Send Code'}
                  </button>
                  {verificationSent && (
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Code sent!</span>
                    </div>
                  )}
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

              {currentStep < 8 ? (
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