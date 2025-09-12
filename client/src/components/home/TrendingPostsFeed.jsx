import React, { useState } from 'react';
import PostCard from '../ui/PostCard';

const TrendingPostsFeed = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

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

  const handleContactProducer = (producer) => {
    console.log('Contacting producer:', producer.name);
    // Implement contact producer logic here
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xlxxx mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Trending Posts
          </h2>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {trendingPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onSave={handleSave}
              onContactProducer={handleContactProducer}
              isLiked={likedPosts.has(post.id)}
              isSaved={savedPosts.has(post.id)}
              showTrendingBadge={true}
              showCategory={true}
              showContactButton={true}
            />
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
