// Test frontend API call simulation
const { default: fetch } = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/api';

// Simulate the apiRequest function from services/api.js
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
    console.log('Making request to:', url);
    console.log('Request config:', JSON.stringify(config, null, 2));

    const response = await fetch(url, config);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      // Create a more detailed error object
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    
    // If it's already our custom error, re-throw it
    if (error.status) {
      throw error;
    }
    
    // Otherwise, wrap it in a generic error
    const wrappedError = new Error('Network error occurred');
    wrappedError.status = 0;
    wrappedError.originalError = error;
    throw wrappedError;
  }
};

// Simulate producersAPI.login
const producersAPILogin = async (credentials) => {
  return apiRequest('/producers/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Test the exact same call the frontend would make
async function testFrontendAPICall() {
  try {
    console.log('=== Testing Frontend API Call ===');
    
    const credentials = {
      email: 'info@highlandtea.lk',
      password: 'SecurePassword123'
    };

    const response = await producersAPILogin(credentials);
    
    console.log('Frontend API call successful!');
    console.log('Success:', response.success);
    console.log('Has token:', !!response.token);
    console.log('Producer name:', response.data?.name);
    
  } catch (error) {
    console.error('Frontend API call failed:');
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.error('Error data:', error.data);
  }
}

testFrontendAPICall();