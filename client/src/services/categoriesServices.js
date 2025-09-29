import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Categories service
const categoriesService = {
  // Get all categories
  getAllCategories: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/categories?${queryString}` : '/categories';

      const response = await api.get(endpoint);

      if (response.data.success) {
        return {
          success: true,
          categories: response.data.data.categories || [],
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Categories API error:', error);
      return {
        success: false,
        categories: [],
        error: error.message || 'Failed to fetch categories'
      };
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);

      if (response.data.success) {
        return {
          success: true,
          category: response.data.data.category,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch category');
      }
    } catch (error) {
      console.error('Category API error:', error);
      return {
        success: false,
        category: null,
        error: error.message || 'Failed to fetch category'
      };
    }
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    try {
      const response = await api.get(`/categories/slug/${slug}`);

      if (response.data.success) {
        return {
          success: true,
          category: response.data.data.category,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch category');
      }
    } catch (error) {
      console.error('Category API error:', error);
      return {
        success: false,
        category: null,
        error: error.message || 'Failed to fetch category'
      };
    }
  }
};

export default categoriesService;