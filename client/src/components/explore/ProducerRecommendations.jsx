import React, { useState } from 'react';

const ProducerRecommendations = () => {
  const [followedProducers, setFollowedProducers] = useState(new Set());

  const recommendedProducers = [
    {
      id: 'producer1',
      name: "Highland Tea Estate",
      avatar: "🍃",
      location: "Nuwara Eliya",
      verified: true,
      specialties: ["Tea", "Coffee"],
      followers: 1240,
      posts: 89,
      rating: 4.8,
      description: "Premium Ceylon tea direct from high-altitude plantations"
    },
    {
      id: 'producer2',
      name: "Spice Kingdom",
      avatar: "🌶️",
      location: "Matale",
      verified: true,
      specialties: ["Spices", "Herbs"],
      followers: 890,
      posts: 67,
      rating: 4.9,
      description: "Authentic Sri Lankan spices with organic certification"
    },
    {
      id: 'producer3',
      name: "Fresh Valley Farms",
      avatar: "🥬",
      location: "Kandy",
      verified: true,
      specialties: ["Vegetables", "Fruits"],
      followers: 675,
      posts: 134,
      rating: 4.7,
      description: "Farm-fresh organic produce delivered daily"
    },
    {
      id: 'producer4',
      name: "Golden Grain Mills",
      avatar: "🌾",
      location: "Ampara",
      verified: false,
      specialties: ["Rice", "Grains"],
      followers: 456,
      posts: 45,
      rating: 4.6,
      description: "Quality rice and grain processing since 1990"
    },
    {
      id: 'producer5',
      name: "Coastal Coconut Co.",
      avatar: "🥥",
      location: "Colombo",
      verified: true,
      specialties: ["Coconut Products"],
      followers: 234,
      posts: 28,
      rating: 4.5,
      description: "Premium coconut products for export markets"
    }
  ];

  const handleFollow = (producerId) => {
    const newFollowedProducers = new Set(followedProducers);
    if (newFollowedProducers.has(producerId)) {
      newFollowedProducers.delete(producerId);
    } else {
      newFollowedProducers.add(producerId);
    }
    setFollowedProducers(newFollowedProducers);
  };

  return (
    <div className="space-y-6">
      {/* Recommended Producers */}
      <div className="bg-white rounded-lg border border-primary-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Recommended Producers</h3>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recommendedProducers.slice(0, 3).map((producer) => (
            <div key={producer.id} className="border border-primary-100 rounded-lg p-4 hover:bg-primary-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {producer.avatar}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-primary-900 text-sm truncate flex-1">
                      {producer.name}
                    </h4>
                    {producer.verified && (
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-primary-500 mb-2 truncate">📍 {producer.location}</p>
                  <p className="text-xs text-primary-600 mb-3 line-clamp-2 leading-relaxed">{producer.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-primary-500 mb-3">
                    <div className="text-center">
                      <div className="font-medium text-primary-700">{producer.followers}</div>
                      <div>followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-primary-700">{producer.posts}</div>
                      <div>posts</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-primary-700">{producer.rating}</span>
                      </div>
                      <div>rating</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3 max-w-full">
                    {producer.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full whitespace-nowrap">
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleFollow(producer.id)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      followedProducers.has(producer.id)
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    {followedProducers.has(producer.id) ? 'Following ✓' : 'Follow'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="bg-white rounded-lg border border-primary-200 p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Trending Now</h3>
        <div className="space-y-3">
          {[
            { hashtag: '#OrganicVegetables', posts: 45, trend: '+25%' },
            { hashtag: '#CeylonTea', posts: 32, trend: '+18%' },
            { hashtag: '#ExportQuality', posts: 28, trend: '+15%' },
            { hashtag: '#FreshProduce', posts: 24, trend: '+12%' },
          ].map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-primary-50 rounded-lg cursor-pointer transition-colors">
              <div>
                <p className="font-medium text-primary-900 text-sm">{trend.hashtag}</p>
                <p className="text-xs text-primary-500">{trend.posts} posts</p>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {trend.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="bg-white rounded-lg border border-primary-200 p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Who to Follow</h3>
        <div className="space-y-3">
          {recommendedProducers.slice(3, 5).map((producer) => (
            <div key={producer.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-sm">
                  {producer.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="font-medium text-primary-900 text-sm">{producer.name}</p>
                    {producer.verified && (
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-primary-500">{producer.location}</p>
                </div>
              </div>
              <button
                onClick={() => handleFollow(producer.id)}
                className={`py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
                  followedProducers.has(producer.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {followedProducers.has(producer.id) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProducerRecommendations;
