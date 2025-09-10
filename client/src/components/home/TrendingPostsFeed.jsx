import React from 'react';

const TrendingPostsFeed = () => {
  // Mock data for trending posts
  const trendingPosts = [
    {
      id: 1,
      producer: {
        name: "Green Valley Farm",
        avatar: "🌱",
        verified: true,
        location: "Kandy"
      },
      content: "Fresh organic vegetables harvested this morning! 🥕🥬 Perfect for your store's premium section.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      likes: 45,
      comments: 12,
      shares: 8,
      timeAgo: "2h",
      category: "Vegetables",
      trending: true
    },
    {
      id: 2,
      producer: {
        name: "Spice Gardens",
        avatar: "🌶️",
        verified: true,
        location: "Matale"
      },
      content: "Premium Ceylon cinnamon sticks ready for wholesale! Export quality at local prices. 🎯",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
      likes: 89,
      comments: 23,
      shares: 15,
      timeAgo: "4h",
      category: "Spices",
      trending: true
    },
    {
      id: 3,
      producer: {
        name: "Sunset Dairy",
        avatar: "🥛",
        verified: false,
        location: "Galle"
      },
      content: "Fresh milk and dairy products delivered daily. Now accepting new retail partners! 🚛",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
      likes: 67,
      comments: 18,
      shares: 11,
      timeAgo: "6h",
      category: "Dairy",
      trending: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Trending Posts
          </h2>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {trendingPosts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                      {post.producer.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-primary-800">{post.producer.name}</h3>
                        {post.producer.verified && (
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">📍 {post.producer.location} • {post.timeAgo}</p>
                    </div>
                  </div>
                  {post.trending && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                      🔥 Trending
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-primary-700 mb-4">{post.content}</p>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDIwMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxODAiIHk9IjEzMCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0ibTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBhMTAgMTAgMCAwIDAtMTAtMTB6bTAgMThhOCA4IDAgMSAxIDgtOGE4IDggMCAwIDEtOCA4eiIgZmlsbD0iI0Y5RkFGQiIvPgo8cGF0aCBkPSJtMTIgMTNhMSAxIDAgMCAwIDEtMWEyIDIgMCAwIDAtMi0yaC0yYTEgMSAwIDAgMCAwIDJoMmExIDEgMCAwIDEgMSAxeiIgZmlsbD0iI0Y5RkFGQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjkiIHI9IjEiIGZpbGw9IiNGOUZBRkIiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                    Contact Producer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            View More Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingPostsFeed;
