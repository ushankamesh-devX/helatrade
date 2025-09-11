import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import Footer from '../components/ui/Footer';
import TrendingPosts from '../components/explore/TrendingPosts';
import CategoryTabs from '../components/explore/CategoryTabs';
import ProducerRecommendations from '../components/explore/ProducerRecommendations';
import SearchFilters from '../components/explore/SearchFilters';

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    sortBy: 'popularity',
    dateRange: 'all'
  });

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      producer: {
        name: "Green Valley Farm",
        avatar: "🌱",
        verified: true,
        location: "Kandy",
        id: 'producer1'
      },
      content: "Fresh organic vegetables harvested this morning! 🥕🥬 Perfect for your store's premium section. Export quality guaranteed.",
      images: [
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop"
      ],
      likes: 245,
      comments: 52,
      shares: 28,
      timeAgo: "2h",
      category: "Vegetables",
      trending: true,
      popularity: 95
    },
    {
      id: 2,
      producer: {
        name: "Spice Gardens Ceylon",
        avatar: "🌶️",
        verified: true,
        location: "Matale",
        id: 'producer2'
      },
      content: "Premium Ceylon cinnamon sticks ready for wholesale! Export quality at competitive prices. 🎯 ISO certified facility.",
      images: [
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop"
      ],
      likes: 189,
      comments: 43,
      shares: 35,
      timeAgo: "4h",
      category: "Spices",
      trending: true,
      popularity: 88
    },
    {
      id: 3,
      producer: {
        name: "Mountain Tea Estate",
        avatar: "🍃",
        verified: true,
        location: "Nuwara Eliya",
        id: 'producer3'
      },
      content: "High-grown Ceylon tea from 1500m elevation. Perfect for premium tea blends. Direct from estate to your warehouse! ☕",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=600&fit=crop"
      ],
      likes: 156,
      comments: 29,
      shares: 22,
      timeAgo: "6h",
      category: "Tea & Coffee",
      trending: false,
      popularity: 75
    },
    {
      id: 4,
      producer: {
        name: "Coastal Coconut Co.",
        avatar: "🥥",
        verified: false,
        location: "Colombo",
        id: 'producer4'
      },
      content: "Fresh coconut products including virgin coconut oil, desiccated coconut, and coconut milk powder. Bulk orders welcome! 🌴",
      images: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
      ],
      likes: 134,
      comments: 31,
      shares: 18,
      timeAgo: "8h",
      category: "Coconut Products",
      trending: false,
      popularity: 68
    },
    {
      id: 5,
      producer: {
        name: "Golden Rice Mills",
        avatar: "🌾",
        verified: true,
        location: "Ampara",
        id: 'producer5'
      },
      content: "Premium white and red rice varieties. Freshly milled and cleaned. Available in 25kg and 50kg bags. Quality guaranteed! 🍚",
      images: [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop"
      ],
      likes: 98,
      comments: 24,
      shares: 15,
      timeAgo: "10h",
      category: "Grains & Rice",
      trending: true,
      popularity: 82
    },
    {
      id: 6,
      producer: {
        name: "Ocean Fresh Seafood",
        avatar: "🐟",
        verified: true,
        location: "Negombo",
        id: 'producer6'
      },
      content: "Daily fresh catch! Premium quality fish and seafood. Flash frozen for export. HACCP certified processing facility. 🎣",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
      ],
      likes: 167,
      comments: 38,
      shares: 25,
      timeAgo: "12h",
      category: "Seafood",
      trending: false,
      popularity: 71
    }
  ];

  const [allPosts, setAllPosts] = useState(mockPosts);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 3;

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
    setPage(1);
    setDisplayedPosts([]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setDisplayedPosts([]);
  };

  // Filter and sort posts based on current filters
  const getFilteredPosts = () => {
    let filtered = [...allPosts];

    // Filter by category
    if (filters.category !== 'All') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(post => 
        post.producer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sort posts
    switch (filters.sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'comments':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }

    return filtered;
  };

  // Load more posts (infinite scroll simulation)
  const loadMorePosts = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredPosts = getFilteredPosts();
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = filteredPosts.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }

      if (endIndex >= filteredPosts.length) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
  };

  // Reset and load initial posts when filters change
  useEffect(() => {
    const filteredPosts = getFilteredPosts();
    const initialPosts = filteredPosts.slice(0, postsPerPage);
    setDisplayedPosts(initialPosts);
    setHasMore(filteredPosts.length > postsPerPage);
    setPage(2);
  }, [filters]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar - Fixed position */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      </div>

      {/* Right Main Content with left margin for fixed sidebar */}
      <div className="min-h-screen flex flex-col lg:ml-80">
        {/* Header */}
        <Header 
          onSidebarToggle={handleSidebarToggle} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Explore Header */}
          {/* <div className="bg-white border-b border-primary-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-primary-900">Explore & Discover</h1>
                  <p className="text-primary-600 mt-2">Find trending products, producers, and opportunities</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-primary-500">
                    {getFilteredPosts().length} posts available
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          {/* Search and Filters */}
          <SearchFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange}
          />

          {/* Category Tabs */}
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* Left Column - Producer Recommendations (Hidden on smaller screens) */}
              <div className="hidden xl:block">
                <ProducerRecommendations />
              </div>

              {/* Center Column - Main Feed */}
              <div className="xl:col-span-2">
                <TrendingPosts 
                  posts={displayedPosts}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={loadMorePosts}
                />
              </div>

              {/* Right Column - Additional Info */}
              <div className="hidden xl:block">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Trending Categories */}
                  <div className="bg-white rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Trending Categories</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Vegetables', trend: '+15%', icon: '🥬' },
                        { name: 'Spices', trend: '+12%', icon: '🌶️' },
                        { name: 'Tea & Coffee', trend: '+8%', icon: '🍃' },
                        { name: 'Grains & Rice', trend: '+6%', icon: '🌾' }
                      ].map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{category.icon}</span>
                            <span className="text-sm text-primary-700">{category.name}</span>
                          </div>
                          <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                            {category.trend}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Today's Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">New Posts</span>
                        <span className="text-lg font-bold text-orange-600">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Active Producers</span>
                        <span className="text-lg font-bold text-blue-600">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Total Interactions</span>
                        <span className="text-lg font-bold text-green-600">2.3k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Producer Recommendations */}
          <div className="xl:hidden">
            <ProducerRecommendations />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Explore;
