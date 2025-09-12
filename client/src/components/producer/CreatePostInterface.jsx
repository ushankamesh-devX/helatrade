// import React, { useState, useRef } from 'react'

import React, { useState, useRef } from 'react'
import { useCategories } from '../../hooks/useCategories'

const CreatePostInterface = ({ onClose, onSubmit }) => {
  const [postData, setPostData] = useState({
    content: '',
    category: '',
    tags: [],
    visibility: 'public',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
    linkedProducts: []
  })
  
  const [tagInput, setTagInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [uploadedMedia, setUploadedMedia] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for post categorization
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      // Fallback categories while loading or if API fails
      return [
        'Agriculture', 'Tea', 'Spices', 'Vegetables', 'Fruits', 
        'Organic Products', 'Export Quality', 'Coconut Products'
      ]
    }
    
    // Use API categories and add some additional post-specific ones
    const categoryNames = [
      ...apiCategories.map(cat => cat.name),
      'Organic Products', 
      'Export Quality'
    ]
    // Remove duplicates
    return [...new Set(categoryNames)]
  }, [apiCategories, categoriesLoading])

  const visibilityOptions = [
    { value: 'public', label: 'Public', icon: '🌍', description: 'Anyone can see this post' },
    { value: 'connections', label: 'Connections Only', icon: '👥', description: 'Only your connections can see this' },
    { value: 'draft', label: 'Save as Draft', icon: '📝', description: 'Save for later publishing' }
  ]

  const mockProducts = [
    { id: 1, name: 'Premium Ceylon Tea', category: 'Tea', image: '/api/placeholder/60/60' },
    { id: 2, name: 'Organic Cinnamon', category: 'Spices', image: '/api/placeholder/60/60' },
    { id: 3, name: 'Fresh Vegetables Mix', category: 'Vegetables', image: '/api/placeholder/60/60' }
  ]

  const emojis = ['🌱', '🌿', '🍃', '🌾', '🌽', '🥕', '🍅', '🥬', '🌶️', '🧄', '🧅', '🍇', '🍊', '🍋', '🥭', '🥥', '☕', '🍵']

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!postData.tags.includes(tagInput.trim())) {
        setPostData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files)
    const newMedia = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
      name: file.name
    }))
    setUploadedMedia(prev => [...prev, ...newMedia])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeMedia = (mediaId) => {
    setUploadedMedia(prev => prev.filter(media => media.id !== mediaId))
  }

  const toggleProductLink = (product) => {
    setPostData(prev => ({
      ...prev,
      linkedProducts: prev.linkedProducts.find(p => p.id === product.id)
        ? prev.linkedProducts.filter(p => p.id !== product.id)
        : [...prev.linkedProducts, product]
    }))
  }

  const insertEmoji = (emoji) => {
    setPostData(prev => ({
      ...prev,
      content: prev.content + emoji
    }))
    setShowEmojiPicker(false)
  }

  const handlePost = () => {
    // Handle post creation logic here
    console.log('Creating post:', postData)
    console.log('Media:', uploadedMedia)
  }

  const handleSchedule = () => {
    // Handle post scheduling logic here
    console.log('Scheduling post:', postData)
    console.log('Scheduled for:', postData.scheduledDate, postData.scheduledTime)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-medium">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Create New Post</h2>
            <p className="text-primary-600">Share what's happening on your farm</p>
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={postData.content}
              onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="What's happening on your farm today? Share your story..."
              className="w-full min-h-32 p-4 border border-primary-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-primary-900 placeholder-primary-500"
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-primary-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                😊
              </button>
              <span className="text-sm text-primary-400">{postData.content.length}/2000</span>
            </div>
            
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-16 right-4 bg-white border border-primary-200 rounded-lg shadow-lg p-4 z-10">
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => insertEmoji(emoji)}
                      className="text-xl hover:bg-primary-100 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">Tags</label>
            <div className="border border-primary-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <div className="flex flex-wrap gap-2 mb-2">
                {postData.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="Add tags (press Enter)..."
                className="w-full border-none outline-none text-primary-900 placeholder-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Media Upload</h3>
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragOver ? 'border-orange-500 bg-orange-50' : 'border-primary-300 hover:border-orange-400'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-primary-900 font-medium">Drop files here or click to upload</p>
              <p className="text-primary-500 text-sm">Support for images and videos up to 10MB</p>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />

        {/* Uploaded Media Preview */}
        {uploadedMedia.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedMedia.map((media) => (
              <div key={media.id} className="relative group">
                <div className="aspect-square bg-primary-100 rounded-lg overflow-hidden">
                  {media.type === 'image' ? (
                    <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                  ) : (
                    <video src={media.url} className="w-full h-full object-cover" />
                  )}
                </div>
                <button
                  onClick={() => removeMedia(media.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category & Visibility */}
        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Post Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Category</label>
              <select
                value={postData.category}
                onChange={(e) => setPostData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select category...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Visibility</label>
              <div className="space-y-2">
                {visibilityOptions.map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={postData.visibility === option.value}
                      onChange={(e) => setPostData(prev => ({ ...prev, visibility: e.target.value }))}
                      className="mt-1 text-orange-600 focus:ring-orange-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{option.icon}</span>
                        <span className="font-medium text-primary-900">{option.label}</span>
                      </div>
                      <p className="text-sm text-primary-500">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Location (Optional)</label>
              <input
                type="text"
                value={postData.location}
                onChange={(e) => setPostData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Add location..."
                className="w-full border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Product Linking & Scheduling */}
        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Additional Options</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Link Products</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {mockProducts.map((product) => (
                  <label key={product.id} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-primary-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={postData.linkedProducts.find(p => p.id === product.id) !== undefined}
                      onChange={() => toggleProductLink(product)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary-900">{product.name}</p>
                      <p className="text-xs text-primary-500">{product.category}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">Schedule Publishing (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={postData.scheduledDate}
                  onChange={(e) => setPostData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="time"
                  value={postData.scheduledTime}
                  onChange={(e) => setPostData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-primary-600 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-sm text-primary-500">
              {postData.linkedProducts.length > 0 && `${postData.linkedProducts.length} products linked`}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPostData(prev => ({ ...prev, visibility: 'draft' }))}
              className="px-6 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Save Draft
            </button>
            
            {postData.scheduledDate && postData.scheduledTime ? (
              <button
                onClick={handleSchedule}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Post
              </button>
            ) : (
              <button
                onClick={handlePost}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Publish Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostInterface