const Store = require('../models/Store');
const { validationResult } = require('express-validator');
const { executeQuery } = require('../config/database');
const jwt = require('jsonwebtoken');

class StoreController {
  /**
   * Register new store
   * POST /api/stores/register
   */
  static async register(req, res) {
    try {
      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          error: 'Validation Error',
          message: 'Invalid input data',
          details: errors.array()
        });
      }

      const store = await Store.register(req.body);

      // Generate JWT token
      const token = jwt.sign(
        { 
          storeId: store.id, 
          email: store.email,
          type: 'store'
        },
        process.env.JWT_SECRET || 'helatrade_jwt_secret',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        data: {
          store: store.toJSON(),
          token
        },
        message: 'Store registered successfully'
      });
    } catch (error) {
      console.error('Error registering store:', error);
      
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          error: 'Conflict',
          message: 'Store with this email already exists'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to register store'
      });
    }
  }

  /**
   * Store login
   * POST /api/stores/login
   */
  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          error: 'Validation Error',
          message: 'Invalid input data',
          details: errors.array()
        });
      }

      const { email, password } = req.body;
      const store = await Store.authenticate(email, password);

      if (!store) {
        return res.status(401).json({
          success: false,
          error: 'Authentication Failed',
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          storeId: store.id, 
          email: store.email,
          type: 'store'
        },
        process.env.JWT_SECRET || 'helatrade_jwt_secret',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          store: store.toJSON(),
          token
        },
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Error during store login:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to login'
      });
    }
  }

  /**
   * Get store profile
   * GET /api/stores/profile
   */
  static async getProfile(req, res) {
    try {
      const storeId = req.store.storeId;
      const store = await Store.getByIdOrSlug(storeId);

      if (!store) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json({
        success: true,
        data: store.toJSON()
      });
    } catch (error) {
      console.error('Error fetching store profile:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch store profile'
      });
    }
  }

  /**
   * Update store profile
   * PUT /api/stores/profile
   */
  static async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          error: 'Validation Error',
          message: 'Invalid input data',
          details: errors.array()
        });
      }

      const storeId = req.store.storeId;
      const store = await Store.update(storeId, req.body);

      if (!store) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json({
        success: true,
        data: store.toJSON(),
        message: 'Store profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating store profile:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update store profile'
      });
    }
  }

  /**
   * Update store password
   * PUT /api/stores/password
   */
  static async updatePassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          error: 'Validation Error',
          message: 'Invalid input data',
          details: errors.array()
        });
      }

      const storeId = req.store.storeId;
      const { currentPassword, newPassword } = req.body;

      await Store.updatePassword(storeId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password updated successfully'
      });
    } catch (error) {
      console.error('Error updating store password:', error);
      
      if (error.message === 'Store not found' || error.message === 'Current password is incorrect') {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update password'
      });
    }
  }

  /**
   * Get all stores with filtering and pagination
   * GET /api/stores
   */
  static async getAll(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 50), // Max 50 per page
        search: req.query.search,
        businessType: req.query.businessType,
        location: req.query.location,
        verified: req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined,
        sort: req.query.sort,
        order: req.query.order
      };

      const result = await Store.getAll(options);

      // Convert to public profiles (remove sensitive data)
      const publicStores = result.stores.map(store => store.toPublicJSON());

      res.json({
        success: true,
        data: {
          ...result,
          stores: publicStores
        }
      });
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch stores'
      });
    }
  }

  /**
   * Get store by ID or slug (public view)
   * GET /api/stores/:identifier
   */
  static async getById(req, res) {
    try {
      const { identifier } = req.params;
      const store = await Store.getByIdOrSlug(identifier);

      if (!store) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json({
        success: true,
        data: store.toPublicJSON()
      });
    } catch (error) {
      console.error('Error fetching store:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch store'
      });
    }
  }

  /**
   * Get store connections with producers
   * GET /api/stores/connections
   */
  static async getConnections(req, res) {
    try {
      const storeId = req.store.storeId;
      const options = {
        status: req.query.status || 'accepted',
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 50)
      };

      const result = await Store.getConnections(storeId, options);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error fetching store connections:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch connections'
      });
    }
  }

  /**
   * Connect with a producer
   * POST /api/stores/connections/:producerId
   */
  static async connectWithProducer(req, res) {
    try {
      const storeId = req.store.storeId;
      const { producerId } = req.params;
      const { notes = '' } = req.body;

      await Store.connectWithProducer(storeId, producerId, notes);

      res.status(201).json({
        success: true,
        message: 'Connection request sent successfully'
      });
    } catch (error) {
      console.error('Error connecting with producer:', error);
      
      if (error.message === 'Connection already exists') {
        return res.status(409).json({
          success: false,
          error: 'Conflict',
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to connect with producer'
      });
    }
  }

  /**
   * Update connection with producer
   * PUT /api/stores/connections/:producerId
   */
  static async updateConnection(req, res) {
    try {
      const storeId = req.store.storeId;
      const { producerId } = req.params;
      const { status, connectionType = 'regular' } = req.body;

      if (!['pending', 'accepted', 'blocked', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid connection status'
        });
      }

      await Store.updateConnection(storeId, producerId, status, connectionType);

      res.json({
        success: true,
        message: 'Connection updated successfully'
      });
    } catch (error) {
      console.error('Error updating connection:', error);
      
      if (error.message === 'Connection not found') {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update connection'
      });
    }
  }

  /**
   * Remove connection with producer
   * DELETE /api/stores/connections/:producerId
   */
  static async removeConnection(req, res) {
    try {
      const storeId = req.store.storeId;
      const { producerId } = req.params;

      await Store.updateConnection(storeId, producerId, 'blocked');

      res.json({
        success: true,
        message: 'Connection removed successfully'
      });
    } catch (error) {
      console.error('Error removing connection:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to remove connection'
      });
    }
  }

  /**
   * Search stores
   * GET /api/stores/search
   */
  static async search(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 50),
        search: req.query.q,
        businessType: req.query.businessType,
        location: req.query.location,
        verified: req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined,
        sort: 'store_name',
        order: 'asc'
      };

      const result = await Store.getAll(options);
      
      // Convert to public profiles
      const publicStores = result.stores.map(store => store.toPublicJSON());

      res.json({
        success: true,
        data: {
          ...result,
          stores: publicStores
        }
      });
    } catch (error) {
      console.error('Error searching stores:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to search stores'
      });
    }
  }

  /**
   * Get featured stores
   * GET /api/stores/featured
   */
  static async getFeatured(req, res) {
    try {
      const options = {
        page: 1,
        limit: parseInt(req.query.limit) || 10,
        verified: true,
        sort: 'rating',
        order: 'desc'
      };

      const result = await Store.getAll(options);
      
      // Convert to public profiles
      const publicStores = result.stores.map(store => store.toPublicJSON());

      res.json({
        success: true,
        data: publicStores
      });
    } catch (error) {
      console.error('Error fetching featured stores:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch featured stores'
      });
    }
  }

  /**
   * Delete store account (soft delete)
   * DELETE /api/stores/account
   */
  static async deleteAccount(req, res) {
    try {
      const storeId = req.store.storeId;
      const success = await Store.delete(storeId);

      if (!success) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json({
        success: true,
        message: 'Store account deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting store account:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to delete store account'
      });
    }
  }

  /**
   * Verify email
   * POST /api/stores/verify-email
   */
  static async verifyEmail(req, res) {
    try {
      // This would typically involve token verification
      // For now, we'll just mark email as verified
      const storeId = req.store.storeId;
      
      const updateQuery = 'UPDATE stores SET email_verified = TRUE WHERE id = ?';
      await executeQuery(updateQuery, [storeId]);

      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to verify email'
      });
    }
  }

  /**
   * Get store dashboard stats
   * GET /api/stores/dashboard/stats
   */
  static async getDashboardStats(req, res) {
    try {
      const storeId = req.store.storeId;
      
      // Get various stats for the store dashboard
      const stats = {
        connectionsCount: 0,
        pendingConnections: 0,
        inquiriesCount: 0,
        ordersCount: 0
      };

      // You can implement more detailed statistics here
      // This is a simplified version

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch dashboard stats'
      });
    }
  }
}

module.exports = StoreController;