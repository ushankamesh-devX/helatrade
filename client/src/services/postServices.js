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

// Image upload service for BunnyCDN - Post Images
const postImageUploadService = {
  // Upload image to BunnyCDN storage zone for posts
  uploadPostImage: async (file, folder = 'posts') => {
    try {
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB');
      }

      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;

      // BunnyCDN configuration (you'll need to set these values)
      const BUNNY_STORAGE_ZONE = 'helatrade'; // Replace with your storage zone name
      const BUNNY_ACCESS_KEY = '70cf3825-3c31-45ff-9336bb06a8c5-bc95-4844'; // Replace with your access key
      const BUNNY_STORAGE_URL = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${folder}/${uniqueFileName}`;
      const BUNNY_CDN_URL = `https://helatrade.b-cdn.net/${folder}/${uniqueFileName}`; // Replace with your CDN URL

      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to BunnyCDN
      console.log('Uploading post image to BunnyCDN:', {
        url: BUNNY_STORAGE_URL,
        storageZone: BUNNY_STORAGE_ZONE,
        folder: folder,
        filename: uniqueFileName
      });

      const response = await fetch(BUNNY_STORAGE_URL, {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_ACCESS_KEY,
          'Content-Type': file.type,
        },
        body: file,
      });

      console.log('BunnyCDN Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('BunnyCDN Error Response:', errorText);
        throw new Error(`Upload failed (${response.status}): ${response.statusText}. ${errorText || 'Check storage zone setup and access key permissions.'}`);
      }

      return {
        success: true,
        url: BUNNY_CDN_URL,
        filename: uniqueFileName,
        message: 'Post image uploaded successfully'
      };

    } catch (error) {
      console.error('Post image upload error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Post image upload failed'
      };
    }
  },

  // Delete image from BunnyCDN (for cleanup)
  deletePostImage: async (filename, folder = 'posts') => {
    try {
      const BUNNY_STORAGE_ZONE = 'helatrade';
      const BUNNY_ACCESS_KEY = '70cf3825-3c31-45ff-9336bb06a8c5-bc95-4844';
      const BUNNY_STORAGE_URL = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${folder}/${filename}`;

      const response = await fetch(BUNNY_STORAGE_URL, {
        method: 'DELETE',
        headers: {
          'AccessKey': BUNNY_ACCESS_KEY,
        },
      });

      return {
        success: response.ok,
        message: response.ok ? 'Post image deleted successfully' : 'Failed to delete post image'
      };

    } catch (error) {
      console.error('Post image deletion error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Post image deletion failed'
      };
    }
  }
};

export { postImageUploadService };