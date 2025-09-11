import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-20 w-24 h-24 bg-white/10 transform rotate-45"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5h-2z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      <div className="relative max-w-7xlx mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to 
            <span className="text-yellow-300"> Transform</span>
            <br />
            Your Business?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of producers and retailers who are already growing their business 
            through HelaTrade's powerful social marketplace platform.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
            {/* Producer CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl max-w-md group hover:-translate-y-2 transform transition-all duration-300">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-primary-800 mb-3">For Producers</h3>
              <p className="text-gray-600 mb-6">
                Showcase your products, connect with retailers, and grow your business reach across Sri Lanka.
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Free product listings
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Direct retailer connections
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Social media style promotion
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Order management tools
                </li>
              </ul>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg group-hover:bg-green-700">
                Join as Producer
              </button>
              <p className="text-xs text-gray-400 mt-3">No setup fees • Start immediately</p>
            </div>

            {/* VS Divider */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/20 text-white font-bold px-6 py-3 rounded-full text-lg backdrop-blur-sm">
                OR
              </div>
            </div>

            {/* Store CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl max-w-md group hover:-translate-y-2 transform transition-all duration-300">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-primary-800 mb-3">For Retail Stores</h3>
              <p className="text-gray-600 mb-6">
                Find quality suppliers, discover new products, and build lasting partnerships with verified producers.
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Access verified suppliers
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Competitive wholesale prices
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Quality guarantee
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Streamlined ordering
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg group-hover:bg-blue-700">
                Join as Store
              </button>
              <p className="text-xs text-gray-400 mt-3">Free registration • Instant access</p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">Why Choose HelaTrade?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="font-semibold mb-2">Fast Growth</h4>
                <p className="text-orange-100 text-sm">
                  Expand your business network and reach new markets quickly
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h4 className="font-semibold mb-2">Secure Platform</h4>
                <p className="text-orange-100 text-sm">
                  Verified users, secure transactions, and reliable communication
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💪</div>
                <h4 className="font-semibold mb-2">Local Focus</h4>
                <p className="text-orange-100 text-sm">
                  Built specifically for Sri Lankan market needs and culture
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1200+</div>
              <div className="text-sm">Active Producers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">850+</div>
              <div className="text-sm">Retail Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8⭐</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-orange-100 mb-4">
              Have questions? Our team is here to help you get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white">
              <a href="tel:+94112345678" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+94 11 234 5678</span>
              </a>
              <a href="mailto:support@helatrade.lk" className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@helatrade.lk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
