import React, { useState } from 'react';

const CommentsModal = ({ isOpen, onClose, post }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "👩‍🌾",
        verified: true,
        role: "Buyer"
      },
      content: "Great quality vegetables! I've been ordering from this producer for months. Highly recommended! 🌱",
      timeAgo: "2h",
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Rajesh Kumar",
        avatar: "👨‍💼",
        verified: false,
        role: "Retailer"
      },
      content: "What are your bulk pricing options? Looking to place a large order for my store chain.",
      timeAgo: "4h",
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "Maria Santos",
        avatar: "👩‍💻",
        verified: true,
        role: "Export Manager"
      },
      content: "Do you have organic certification? We need certified organic produce for our European clients.",
      timeAgo: "6h",
      likes: 15,
      isLiked: false
    },
    {
      id: 4,
      user: {
        name: "David Chen",
        avatar: "👨‍🍳",
        verified: false,
        role: "Restaurant Owner"
      },
      content: "Perfect timing! Just what I needed for my restaurant. Can you deliver tomorrow?",
      timeAgo: "8h",
      likes: 6,
      isLiked: false
    },
    {
      id: 5,
      user: {
        name: "Priya Patel",
        avatar: "👩‍🔬",
        verified: true,
        role: "Quality Inspector"
      },
      content: "The quality looks excellent in the photos. What's your quality assurance process?",
      timeAgo: "10h",
      likes: 9,
      isLiked: false
    }
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          name: "John Doe",
          avatar: "👨‍💼",
          verified: true,
          role: "You"
        },
        content: newComment,
        timeAgo: "now",
        likes: 0,
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-semibold text-primary-900">Comments</h3>
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {comments.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-primary-100 bg-primary-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-sm">
              {post.producer.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-primary-800">{post.producer.name}</h4>
                {post.producer.verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-primary-500">{post.producer.location} • {post.timeAgo || post.timestamp}</p>
            </div>
          </div>
          <p className="text-sm text-primary-700 line-clamp-2">{post.content}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {comment.user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold text-primary-900 text-sm">{comment.user.name}</h5>
                      {comment.user.verified && (
                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-xs text-primary-500">{comment.user.role}</span>
                    </div>
                    <p className="text-sm text-primary-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center space-x-1 text-xs transition-colors ${
                        comment.isLiked ? 'text-red-500' : 'text-primary-500 hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    <span className="text-xs text-primary-500">{comment.timeAgo}</span>
                    <button className="text-xs text-primary-500 hover:text-orange-600 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-primary-200">
          <form onSubmit={handleCommentSubmit} className="flex space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              JD
            </div>
            <div className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 border border-primary-300 rounded-lg bg-white text-primary-900 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;