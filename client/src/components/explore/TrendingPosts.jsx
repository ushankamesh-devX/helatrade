import React, { useState } from 'react';
import CommentsModal from './CommentsModal';

const TrendingPosts = ({ posts, loading, hasMore, onLoadMore }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [commentsModal, setCommentsModal] = useState({ isOpen: false, post: null });

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleSave = (postId) => {
    const newSavedPosts = new Set(savedPosts);
    if (newSavedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
  };

  const handleCommentsOpen = (post) => {
    setCommentsModal({ isOpen: true, post });
  };

  const handleCommentsClose = () => {
    setCommentsModal({ isOpen: false, post: null });
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDIwMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxODAiIHk9IjEzMCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0ibTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBhMTAgMTAgMCAwIDAtMTAtMTB6bTAgMThhOCA4IDAgMSAxIDgtOGE4IDggMCAwIDEtOCA4eiIgZmlsbD0iI0Y5RkFGQiIvPgo8cGF0aCBkPSJtMTIgMTNhMSAxIDAgMCAwIDEtMWEyIDIgMCAwIDAtMi0yaC0yYTEgMSAwIDAgMCAwIDJoMmExIDEgMCAwIDEgMSAxeiIgZmlsbD0iI0Y5RkFGQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjkiIHI9IjEiIGZpbGw9IiNGOUZBRkIiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K';
  };

  if (posts.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-primary-900 mb-2">No posts found</h3>
        <p className="text-primary-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-primary-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Post Header */}
          <div className="p-4 border-b border-primary-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                  {post.producer.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-primary-800 hover:text-orange-600 cursor-pointer">
                      {post.producer.name}
                    </h3>
                    {post.producer.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-primary-500">
                    <span>📍 {post.producer.location}</span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {post.trending && (
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                    🔥 Trending
                  </span>
                )}
                <button 
                  onClick={() => handleSave(post.id)}
                  className={`p-2 rounded-full transition-colors ${
                    savedPosts.has(post.id) 
                      ? 'text-yellow-600 bg-yellow-100' 
                      : 'text-primary-400 hover:text-yellow-600 hover:bg-yellow-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill={savedPosts.has(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-primary-700 mb-4 leading-relaxed">{post.content}</p>
            
            {/* Images Grid */}
            {post.images && post.images.length > 0 && (
              <div className={`mb-4 ${post.images.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                {post.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-primary-200 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Post content ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-4 text-sm text-primary-500">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Popularity: {post.popularity}%</span>
                </span>
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-primary-100 bg-primary-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    likedPosts.has(post.id) 
                      ? 'text-red-500' 
                      : 'text-primary-600 hover:text-red-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </button>
                
                <button 
                  onClick={() => handleCommentsOpen(post)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
              
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors">
                Contact Producer
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-primary-600">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading more posts...</span>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && (
        <div className="text-center py-6">
          <button 
            onClick={onLoadMore}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Load More Posts
          </button>
        </div>
      )}

      {/* End of Posts */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-primary-600">You've reached the end of the feed</p>
          <p className="text-sm text-primary-500 mt-1">Check back later for new posts!</p>
        </div>
      )}
      
      {/* Comments Modal */}
      <CommentsModal
        isOpen={commentsModal.isOpen}
        onClose={handleCommentsClose}
        post={commentsModal.post}
      />
    </div>
  );
};

export default TrendingPosts;
