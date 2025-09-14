// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/categories?${queryString}` : '/categories';
    return apiRequest(endpoint);
  },

  // Get category by ID
  getById: async (id) => {
    return apiRequest(`/categories/${id}`);
  },

  // Get category by slug
  getBySlug: async (slug) => {
    return apiRequest(`/categories/slug/${slug}`);
  },

  // Create category (admin only)
  create: async (categoryData) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Update category (admin only)
  update: async (id, categoryData) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // Delete category (admin only)
  delete: async (id) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Producers API
export const producersAPI = {
  // Get all producers
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers?${queryString}` : '/producers';
    return apiRequest(endpoint);
  },

  // Get producer by ID or slug
  getById: async (identifier) => {
    return apiRequest(`/producers/${identifier}`);
  },

  // Search producers
  search: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/search?${queryString}` : '/producers/search';
    return apiRequest(endpoint);
  },

  // Get featured producers
  getFeatured: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/featured?${queryString}` : '/producers/featured';
    return apiRequest(endpoint);
  },

  // Get similar producers
  getSimilar: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/${id}/similar?${queryString}` : `/producers/${id}/similar`;
    return apiRequest(endpoint);
  },

  // Create producer
  create: async (producerData) => {
    return apiRequest('/producers', {
      method: 'POST',
      body: JSON.stringify(producerData),
    });
  },

  // Update producer
  update: async (id, producerData) => {
    return apiRequest(`/producers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(producerData),
    });
  },

  // Delete producer
  delete: async (id) => {
    return apiRequest(`/producers/${id}`, {
      method: 'DELETE',
    });
  },

  // Get producer posts
  getPosts: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/${id}/posts?${queryString}` : `/producers/${id}/posts`;
    return apiRequest(endpoint);
  },

  // Get producer products
  getProducts: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/${id}/products?${queryString}` : `/producers/${id}/products`;
    return apiRequest(endpoint);
  },

  // Update producer statistics
  updateStats: async (id, stats) => {
    return apiRequest(`/producers/${id}/stats`, {
      method: 'PATCH',
      body: JSON.stringify(stats),
    });
  },

  // Contact producer
  contact: async (id, contactData) => {
    return apiRequest(`/producers/${id}/contact`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  // Follow/connect to producer
  connect: async (id) => {
    return apiRequest(`/producers/${id}/connect`, {
      method: 'POST',
    });
  },

  // Unfollow producer
  disconnect: async (id) => {
    return apiRequest(`/producers/${id}/connect`, {
      method: 'DELETE',
    });
  },

  // Get producer connections
  getConnections: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/producers/${id}/connections?${queryString}` : `/producers/${id}/connections`;
    return apiRequest(endpoint);
  },
};

// Stores API
export const storesAPI = {
  // Store Registration & Authentication
  register: async (storeData) => {
    return apiRequest('/stores/register', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  },

  login: async (credentials) => {
    return apiRequest('/stores/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Store Profile Management
  getProfile: async (token) => {
    return apiRequest('/stores/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  updateProfile: async (token, profileData) => {
    return apiRequest('/stores/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  updatePassword: async (token, passwordData) => {
    return apiRequest('/stores/password', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
  },

  // Store Connections
  getConnections: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/stores/connections?${queryString}` : '/stores/connections';
    return apiRequest(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  connectWithProducer: async (token, producerId, connectionData) => {
    return apiRequest(`/stores/connections/${producerId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(connectionData),
    });
  },

  updateConnection: async (token, producerId, connectionData) => {
    return apiRequest(`/stores/connections/${producerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(connectionData),
    });
  },

  removeConnection: async (token, producerId) => {
    return apiRequest(`/stores/connections/${producerId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Public Store APIs
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/stores?${queryString}` : '/stores';
    return apiRequest(endpoint);
  },

  getById: async (identifier) => {
    return apiRequest(`/stores/${identifier}`);
  },

  search: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/stores/search?${queryString}` : '/stores/search';
    return apiRequest(endpoint);
  },

  getFeatured: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/stores/featured?${queryString}` : '/stores/featured';
    return apiRequest(endpoint);
  },
};

export default apiRequest;