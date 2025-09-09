import React from 'react';

const ColorShowcase = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary-800 mb-8">HelaTrade Color Showcase</h1>
      
      {/* Primary Color Variations */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Primary Colors</h2>
        <div className="flex flex-wrap gap-4">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="text-center">
              <div 
                className={`w-16 h-16 rounded border border-gray-300`}
                style={{ backgroundColor: `var(--color-primary-${shade})` }}
              ></div>
              <p className="text-xs mt-1 text-primary-600">{shade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accent Colors */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Accent Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Blue */}
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Blue</h3>
            <div className="flex flex-wrap gap-2">
              {[50, 200, 500, 700, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div 
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: `var(--color-blue-${shade})` }}
                  ></div>
                  <p className="text-xs text-primary-600">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Orange */}
          <div>
            <h3 className="font-medium text-orange-600 mb-2">Orange</h3>
            <div className="flex flex-wrap gap-2">
              {[50, 200, 500, 700, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div 
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: `var(--color-orange-${shade})` }}
                  ></div>
                  <p className="text-xs text-primary-600">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Yellow */}
          <div>
            <h3 className="font-medium text-yellow-700 mb-2">Yellow</h3>
            <div className="flex flex-wrap gap-2">
              {[50, 200, 500, 700, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div 
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: `var(--color-yellow-${shade})` }}
                  ></div>
                  <p className="text-xs text-primary-600">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Button Examples using Tailwind v4 utilities */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary-600 text-white border border-primary-600 px-4 py-2 rounded transition-colors hover:bg-primary-700 hover:border-primary-700">
            Primary Button
          </button>
          <button className="bg-orange-600 text-white border border-orange-600 px-4 py-2 rounded transition-colors hover:bg-orange-700 hover:border-orange-700">
            Orange Button
          </button>
          <button className="bg-blue-900 text-white border border-blue-900 px-4 py-2 rounded transition-colors hover:bg-blue-800 hover:border-blue-800">
            Blue Button
          </button>
          <button className="bg-yellow-500 text-primary-800 border border-yellow-500 px-4 py-2 rounded transition-colors hover:bg-yellow-600 hover:border-yellow-600">
            Yellow Button
          </button>
        </div>
      </section>

      {/* Semantic Colors */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-success-100 border border-success-300 rounded">
            <h4 className="font-medium text-success-800">Success</h4>
            <p className="text-success-600 text-sm">Operation completed successfully</p>
          </div>
          <div className="p-4 bg-warning-100 border border-warning-300 rounded">
            <h4 className="font-medium text-warning-800">Warning</h4>
            <p className="text-warning-600 text-sm">Please review your input</p>
          </div>
          <div className="p-4 bg-error-100 border border-error-300 rounded">
            <h4 className="font-medium text-error-800">Error</h4>
            <p className="text-error-600 text-sm">Something went wrong</p>
          </div>
          <div className="p-4 bg-info-100 border border-info-300 rounded">
            <h4 className="font-medium text-info-800">Info</h4>
            <p className="text-info-600 text-sm">Additional information</p>
          </div>
        </div>
      </section>

      {/* Card Examples */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Card Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-primary-200 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-900 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Feature Card</h3>
            <p className="text-primary-600 text-sm">This card uses the blue accent color for the icon.</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Highlighted Card</h3>
            <p className="text-orange-700 text-sm">This card uses orange for emphasis.</p>
          </div>
          
          <div className="bg-primary-50 border border-primary-300 rounded-lg p-6">
            <div className="w-12 h-12 bg-primary-600 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Standard Card</h3>
            <p className="text-primary-600 text-sm">This card uses the primary color scheme.</p>
          </div>
        </div>
      </section>

      {/* Brand Colors Demo */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Brand Colors</h2>
        <div className="flex flex-wrap gap-4">
          <div className="p-4 bg-brand-light text-white rounded">Brand Light</div>
          <div className="p-4 bg-brand text-white rounded">Brand Default</div>
          <div className="p-4 bg-brand-dark text-white rounded">Brand Dark</div>
        </div>
      </section>

      {/* Accent Variants Demo */}
      <section>
        <h2 className="text-xl font-semibold text-primary-700 mb-4">Accent Variants</h2>
        <div className="flex flex-wrap gap-4">
          <div className="p-4 bg-accent-orange text-white rounded">Accent Orange</div>
          <div className="p-4 bg-accent-yellow text-primary-800 rounded">Accent Yellow</div>
          <div className="p-4 bg-accent-blue text-white rounded">Accent Blue</div>
        </div>
      </section>
    </div>
  );
};

export default ColorShowcase;
