import React, { useState } from 'react'

const EditStoreDetails = () => {
  const [formData, setFormData] = useState({
    storeName: 'Sarah\'s Fresh Market',
    storeDescription: 'Your neighborhood\'s trusted source for fresh, quality products from local producers. We pride ourselves on connecting our community with the best local agriculture.',
    contactEmail: 'sarah@freshmarket.lk',
    phoneNumber: '+94 77 123 4567',
    address: '123 Main Street, Colombo 03',
    city: 'Colombo',
    district: 'Colombo',
    postalCode: '00300',
    businessType: 'retail',
    storeSize: 'medium',
    establishedYear: '2018',
    website: 'www.sarahsfreshmarket.lk',
    socialMedia: {
      facebook: 'facebook.com/sarahsfreshmarket',
      instagram: '@sarahsfreshmarket',
      whatsapp: '+94 77 123 4567'
    },
    operatingHours: {
      weekdays: '8:00 AM - 8:00 PM',
      weekends: '8:00 AM - 9:00 PM'
    },
    specialties: ['Organic Products', 'Local Produce', 'Fresh Vegetables', 'Spices'],
    deliveryOptions: ['Pickup', 'Local Delivery', 'Island-wide Shipping'],
    paymentMethods: ['Cash', 'Card', 'Digital Payments'],
    certifications: ['Food Safety', 'Organic Certified']
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState('basic')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving store details:', formData)
    setIsEditing(false)
    // Show success message
  }

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: 'info' },
    { id: 'contact', label: 'Contact Details', icon: 'phone' },
    { id: 'business', label: 'Business Info', icon: 'building' },
    { id: 'services', label: 'Services & Features', icon: 'star' }
  ]

  const getSectionIcon = (iconType) => {
    const icons = {
      info: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      phone: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      building: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      ),
      star: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return icons[iconType] || icons.info
  }

  const BasicInfoSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Store Name</label>
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Store Description</label>
        <textarea
          name="storeDescription"
          value={formData.storeDescription}
          onChange={handleInputChange}
          disabled={!isEditing}
          rows={4}
          className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          >
            <option value="retail">Retail Store</option>
            <option value="wholesale">Wholesale</option>
            <option value="restaurant">Restaurant</option>
            <option value="supermarket">Supermarket</option>
            <option value="online">Online Store</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Store Size</label>
          <select
            name="storeSize"
            value={formData.storeSize}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          >
            <option value="small">Small (&lt; 500 sq ft)</option>
            <option value="medium">Medium (500-2000 sq ft)</option>
            <option value="large">Large (&gt; 2000 sq ft)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Established Year</label>
        <input
          type="number"
          name="establishedYear"
          value={formData.establishedYear}
          onChange={handleInputChange}
          disabled={!isEditing}
          min="1900"
          max="2025"
          className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
        />
      </div>
    </div>
  )

  const ContactDetailsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          >
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Kandy">Kandy</option>
            <option value="Matale">Matale</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Mannar">Mannar</option>
            <option value="Vavuniya">Vavuniya</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Ampara">Ampara</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Puttalam">Puttalam</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Badulla">Badulla</option>
            <option value="Moneragala">Moneragala</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Kegalle">Kegalle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder="https://www.yourstore.com"
          className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Facebook</label>
          <input
            type="text"
            name="socialMedia.facebook"
            value={formData.socialMedia.facebook}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="facebook.com/yourstore"
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Instagram</label>
          <input
            type="text"
            name="socialMedia.instagram"
            value={formData.socialMedia.instagram}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="@yourstore"
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">WhatsApp</label>
          <input
            type="tel"
            name="socialMedia.whatsapp"
            value={formData.socialMedia.whatsapp}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="+94 77 123 4567"
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>
      </div>
    </div>
  )

  const BusinessInfoSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Weekday Hours</label>
          <input
            type="text"
            name="operatingHours.weekdays"
            value={formData.operatingHours.weekdays}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="8:00 AM - 8:00 PM"
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-900 mb-2">Weekend Hours</label>
          <input
            type="text"
            name="operatingHours.weekends"
            value={formData.operatingHours.weekends}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="8:00 AM - 9:00 PM"
            className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-primary-50 disabled:text-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Store Specialties</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.specialties.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
            >
              {specialty}
              {isEditing && (
                <button
                  onClick={() => {
                    const newSpecialties = formData.specialties.filter((_, i) => i !== index)
                    handleArrayChange('specialties', newSpecialties)
                  }}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add specialty"
              className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleArrayChange('specialties', [...formData.specialties, e.target.value.trim()])
                  e.target.value = ''
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousElementSibling
                if (input.value.trim()) {
                  handleArrayChange('specialties', [...formData.specialties, input.value.trim()])
                  input.value = ''
                }
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Add
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Certifications</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.certifications.map((cert, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {cert}
              {isEditing && (
                <button
                  onClick={() => {
                    const newCerts = formData.certifications.filter((_, i) => i !== index)
                    handleArrayChange('certifications', newCerts)
                  }}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add certification"
              className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleArrayChange('certifications', [...formData.certifications, e.target.value.trim()])
                  e.target.value = ''
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousElementSibling
                if (input.value.trim()) {
                  handleArrayChange('certifications', [...formData.certifications, input.value.trim()])
                  input.value = ''
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const ServicesSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Delivery Options</label>
        <div className="space-y-3">
          {['Pickup', 'Local Delivery', 'Island-wide Shipping', 'Express Delivery'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.deliveryOptions.includes(option)}
                disabled={!isEditing}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleArrayChange('deliveryOptions', [...formData.deliveryOptions, option])
                  } else {
                    handleArrayChange('deliveryOptions', formData.deliveryOptions.filter(d => d !== option))
                  }
                }}
                className="mr-3 w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-primary-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-900 mb-2">Payment Methods</label>
        <div className="space-y-3">
          {['Cash', 'Card', 'Digital Payments', 'Bank Transfer', 'Mobile Payment'].map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.paymentMethods.includes(method)}
                disabled={!isEditing}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleArrayChange('paymentMethods', [...formData.paymentMethods, method])
                  } else {
                    handleArrayChange('paymentMethods', formData.paymentMethods.filter(p => p !== method))
                  }
                }}
                className="mr-3 w-4 h-4 text-orange-600 border-primary-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-primary-700">{method}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'basic':
        return <BasicInfoSection />
      case 'contact':
        return <ContactDetailsSection />
      case 'business':
        return <BusinessInfoSection />
      case 'services':
        return <ServicesSection />
      default:
        return <BasicInfoSection />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Store Details</h2>
            <p className="text-primary-600 mt-1">Manage your store information and settings</p>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-4">
        <nav className="flex space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
              }`}
            >
              {getSectionIcon(section.icon)}
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
        {renderSectionContent()}
      </div>

      {/* Store Preview Card */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Store Preview</h3>
        <div className="bg-white rounded-lg p-4 border border-orange-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {formData.storeName.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-primary-900">{formData.storeName}</h4>
              <p className="text-sm text-primary-600 capitalize">{formData.businessType} • {formData.storeSize} store</p>
              <p className="text-sm text-primary-700 mt-2">{formData.storeDescription}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-primary-500">
                <span>{formData.city}, {formData.district}</span>
                <span>•</span>
                <span>Est. {formData.establishedYear}</span>
                <span>•</span>
                <span>{formData.specialties.length} specialties</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStoreDetails