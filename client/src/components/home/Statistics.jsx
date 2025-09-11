import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    posts: 0,
    producers: 0,
    stores: 0,
    connections: 0
  });

  // Final target numbers
  const targets = {
    posts: 12500,
    producers: 1245,
    stores: 892,
    connections: 3400
  };

  // Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('statistics-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // Number of animation steps
      const stepDuration = duration / steps;

      const counters = Object.keys(targets).map(key => {
        const target = targets[key];
        const increment = target / steps;
        let current = 0;

        return setInterval(() => {
          current += increment;
          if (current >= target) {
            setCounts(prev => ({ ...prev, [key]: target }));
            clearInterval(counters[Object.keys(targets).indexOf(key)]);
          } else {
            setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, stepDuration);
      });

      return () => {
        counters.forEach(clearInterval);
      };
    }
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
  };

  const statisticsData = [
    {
      id: 'posts',
      label: 'Total Posts',
      value: counts.posts,
      icon: '📝',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Product listings shared'
    },
    {
      id: 'producers',
      label: 'Producers',
      value: counts.producers,
      icon: '🌱',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Verified producers'
    },
    {
      id: 'stores',
      label: 'Retail Stores',
      value: counts.stores,
      icon: '🏪',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Partner retail stores'
    },
    {
      id: 'connections',
      label: 'Connections Made',
      value: counts.connections,
      icon: '🤝',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Successful partnerships'
    }
  ];

  return (
    <section id="statistics-section" className="py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xlx mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Platform Statistics
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statisticsData.map((stat) => (
            <div key={stat.id} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/30">
                {/* Icon */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}
                </div>
                
                {/* Label */}
                <div className="text-lg font-semibold text-primary-100 mb-2">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-sm text-primary-200">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Growth Metrics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📈</span>
              Growth Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Monthly Growth</span>
                <span className="text-green-400 font-semibold">+25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">New Producers/Week</span>
                <span className="text-green-400 font-semibold">+18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Platform Uptime</span>
                <span className="text-green-400 font-semibold">99.9%</span>
              </div>
            </div>
          </div>

          {/* Geographic Coverage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🗺️</span>
              Coverage Areas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Provinces Covered</span>
                <span className="text-white font-semibold">9/9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Districts Active</span>
                <span className="text-white font-semibold">22/25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Rural Reach</span>
                <span className="text-white font-semibold">78%</span>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">⭐</span>
              Quality Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Avg. Rating</span>
                <span className="text-yellow-400 font-semibold">4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Verified Producers</span>
                <span className="text-blue-400 font-semibold">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-200">Success Rate</span>
                <span className="text-green-400 font-semibold">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Growing HelaTrade Community
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Be part of Sri Lanka's largest producer-to-retailer network. Connect with verified partners and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Start as Producer
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-white/30">
                Register Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
