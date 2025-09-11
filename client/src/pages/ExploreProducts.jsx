import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import ProductCard from '../components/ui/ProductCard';
import CategoryTabs from '../components/explore/CategoryTabs';
import ProductSearchFilters from '../components/explore/ProductSearchFilters';

const ExploreProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    sortBy: 'popularity',
    priceRange: 'all',
    inStockOnly: false,
    organicOnly: false,
    featuredOnly: false,
    verifiedOnly: false,
    exportQuality: false
  });

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Premium Ceylon Cinnamon Sticks",
      description: "Authentic Ceylon cinnamon with sweet, delicate flavor. Perfect for premium spice blends and gourmet cooking.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
      price: "Rs. 2,500/kg",
      rating: 4.8,
      category: "Spices",
      inStock: true,
      isOrganic: true,
      isFeatured: true,
      minOrder: "50kg",
      producer: {
        name: "Spice Gardens Ceylon",
        location: "Matale",
        verified: true
      }
    },
    {
      id: 2,
      name: "Fresh Organic Vegetables Bundle",
      description: "Daily harvest of mixed organic vegetables including carrots, beans, cabbage, and leafy greens.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
      price: "Rs. 180/kg",
      rating: 4.6,
      category: "Vegetables",
      inStock: true,
      isOrganic: true,
      isFeatured: false,
      minOrder: "100kg",
      producer: {
        name: "Green Valley Farm",
        location: "Kandy",
        verified: true
      }
    },
    {
      id: 3,
      name: "High-Grown Ceylon Black Tea",
      description: "Premium black tea from estates above 1200m elevation. Rich flavor with natural antioxidants.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      price: "Rs. 1,800/kg",
      rating: 4.9,
      category: "Tea & Coffee",
      inStock: true,
      isOrganic: false,
      isFeatured: true,
      minOrder: "25kg",
      producer: {
        name: "Mountain Tea Estate",
        location: "Nuwara Eliya",
        verified: true
      }
    },
    {
      id: 4,
      name: "Virgin Coconut Oil - Cold Pressed",
      description: "Pure virgin coconut oil extracted using traditional cold-press methods. Perfect for cooking and cosmetics.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      price: "Rs. 850/L",
      rating: 4.7,
      category: "Coconut Products",
      inStock: true,
      isOrganic: true,
      isFeatured: false,
      minOrder: "20L",
      producer: {
        name: "Coastal Coconut Co.",
        location: "Colombo",
        verified: false
      }
    },
    {
      id: 5,
      name: "Premium Basmati Rice",
      description: "Long grain basmati rice with aromatic fragrance. Aged for 12 months for superior quality.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
      price: "Rs. 320/kg",
      rating: 4.5,
      category: "Grains & Rice",
      inStock: true,
      isOrganic: false,
      isFeatured: true,
      minOrder: "500kg",
      producer: {
        name: "Golden Rice Mills",
        location: "Ampara",
        verified: true
      }
    },
    {
      id: 6,
      name: "Fresh Tuna Fillets",
      description: "Premium quality yellowfin tuna fillets. Flash frozen immediately after catch for maximum freshness.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      price: "Rs. 1,200/kg",
      rating: 4.4,
      category: "Seafood",
      inStock: false,
      isOrganic: false,
      isFeatured: false,
      minOrder: "50kg",
      producer: {
        name: "Ocean Fresh Seafood",
        location: "Negombo",
        verified: true
      }
    },
    {
      id: 7,
      name: "King Coconut Water - Natural",
      description: "Fresh king coconut water packed naturally. Rich in electrolytes and perfect for health-conscious consumers.",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&h=600&fit=crop",
      price: "Rs. 150/bottle",
      rating: 4.6,
      category: "Coconut Products",
      inStock: true,
      isOrganic: true,
      isFeatured: false,
      minOrder: "100 bottles",
      producer: {
        name: "Tropical Beverages",
        location: "Galle",
        verified: true
      }
    },
    {
      id: 8,
      name: "Organic Cashew Nuts",
      description: "Grade A cashew nuts from organic plantations. Perfect size and natural taste without preservatives.",
      image: "https://images.unsplash.com/photo-1585455788095-54e4c86f7f45?w=800&h=600&fit=crop",
      price: "Rs. 2,200/kg",
      rating: 4.8,
      category: "Fruits",
      inStock: true,
      isOrganic: true,
      isFeatured: true,
      minOrder: "25kg",
      producer: {
        name: "Nutty Plantations",
        location: "Puttalam",
        verified: true
      }
    },
    {
      id: 9,
      name: "Ceylon Pepper - Black Whole",
      description: "Authentic Ceylon black pepper with intense aroma and heat. Hand-picked and sun-dried for premium quality.",
      image: "https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=800&h=600&fit=crop",
      price: "Rs. 3,500/kg",
      rating: 4.9,
      category: "Spices",
      inStock: true,
      isOrganic: true,
      isFeatured: true,
      minOrder: "10kg",
      producer: {
        name: "Highland Spice Co.",
        location: "Kandy",
        verified: true
      }
    },
    {
      id: 10,
      name: "Fresh Mango Pulp",
      description: "Sweet mango pulp from tree-ripened mangoes. Perfect for juices, desserts, and ice cream manufacturing.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=600&fit=crop",
      price: "Rs. 400/kg",
      rating: 4.5,
      category: "Fruits",
      inStock: true,
      isOrganic: false,
      isFeatured: false,
      minOrder: "200kg",
      producer: {
        name: "Tropical Fruit Processors",
        location: "Anuradhapura",
        verified: true
      }
    },
    {
      id: 11,
      name: "Farm Fresh Eggs",
      description: "Free-range chicken eggs from happy hens. Rich in protein and perfect for daily consumption.",
      image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&h=600&fit=crop",
      price: "Rs. 45/piece",
      rating: 4.7,
      category: "Dairy Products",
      inStock: true,
      isOrganic: true,
      isFeatured: false,
      minOrder: "500 pieces",
      producer: {
        name: "Happy Hens Farm",
        location: "Kurunegala",
        verified: true
      }
    },
    {
      id: 12,
      name: "Red Rice - Traditional Variety",
      description: "Nutritious red rice variety packed with fiber and minerals. Traditional Sri Lankan variety with health benefits.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
      price: "Rs. 280/kg",
      rating: 4.6,
      category: "Grains & Rice",
      inStock: true,
      isOrganic: true,
      isFeatured: true,
      minOrder: "100kg",
      producer: {
        name: "Heritage Rice Mills",
        location: "Polonnaruwa",
        verified: true
      }
    }
  ];

  const [allProducts, setAllProducts] = useState(mockProducts);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
    setPage(1);
    setDisplayedProducts([]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setDisplayedProducts([]);
  };

  const handleProductContact = (product) => {
    console.log('Contact producer for:', product.name);
    // Implement contact functionality
  };

  const handleProductDetails = (product) => {
    console.log('View details for:', product.name);
    // Implement product details view
  };

  // Filter and sort products based on current filters
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Filter by category
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(product => 
        product.producer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.match(/[\d,]+/)[0].replace(',', ''));
        const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
        
        if (filters.priceRange === '2500+') {
          return price >= 2500;
        } else if (min && max) {
          return price >= parseInt(min) && price <= parseInt(max);
        }
        return true;
      });
    }

    // Filter by stock availability
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filter by organic
    if (filters.organicOnly) {
      filtered = filtered.filter(product => product.isOrganic);
    }

    // Filter by featured
    if (filters.featuredOnly) {
      filtered = filtered.filter(product => product.isFeatured);
    }

    // Filter by verified producers
    if (filters.verifiedOnly) {
      filtered = filtered.filter(product => product.producer.verified);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        // For mock data, we'll randomize since we don't have actual dates
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'price':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.match(/[\d,]+/)[0].replace(',', ''));
          const priceB = parseFloat(b.price.match(/[\d,]+/)[0].replace(',', ''));
          return priceA - priceB;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  // Load more products (infinite scroll simulation)
  const loadMoreProducts = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredProducts = getFilteredProducts();
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = filteredProducts.slice(startIndex, endIndex);

      if (newProducts.length > 0) {
        setDisplayedProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
      }

      if (endIndex >= filteredProducts.length) {
        setHasMore(false);
      }

      setLoading(false);
    }, 800);
  };

  // Reset and load initial products when filters change
  useEffect(() => {
    const filteredProducts = getFilteredProducts();
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(initialProducts);
    setHasMore(filteredProducts.length > productsPerPage);
    setPage(2);
  }, [filters]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Page Header */}
          <div className="bg-white border-b border-primary-200">
            <div className="max-w-7xlx mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-primary-900">Explore Products</h1>
                  <p className="text-primary-600 mt-2">Discover quality products from verified producers</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-primary-500">
                    {getFilteredProducts().length} products available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <ProductSearchFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange}
          />

          {/* Category Tabs */}
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Main Content */}
          <div className="max-w-7xlx mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* Left Sidebar - Filters Summary */}
              <div className="hidden xl:block">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Active Filters */}
                  <div className="bg-white rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Active Filters</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Category</span>
                        <span className="text-sm font-medium text-primary-800">{filters.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Sort By</span>
                        <span className="text-sm font-medium text-primary-800">
                          {filters.sortBy === 'popularity' ? 'Most Popular' : 
                           filters.sortBy === 'recent' ? 'Most Recent' : 
                           filters.sortBy === 'price' ? 'Price Low to High' : filters.sortBy}
                        </span>
                      </div>
                      {filters.location && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-600">Location</span>
                          <span className="text-sm font-medium text-primary-800">{filters.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Total Products</span>
                        <span className="text-lg font-bold text-orange-600">{allProducts.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">In Stock</span>
                        <span className="text-lg font-bold text-green-600">
                          {allProducts.filter(p => p.inStock).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Organic Products</span>
                        <span className="text-lg font-bold text-blue-600">
                          {allProducts.filter(p => p.isOrganic).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">Featured</span>
                        <span className="text-lg font-bold text-purple-600">
                          {allProducts.filter(p => p.isFeatured).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column - Products Grid (YouTube-like layout) */}
              <div className="xl:col-span-3">
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onContact={handleProductContact}
                      onDetails={handleProductDetails}
                      size="default"
                    />
                  ))}
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
                  </div>
                )}

                {/* Load More Button */}
                {!loading && hasMore && displayedProducts.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={loadMoreProducts}
                      className="px-8 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    >
                      Load More Products
                    </button>
                  </div>
                )}

                {/* No More Products */}
                {!hasMore && displayedProducts.length > 0 && (
                  <div className="text-center py-12">
                    <p className="text-primary-500">You've reached the end! No more products to show.</p>
                  </div>
                )}

                {/* No Products Found */}
                {!loading && displayedProducts.length === 0 && (
                  <div className="text-center py-24">
                    <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">No Products Found</h3>
                    <p className="text-primary-600 mb-6">Try adjusting your filters to find more products.</p>
                    <button
                      onClick={() => {
                        setFilters({
                          category: 'All',
                          location: '',
                          sortBy: 'popularity',
                          priceRange: 'all',
                          inStockOnly: false,
                          organicOnly: false,
                          featuredOnly: false,
                          verifiedOnly: false,
                          exportQuality: false
                        });
                        setActiveCategory('All');
                      }}
                      className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ExploreProducts;