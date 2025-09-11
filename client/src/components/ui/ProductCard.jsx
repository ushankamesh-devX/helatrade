import React, { useState } from 'react';

const ProductCard = ({
  product,
  onContact,
  onDetails,
  showContactButton = true,
  showDetailsButton = true,
  size = 'default' // 'default', 'compact', 'large'
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDIwMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxODAiIHk9IjEzMCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0ibTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBhMTAgMTAgMCAwIDAtMTAtMTB6bTAgMThhOCA4IDAgMSAxIDgtOGE4IDggMCAwIDEtOCA4eiIgZmlsbD0iI0Y5RkFGQiIvPgo8cGF0aCBkPSJtMTIgMTNhMSAxIDAgMCAwIDEtMWEyIDIgMCAwIDAtMi0yaC0yYTEgMSAwIDAgMCAwIDJoMmExIDEgMCAwIDEgMSAxeiIgZmlsbD0iI0Y5RkFGQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjkiIHI9IjEiIGZpbGw9IiNGOUZBRkIiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K';
  };

  const handleContact = () => {
    if (onContact) {
      onContact(product);
    }
  };

  const handleDetails = () => {
    if (onDetails) {
      onDetails(product);
    }
  };

  // Size configurations
  const sizeConfig = {
    compact: {
      imageHeight: 'h-32',
      padding: 'p-3',
      titleSize: 'text-sm',
      priceSize: 'text-base',
      buttonSize: 'py-1 text-xs'
    },
    default: {
      imageHeight: 'h-48',
      padding: 'p-4',
      titleSize: 'text-base',
      priceSize: 'text-lg',
      buttonSize: 'py-2 text-sm'
    },
    large: {
      imageHeight: 'h-56',
      padding: 'p-6',
      titleSize: 'text-lg',
      priceSize: 'text-xl',
      buttonSize: 'py-3 text-base'
    }
  };

  const config = sizeConfig[size] || sizeConfig.default;

  return (
    <div className="bg-white rounded-lg border border-primary-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className={`relative ${config.imageHeight} bg-primary-100 overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Details Button Overlay */}
        {showDetailsButton && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              onClick={handleDetails}
              className="bg-white/90 hover:bg-white text-primary-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={config.padding}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-semibold text-primary-900 ${config.titleSize} line-clamp-2 flex-1 mr-2`}>
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-primary-600 font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Description (if available) */}
        {product.description && (
          <p className="text-sm text-primary-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Additional Info */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-bold text-orange-600 ${config.priceSize}`}>
            {product.price}
          </span>
          
          {/* Additional badges */}
          <div className="flex items-center space-x-2">
            {product.isOrganic && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Organic
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Category */}
        {product.category && (
          <div className="mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showDetailsButton && (
            <button
              onClick={handleDetails}
              className={`flex-1 border border-primary-300 text-primary-700 hover:bg-primary-50 font-medium rounded-lg transition-colors ${config.buttonSize}`}
            >
              Details
            </button>
          )}
          
          {showContactButton && (
            <button 
              onClick={handleContact}
              disabled={!product.inStock}
              className={`flex-1 font-medium rounded-lg transition-colors ${config.buttonSize} ${
                product.inStock
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-primary-300 text-primary-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Contact for Order' : 'Out of Stock'}
            </button>
          )}
        </div>

        {/* Additional Info */}
        {product.minOrder && (
          <div className="mt-3 text-xs text-primary-500">
            Min. Order: {product.minOrder}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;