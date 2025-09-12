import React, { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'

const ContentManagement = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedPosts, setSelectedPosts] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Mock posts data
  const posts = [
    {
      id: 1,
      title: 'Fresh Organic Vegetables Harvest',
      content: 'Today we harvested our premium organic vegetables including tomatoes, carrots, and leafy greens.',
      category: 'Vegetables',
      visibility: 'public',
      status: 'published',
      createdAt: '2024-01-15',
      engagement: { views: 1250, likes: 89, comments: 23, shares: 12 },
      media: ['/api/placeholder/200/150'],
      tags: ['organic', 'vegetables', 'harvest']
    },
    {
      id: 2,
      title: 'Ceylon Cinnamon Processing',
      content: 'Behind the scenes of our premium Ceylon cinnamon processing facility.',
      category: 'Spices',
      visibility: 'public',
      status: 'published',
      createdAt: '2024-01-12',
      engagement: { views: 2100, likes: 156, comments: 34, shares: 28 },
      media: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
      tags: ['cinnamon', 'processing', 'ceylon']
    },
    {
      id: 3,
      title: 'Tea Estate Morning Views',
      content: 'The beautiful morning mist over our tea estate in the hill country.',
      category: 'Tea',
      visibility: 'connections',
      status: 'published',
      createdAt: '2024-01-10',
      engagement: { views: 890, likes: 67, comments: 15, shares: 8 },
      media: ['/api/placeholder/200/150'],
      tags: ['tea', 'hillcountry', 'morning']
    },
    {
      id: 4,
      title: 'Upcoming Fruit Harvest',
      content: 'Our mango trees are ready for harvest next week. Premium quality fruits coming soon!',
      category: 'Fruits',
      visibility: 'public',
      status: 'draft',
      createdAt: '2024-01-08',
      engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
      media: [],
      tags: ['mango', 'fruits', 'harvest']
    },
    {
      id: 5,
      title: 'Coconut Oil Production',
      content: 'Traditional method of extracting pure coconut oil from fresh coconuts.',
      category: 'Coconut Products',
      visibility: 'public',
      status: 'archived',
      createdAt: '2024-01-05',
      engagement: { views: 3200, likes: 234, comments: 56, shares: 45 },
      media: ['/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150'],
      tags: ['coconut', 'oil', 'traditional']
    }
  ]

  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'archived', label: 'Archived' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most_engaged', label: 'Most Engaged' },
    { value: 'least_engaged', label: 'Least Engaged' }
  ]

  // Get categories from API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  
  // Transform categories for filtering (add "All Categories" option)
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      // Fallback categories while loading or if API fails
      return ['All Categories', 'Vegetables', 'Spices', 'Tea', 'Fruits', 'Coconut Products']
    }
    
    const categoryNames = ['All Categories', ...apiCategories.map(cat => cat.name)]
    return categoryNames
  }, [apiCategories, categoriesLoading])

  const filteredPosts = posts.filter(post => {
    if (filterBy === 'all') return true
    return post.status === filterBy
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'most_engaged':
        return (b.engagement.views + b.engagement.likes) - (a.engagement.views + a.engagement.likes)
      case 'least_engaged':
        return (a.engagement.views + a.engagement.likes) - (b.engagement.views + b.engagement.likes)
      default:
        return 0
    }
  })

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === sortedPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(sortedPosts.map(post => post.id))
    }
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on posts:`, selectedPosts)
    setSelectedPosts([])
    setShowBulkActions(false)
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getVisibilityIcon = (visibility) => {
    if (visibility === 'public') {
      return (
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Content Management</h2>
            <p className="text-primary-600">Manage all your posts and content</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-primary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary-900 shadow-sm' 
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary-900 shadow-sm' 
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Create New Post Button */}
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Create New Post
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-6 pt-6 border-t border-primary-100">
          <div className="flex items-center space-x-4 flex-1">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-primary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedPosts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-primary-600">{selectedPosts.length} selected</span>
              <div className="relative">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="bg-primary-100 text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Bulk Actions
                </button>
                {showBulkActions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-primary-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleBulkAction('publish')}
                      className="w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                    >
                      Publish Selected
                    </button>
                    <button
                      onClick={() => handleBulkAction('draft')}
                      className="w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                    >
                      Move to Draft
                    </button>
                    <button
                      onClick={() => handleBulkAction('archive')}
                      className="w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                    >
                      Archive Selected
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="w-full text-left px-4 py-2 hover:bg-error-50 text-error-600 transition-colors"
                    >
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid/List */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-200">
        {/* Select All Header */}
        <div className="p-4 border-b border-primary-100">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedPosts.length === sortedPosts.length && sortedPosts.length > 0}
              onChange={handleSelectAll}
              className="text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-primary-700">
              Select All ({sortedPosts.length} posts)
            </span>
          </label>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map(post => (
              <div key={post.id} className="border border-primary-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="p-4 border-b border-primary-100">
                  <div className="flex items-start justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </label>
                    <div className="flex items-center space-x-2">
                      {getVisibilityIcon(post.visibility)}
                      {getStatusBadge(post.status)}
                    </div>
                  </div>
                </div>

                {/* Post Media */}
                {post.media.length > 0 && (
                  <div className="aspect-video bg-primary-100">
                    <img 
                      src={post.media[0]} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {post.media.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        +{post.media.length - 1}
                      </div>
                    )}
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-primary-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-primary-600 line-clamp-3 mb-3">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-xs text-primary-500 mb-3">
                    <span>{post.engagement.views} views</span>
                    <span>{post.engagement.likes} likes</span>
                    <span>{post.engagement.comments} comments</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
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
            {sortedPosts.map(post => (
              <div key={post.id} className="p-6 hover:bg-primary-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <label className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                  </label>
                  
                  {post.media.length > 0 && (
                    <div className="w-20 h-20 bg-primary-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={post.media[0]} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-primary-900">{post.title}</h3>
                          {getVisibilityIcon(post.visibility)}
                          {getStatusBadge(post.status)}
                        </div>
                        <p className="text-sm text-primary-600 mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-primary-500">
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span>{post.engagement.views} views</span>
                          <span>{post.engagement.likes} likes</span>
                          <span>{post.engagement.comments} comments</span>
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
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
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
    </div>
  )
}

export default ContentManagement