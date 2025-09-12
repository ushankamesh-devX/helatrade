import React, { useState } from 'react'

const ActivityCenter = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock data for notifications and activities
  const activities = [
    {
      id: 1,
      type: 'new_post',
      producer: 'Highland Tea Estate',
      producerAvatar: 'HT',
      title: 'New post from Highland Tea Estate',
      description: 'Fresh Ceylon black tea harvest just completed!',
      timestamp: '2 hours ago',
      read: false,
      image: '/api/placeholder/60/60'
    },
    {
      id: 2,
      type: 'product_update',
      producer: 'Organic Valley Farms',
      producerAvatar: 'OV',
      title: 'Product back in stock',
      description: 'Organic Tomatoes are now available',
      timestamp: '3 hours ago',
      read: false,
      productName: 'Organic Tomatoes',
      price: '$4.50/kg'
    },
    {
      id: 3,
      type: 'connection_update',
      producer: 'Spice Garden Lanka',
      producerAvatar: 'SG',
      title: 'New product added',
      description: 'Premium cinnamon bark now available',
      timestamp: '5 hours ago',
      read: true,
      productName: 'Premium Cinnamon Bark',
      price: '$18.99/kg'
    },
    {
      id: 4,
      type: 'like_received',
      producer: 'Fresh Fruit Co-op',
      producerAvatar: 'FF',
      title: 'Liked your comment',
      description: 'on their post about seasonal mangoes',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 5,
      type: 'new_connection',
      producer: 'Rice Valley Co-op',
      producerAvatar: 'RV',
      title: 'New connection established',
      description: 'You are now connected with Rice Valley Co-op',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'comment_received',
      producer: 'Coconut Paradise',
      producerAvatar: 'CP',
      title: 'Replied to your comment',
      description: 'Thanks for your interest in our virgin coconut oil!',
      timestamp: '2 days ago',
      read: true
    }
  ]

  // Mock data for your interactions
  const yourInteractions = [
    {
      id: 1,
      type: 'like_given',
      producer: 'Highland Tea Estate',
      action: 'Liked post',
      content: 'Fresh Ceylon black tea harvest just completed!',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'comment_given',
      producer: 'Organic Valley Farms',
      action: 'Commented on',
      content: 'Introducing our new organic vegetable subscription box!',
      comment: 'This looks amazing! How do I sign up for the subscription?',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'connection_made',
      producer: 'Fresh Fruit Co-op',
      action: 'Connected with',
      content: 'New producer connection established',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      type: 'product_saved',
      producer: 'Spice Garden Lanka',
      action: 'Saved product',
      content: 'Premium Cinnamon Bark',
      timestamp: '2 days ago'
    }
  ]

  // Mock data for connection activity
  const connectionActivity = [
    {
      id: 1,
      type: 'new_producer',
      producer: 'Heritage Grains',
      description: 'Joined HelaTrade and is now available for connections',
      timestamp: '3 hours ago',
      category: 'Ancient Grains'
    },
    {
      id: 2,
      type: 'producer_update',
      producer: 'Seafood Direct',
      description: 'Updated their profile with new certifications',
      timestamp: '6 hours ago',
      category: 'Fresh Seafood'
    },
    {
      id: 3,
      type: 'bulk_products',
      producer: 'Highland Tea Estate',
      description: 'Added 5 new tea varieties to their catalog',
      timestamp: '1 day ago',
      category: 'Tea & Spices'
    }
  ]

  const filterOptions = [
    { id: 'all', label: 'All Activity', count: activities.length },
    { id: 'unread', label: 'Unread', count: activities.filter(a => !a.read).length },
    { id: 'posts', label: 'New Posts', count: activities.filter(a => a.type === 'new_post').length },
    { id: 'products', label: 'Product Updates', count: activities.filter(a => a.type === 'product_update' || a.type === 'connection_update').length },
    { id: 'connections', label: 'Connections', count: activities.filter(a => a.type === 'new_connection').length },
    { id: 'interactions', label: 'Interactions', count: activities.filter(a => a.type === 'like_received' || a.type === 'comment_received').length }
  ]

  const getFilteredActivities = () => {
    switch (activeFilter) {
      case 'unread':
        return activities.filter(a => !a.read)
      case 'posts':
        return activities.filter(a => a.type === 'new_post')
      case 'products':
        return activities.filter(a => a.type === 'product_update' || a.type === 'connection_update')
      case 'connections':
        return activities.filter(a => a.type === 'new_connection')
      case 'interactions':
        return activities.filter(a => a.type === 'like_received' || a.type === 'comment_received')
      default:
        return activities
    }
  }

  const getActivityIcon = (type) => {
    const icons = {
      new_post: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
        </svg>
      ),
      product_update: (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
        </svg>
      ),
      connection_update: (
        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
        </svg>
      ),
      like_received: (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      comment_received: (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      ),
      new_connection: (
        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )
    }
    return icons[type] || icons.new_post
  }

  const ActivityItem = ({ activity }) => (
    <div className={`p-4 border-l-4 ${activity.read ? 'border-primary-200 bg-white' : 'border-orange-500 bg-orange-50'} rounded-r-lg mb-4`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${activity.read ? 'text-primary-900' : 'text-primary-900'}`}>
              {activity.title}
            </p>
            <span className="text-xs text-primary-500">{activity.timestamp}</span>
          </div>
          <p className="text-sm text-primary-600 mt-1">{activity.description}</p>
          
          {activity.productName && (
            <div className="mt-2 p-2 bg-primary-50 rounded-md">
              <p className="text-sm font-medium text-primary-900">{activity.productName}</p>
              {activity.price && <p className="text-sm text-orange-600 font-semibold">{activity.price}</p>}
            </div>
          )}

          <div className="flex items-center mt-3 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">{activity.producerAvatar}</span>
              </div>
              <span className="text-xs font-medium text-primary-700">{activity.producer}</span>
            </div>
            <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
              View Details
            </button>
          </div>
        </div>
        
        {!activity.read && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Total Notifications</p>
              <p className="text-2xl font-bold text-primary-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Unread</p>
              <p className="text-2xl font-bold text-orange-600">{activities.filter(a => !a.read).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">New Connections</p>
              <p className="text-2xl font-bold text-green-600">{activities.filter(a => a.type === 'new_connection').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Your Interactions</p>
              <p className="text-2xl font-bold text-purple-600">{yourInteractions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter.id
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-primary-50 text-primary-600 hover:bg-orange-50 hover:text-orange-600 border border-primary-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notification Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-primary-200">
            <div className="p-6 border-b border-primary-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-900">Activity Feed</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  Mark all as read
                </button>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
              {getFilteredActivities().map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
              
              {getFilteredActivities().length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="text-lg font-medium text-primary-900 mb-2">No activities found</h3>
                  <p className="text-primary-500">Try adjusting your filter selection</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Interactions */}
          <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Your Recent Interactions</h3>
            <div className="space-y-4">
              {yourInteractions.slice(0, 4).map(interaction => (
                <div key={interaction.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-primary-900">
                      <span className="font-medium">{interaction.action}</span> {interaction.producer}
                    </p>
                    <p className="text-xs text-primary-500 mt-1">{interaction.timestamp}</p>
                    {interaction.comment && (
                      <p className="text-xs text-primary-600 mt-1 italic">"{interaction.comment}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All Interactions
            </button>
          </div>

          {/* Connection Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Connection Activity</h3>
            <div className="space-y-4">
              {connectionActivity.map(activity => (
                <div key={activity.id} className="border-l-4 border-blue-200 pl-4 py-2">
                  <p className="text-sm font-medium text-primary-900">{activity.producer}</p>
                  <p className="text-xs text-primary-600 mt-1">{activity.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {activity.category}
                    </span>
                    <span className="text-xs text-primary-500">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Find New Producers
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Notification Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCenter