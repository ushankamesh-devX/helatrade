import React from 'react';

const RecentActivity = () => {
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'new_post',
      user: {
        name: 'Green Valley Farm',
        avatar: '🌱',
        type: 'producer'
      },
      action: 'posted new products',
      content: 'Fresh organic tomatoes and bell peppers now available',
      timestamp: '5 minutes ago',
      engagement: { likes: 12, comments: 3 }
    },
    {
      id: 2,
      type: 'new_producer',
      user: {
        name: 'Sunshine Dairy',
        avatar: '🥛',
        type: 'producer'
      },
      action: 'joined the platform',
      content: 'Specializing in fresh milk and artisanal cheese products',
      timestamp: '15 minutes ago',
      engagement: { likes: 28, comments: 8 }
    },
    {
      id: 3,
      type: 'order_completed',
      user: {
        name: 'Metro Supermarket',
        avatar: '🏪',
        type: 'store'
      },
      action: 'completed large order',
      content: 'Successfully received 200kg of premium rice from Paddy Fields Co.',
      timestamp: '32 minutes ago',
      engagement: { likes: 15, comments: 5 }
    },
    {
      id: 4,
      type: 'partnership',
      user: {
        name: 'Spice Gardens',
        avatar: '🌶️',
        type: 'producer'
      },
      action: 'formed new partnership',
      content: 'Partnered with 5 new stores for exclusive spice distribution',
      timestamp: '1 hour ago',
      engagement: { likes: 34, comments: 12 }
    },
    {
      id: 5,
      type: 'achievement',
      user: {
        name: 'Coastal Seafood',
        avatar: '🐟',
        type: 'producer'
      },
      action: 'reached milestone',
      content: 'Completed 500 successful deliveries with 4.9⭐ rating',
      timestamp: '2 hours ago',
      engagement: { likes: 89, comments: 23 }
    },
    {
      id: 6,
      type: 'new_store',
      user: {
        name: 'Fresh Mart Express',
        avatar: '🛒',
        type: 'store'
      },
      action: 'joined as retail partner',
      content: 'Looking for organic produce and dairy suppliers in Colombo area',
      timestamp: '3 hours ago',
      engagement: { likes: 19, comments: 7 }
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      new_post: '📝',
      new_producer: '🌟',
      order_completed: '✅',
      partnership: '🤝',
      achievement: '🏆',
      new_store: '🏪'
    };
    return icons[type] || '📢';
  };

  const getActivityColor = (type) => {
    const colors = {
      new_post: 'border-blue-200 bg-blue-50',
      new_producer: 'border-green-200 bg-green-50',
      order_completed: 'border-emerald-200 bg-emerald-50',
      partnership: 'border-purple-200 bg-purple-50',
      achievement: 'border-yellow-200 bg-yellow-50',
      new_store: 'border-orange-200 bg-orange-50'
    };
    return colors[type] || 'border-gray-200 bg-gray-50';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Recent Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-primary-800 flex items-center">
                  <span className="mr-2">📊</span>
                  Live Activity Feed
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Activity Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 ${getActivityColor(activity.type)} flex items-center justify-center`}>
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{activity.user.avatar}</span>
                          <span className="font-semibold text-primary-800">{activity.user.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.user.type === 'producer' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {activity.user.type}
                          </span>
                          <span className="text-gray-500 text-sm">{activity.action}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-2">{activity.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              <span>{activity.engagement.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                              <span>{activity.engagement.comments}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 text-center">
                <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* Quick Stats Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
                <span className="mr-2">📈</span>
                Today's Highlights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Posts</span>
                  <span className="font-semibold text-green-600">+23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Producers</span>
                  <span className="font-semibold text-blue-600">+5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders Completed</span>
                  <span className="font-semibold text-purple-600">+47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Partnerships</span>
                  <span className="font-semibold text-orange-600">+8</span>
                </div>
              </div>
            </div>

            {/* Trending Topics Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
                <span className="mr-2">🔥</span>
                Trending Topics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#OrganicVegetables</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Hot</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#CeylonSpices</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Trending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#FreshSeafood</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Rising</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#LocalFarming</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Popular</span>
                </div>
              </div>
            </div>

            {/* Community News Widget */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">📰</span>
                Community News
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-primary-100">
                  🎉 HelaTrade reached 1000+ active producers milestone this month!
                </p>
                <p className="text-primary-100">
                  🚀 New mobile app launching next quarter with enhanced features.
                </p>
                <p className="text-primary-100">
                  🏆 Producer awards ceremony scheduled for December 2025.
                </p>
              </div>
              <button className="mt-4 bg-white text-primary-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
