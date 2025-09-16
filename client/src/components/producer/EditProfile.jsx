import React, { useState, useRef, useEffect } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { producersAPI } from '../../services/api'

const EditProfile = ({ producer, onUpdate }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    location: '',
    selectedCategories: [],
    description: '',
    website: '',
    establishedYear: '',
    certifications: [],
    specialties: [],
    languages: [],
    businessHours: {
      monday: { open: '08:00', close: '17:00', closed: false },
      tuesday: { open: '08:00', close: '17:00', closed: false },
      wednesday: { open: '08:00', close: '17:00', closed: false },
      thursday: { open: '08:00', close: '17:00', closed: false },
      friday: { open: '08:00', close: '17:00', closed: false },
      saturday: { open: '08:00', close: '14:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    }
  })

  // Initialize profile data from producer prop
  useEffect(() => {
    if (producer) {
      const transformedData = {
        name: producer.name || '',
        businessName: producer.businessType || producer.name || '',
        email: producer.contact?.email || '',
        phone: producer.contact?.phone || '',
        location: producer.location || '',
        selectedCategories: producer.categories ? producer.categories.map(cat => cat.slug) : [],
        description: producer.bio || '',
        website: producer.contact?.website || '',
        establishedYear: producer.foundedYear || '',
        certifications: producer.certifications ? producer.certifications.map(cert => cert.certification_name) : [],
        specialties: producer.specialties || [],
        languages: producer.languages ? producer.languages.map(lang => lang.language) : [],
        businessHours: producer.businessHours ? {
          monday: {
            open: producer.businessHours.monday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.monday?.closeTime?.slice(0, 5) || '17:00',
            closed: producer.businessHours.monday?.isOpen === 0
          },
          tuesday: {
            open: producer.businessHours.tuesday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.tuesday?.closeTime?.slice(0, 5) || '17:00',
            closed: producer.businessHours.tuesday?.isOpen === 0
          },
          wednesday: {
            open: producer.businessHours.wednesday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.wednesday?.closeTime?.slice(0, 5) || '17:00',
            closed: producer.businessHours.wednesday?.isOpen === 0
          },
          thursday: {
            open: producer.businessHours.thursday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.thursday?.closeTime?.slice(0, 5) || '17:00',
            closed: producer.businessHours.thursday?.isOpen === 0
          },
          friday: {
            open: producer.businessHours.friday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.friday?.closeTime?.slice(0, 5) || '17:00',
            closed: producer.businessHours.friday?.isOpen === 0
          },
          saturday: {
            open: producer.businessHours.saturday?.openTime?.slice(0, 5) || '08:00',
            close: producer.businessHours.saturday?.closeTime?.slice(0, 5) || '14:00',
            closed: producer.businessHours.saturday?.isOpen === 0
          },
          sunday: {
            open: producer.businessHours.sunday?.openTime?.slice(0, 5) || '',
            close: producer.businessHours.sunday?.closeTime?.slice(0, 5) || '',
            closed: producer.businessHours.sunday?.isOpen === 0 || true
          }
        } : {
          monday: { open: '08:00', close: '17:00', closed: false },
          tuesday: { open: '08:00', close: '17:00', closed: false },
          wednesday: { open: '08:00', close: '17:00', closed: false },
          thursday: { open: '08:00', close: '17:00', closed: false },
          friday: { open: '08:00', close: '17:00', closed: false },
          saturday: { open: '08:00', close: '14:00', closed: false },
          sunday: { open: '', close: '', closed: true }
        },
        socialMedia: {
          facebook: producer.socialMedia?.facebook || '',
          instagram: producer.socialMedia?.instagram || '',
          twitter: producer.socialMedia?.twitter || '',
          linkedin: producer.socialMedia?.linkedin || '',
          youtube: producer.socialMedia?.youtube || ''
        }
      }
      setProfileData(transformedData)
    }
  }, [producer])

  const [profileImage, setProfileImage] = useState('')
  const [bannerImage, setBannerImage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [newCertification, setNewCertification] = useState('')
  const [newSpecialty, setNewSpecialty] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  // Loading and error states
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')

  const profileImageRef = useRef(null)
  const bannerImageRef = useRef(null)

  // Initialize images from producer data
  useEffect(() => {
    if (producer) {
      setProfileImage(producer.profileImage || producer.avatar || '/api/placeholder/120/120')
      setBannerImage(producer.coverImage || '/api/placeholder/800/300')
    }
  }, [producer])

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for profile editing (add id and maintain icon for multiple selection)
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

  const availableLanguages = [
    'English', 'Sinhala', 'Tamil', 'Arabic', 'Chinese', 'German', 
    'French', 'Spanish', 'Japanese', 'Korean', 'Hindi'
  ]

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear any previous error messages when user starts editing
    if (saveError) setSaveError('')
  }

  const handleNestedInputChange = (parent, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
    // Clear any previous error messages when user starts editing
    if (saveError) setSaveError('')
  }

  const toggleCategory = (categoryId) => {
    setProfileData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }))
    // Clear any previous error messages when user starts editing
    if (saveError) setSaveError('')
  }

  const handleBusinessHoursChange = (day, field, value) => {
    setProfileData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }))
    // Clear any previous error messages when user starts editing
    if (saveError) setSaveError('')
  }

  const handleImageUpload = (type, file) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true)
      const imageUrl = URL.createObjectURL(file)
      
      setTimeout(() => {
        if (type === 'profile') {
          setProfileImage(imageUrl)
        } else {
          setBannerImage(imageUrl)
        }
        setIsUploading(false)
      }, 1000) // Simulate upload delay
    }
  }

  const addArrayItem = (field, value, setter) => {
    if (value.trim() && !profileData[field].includes(value.trim())) {
      setProfileData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
      setter('')
    }
  }

  const removeArrayItem = (field, index) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // Transform form data to API format
  const transformDataForAPI = () => {
    // Get category IDs from selected category slugs
    const categoryIds = profileData.selectedCategories
      .map(slug => {
        const category = categories.find(cat => cat.slug === slug)
        return category ? category.id : null
      })
      .filter(id => id !== null) // Remove null values

    // Transform business hours to API format
    const businessHours = {}
    Object.entries(profileData.businessHours).forEach(([day, hours]) => {
      businessHours[day] = {
        isOpen: !hours.closed,
        openTime: hours.closed ? null : hours.open,
        closeTime: hours.closed ? null : hours.close
      }
    })

    return {
      name: profileData.name,
      bio: profileData.description,
      location: profileData.location,
      businessType: profileData.businessName,
      foundedYear: profileData.establishedYear ? parseInt(profileData.establishedYear) : null,
      email: profileData.email,
      phone: profileData.phone,
      website: profileData.website,
      address: profileData.location, // Using location as address for now
      socialMedia: {
        facebook: profileData.socialMedia.facebook || null,
        instagram: profileData.socialMedia.instagram || null,
        twitter: profileData.socialMedia.twitter || null,
        linkedin: profileData.socialMedia.linkedin || null,
        youtube: profileData.socialMedia.youtube || null
      },
      categories: categoryIds,
      specialties: profileData.specialties,
      certifications: profileData.certifications,
      languages: profileData.languages.map(lang => ({ language: lang, proficiency: 'intermediate' })),
      businessHours
    }
  }

  const handleSaveProfile = async () => {
    if (!producer?.id) {
      setSaveError('Producer data not available')
      return
    }

    // Basic validation
    if (!profileData.name.trim()) {
      setSaveError('Full name is required')
      return
    }

    if (!profileData.businessName.trim()) {
      setSaveError('Business name is required')
      return
    }

    if (profileData.selectedCategories.length === 0) {
      setSaveError('Please select at least one category')
      return
    }

    // Check if categories are loaded
    if (categoriesLoading) {
      setSaveError('Categories are still loading. Please wait.')
      return
    }

    setIsSaving(true)
    setSaveError('')
    setSaveSuccess('')

    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        setSaveError('Authentication token not found. Please login again.')
        return
      }

      // Transform form data to API format
      const apiData = transformDataForAPI()

      // Make API call to update producer
      const response = await producersAPI.update(authToken, producer.id, apiData)

      if (response.success) {
        setSaveSuccess('Profile updated successfully!')

        // Update local producer data if onUpdate callback is provided
        if (onUpdate && response.data) {
          onUpdate(response.data)
        }

        // Update localStorage userData
        const updatedUserData = { ...producer, ...response.data }
        localStorage.setItem('userData', JSON.stringify(updatedUserData))

        // Clear success message after 3 seconds
        setTimeout(() => setSaveSuccess(''), 3000)
      } else {
        setSaveError(response.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setSaveError(
        error.data?.message ||
        error.message ||
        'Failed to update profile. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    { id: 'business', label: 'Business Details', icon: '🏢' },
    { id: 'contact', label: 'Contact & Social', icon: '📱' },
    { id: 'hours', label: 'Business Hours', icon: '🕒' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Edit Profile</h2>
            <p className="text-primary-600">Update your profile information and business details</p>
            
            {/* Success/Error Messages */}
            {saveSuccess && (
              <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {saveSuccess}
                </div>
              </div>
            )}
            
            {saveError && (
              <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {saveError}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.history.back()}
              disabled={isSaving}
              className="px-4 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Banner and Image */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden">
        {/* Banner Image */}
        <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
          <img 
            src={bannerImage} 
            alt="Profile Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <button
            onClick={() => bannerImageRef.current?.click()}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-primary-700 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
            disabled={isUploading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{isUploading ? 'Uploading...' : 'Change Banner'}</span>
          </button>
          <input
            ref={bannerImageRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload('banner', e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Profile Image */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16 mb-4 sm:mb-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => profileImageRef.current?.click()}
                className="absolute bottom-2 right-2 w-8 h-8 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={isUploading}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input
                ref={profileImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('profile', e.target.files[0])}
                className="hidden"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{profileData.name}</h3>
              <p className="text-white text-opacity-90">{profileData.businessName}</p>
              <div className="flex items-center space-x-4 mt-2 text-white text-opacity-75 text-sm">
                <span>{profileData.location}</span>
                <span>•</span>
                <span>{profileData.selectedCategories.length > 0 ? 
                  profileData.selectedCategories.map(catId => 
                    categories.find(cat => cat.id === catId)?.name || catId
                  ).join(', ') : 'No categories selected'}</span>
                <span>•</span>
                <span>Est. {profileData.establishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-orange-100 text-orange-700 shadow-sm'
                  : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={profileData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Established Year</label>
                <input
                  type="number"
                  min="1900"
                  max="2025"
                  value={profileData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-4">Categories *</label>
              <p className="text-sm text-primary-600 mb-4">
                Select all categories that apply to your production
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                      profileData.selectedCategories.includes(category.id)
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
              <label className="block text-sm font-medium text-primary-700 mb-2">Business Description</label>
              <textarea
                value={profileData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell customers about your business, specialties, and what makes you unique..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="City, Province, Country"
              />
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Business Details</h3>
            
            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Certifications</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {cert}
                    <button
                      onClick={() => removeArrayItem('certifications', index)}
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
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add certification..."
                  className="flex-1 border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('certifications', newCertification, setNewCertification)}
                />
                <button
                  onClick={() => addArrayItem('certifications', newCertification, setNewCertification)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Specialties</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {specialty}
                    <button
                      onClick={() => removeArrayItem('specialties', index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty..."
                  className="flex-1 border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('specialties', newSpecialty, setNewSpecialty)}
                />
                <button
                  onClick={() => addArrayItem('specialties', newSpecialty, setNewSpecialty)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Languages Spoken</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.languages.map((language, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {language}
                    <button
                      onClick={() => removeArrayItem('languages', index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="flex-1 border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a language...</option>
                  {availableLanguages
                    .filter(lang => !profileData.languages.includes(lang))
                    .map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                </select>
                <button
                  onClick={() => addArrayItem('languages', newLanguage, setNewLanguage)}
                  disabled={!newLanguage}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-primary-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Contact & Social Media</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary-700 mb-2">Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="border-t border-primary-200 pt-6">
              <h4 className="text-md font-medium text-primary-900 mb-4">Social Media Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Facebook</label>
                  <input
                    type="url"
                    value={profileData.socialMedia.facebook}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'facebook', e.target.value)}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Instagram</label>
                  <input
                    type="url"
                    value={profileData.socialMedia.instagram}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'instagram', e.target.value)}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://instagram.com/youraccount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={profileData.socialMedia.twitter}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'twitter', e.target.value)}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://twitter.com/youraccount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={profileData.socialMedia.linkedin}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'linkedin', e.target.value)}
                    className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Business Hours</h3>
            
            <div className="space-y-4">
              {Object.entries(profileData.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4 p-4 border border-primary-200 rounded-lg">
                  <div className="w-24">
                    <span className="text-sm font-medium text-primary-900 capitalize">{day}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-1">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={hours.closed}
                        onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-primary-600">Closed</span>
                    </label>
                    
                    {!hours.closed && (
                      <>
                        <div>
                          <label className="block text-xs text-primary-500 mb-1">Open</label>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                            className="border border-primary-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <span className="text-primary-400">-</span>
                        <div>
                          <label className="block text-xs text-primary-500 mb-1">Close</label>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                            className="border border-primary-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save Button (Sticky) */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-600">
            Make sure to save your changes before leaving this page.
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.history.back()}
              disabled={isSaving}
              className="px-4 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile