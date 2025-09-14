const Producer = require('../models/Producer');
const { validationResult } = require('express-validator');
const AuthMiddleware = require('../middleware/auth');

class ProducerController {
  /**
   * Get all producers with filtering and pagination
   * GET /api/producers
   */
  static async getAll(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 50), // Max 50 per page
        search: req.query.search,
        category: req.query.category,
        location: req.query.location,
        verified: req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined,
        sort: req.query.sort,
        order: req.query.order
      };

      const result = await Producer.getAll(options);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error fetching producers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch producers'
      });
    }
  }

  /**
   * Get producer by ID or slug
   * GET /api/producers/:identifier
   */
  static async getById(req, res) {
    try {
      const { identifier } = req.params;
      const producer = await Producer.getByIdOrSlug(identifier);

      if (!producer) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Producer not found'
        });
      }

      res.json({
        success: true,
        data: producer.toJSON()
      });
    } catch (error) {
      console.error('Error fetching producer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch producer'
      });
    }
  }

  /**
   * Create new producer
   * POST /api/producers
   */
  static async create(req, res) {
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

      const producer = await Producer.create(req.body);

      res.status(201).json({
        success: true,
        data: producer.toJSON(),
        message: 'Producer created successfully'
      });
    } catch (error) {
      console.error('Error creating producer:', error);
      
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          error: 'Conflict',
          message: 'Producer with this name or email already exists'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to create producer'
      });
    }
  }

  /**
   * Register new producer with authentication
   * POST /api/producers/register
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

      const producer = await Producer.create(req.body);

      // Generate JWT token
      const token = AuthMiddleware.generateToken({
        producerId: producer.id,
        email: producer.email,
        type: 'producer'
      });

      // Remove password hash from response
      const producerData = producer.toJSON();

      res.status(201).json({
        success: true,
        data: producerData,
        token,
        message: 'Producer registered successfully'
      });
    } catch (error) {
      console.error('Error registering producer:', error);
      
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          error: 'Conflict',
          message: 'Producer with this email already exists'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to register producer'
      });
    }
  }

  /**
   * Producer login
   * POST /api/producers/login
   */
  static async login(req, res) {
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

      const { email, password } = req.body;
      const producer = await Producer.authenticate(email, password);

      if (!producer) {
        return res.status(401).json({
          success: false,
          error: 'Authentication Failed',
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = AuthMiddleware.generateToken({
        producerId: producer.id,
        email: producer.email,
        type: 'producer'
      });

      // Remove password hash from response
      const producerData = producer.toJSON();

      res.json({
        success: true,
        data: producerData,
        token,
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Error during producer login:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to login'
      });
    }
  }

  /**
   * Update producer
   * PUT /api/producers/:id
   */
  static async update(req, res) {
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

      const { id } = req.params;
      const producer = await Producer.update(id, req.body);

      if (!producer) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Producer not found'
        });
      }

      res.json({
        success: true,
        data: producer.toJSON(),
        message: 'Producer updated successfully'
      });
    } catch (error) {
      console.error('Error updating producer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update producer'
      });
    }
  }

  /**
   * Update producer password
   * PUT /api/producers/password
   */
  static async updatePassword(req, res) {
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

      const producerId = req.producer.producerId;
      const { currentPassword, newPassword } = req.body;

      await Producer.updatePassword(producerId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password updated successfully'
      });
    } catch (error) {
      console.error('Error updating producer password:', error);
      
      if (error.message === 'Producer not found') {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Producer not found'
        });
      }
      
      if (error.message === 'Current password is incorrect') {
        return res.status(400).json({
          success: false,
          error: 'Invalid Password',
          message: 'Current password is incorrect'
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
   * Delete (soft delete) producer
   * DELETE /api/producers/:id
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const success = await Producer.delete(id);

      if (!success) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Producer not found'
        });
      }

      res.json({
        success: true,
        message: 'Producer deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting producer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to delete producer'
      });
    }
  }





  /**
   * Update producer statistics
   * PATCH /api/producers/:id/stats
   */
  static async updateStats(req, res) {
    try {
      const { id } = req.params;
      await Producer.updateStats(id, req.body);

      res.json({
        success: true,
        message: 'Producer statistics updated successfully'
      });
    } catch (error) {
      console.error('Error updating producer stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update producer statistics'
      });
    }
  }

  /**
   * Search producers
   * GET /api/producers/search
   */
  static async search(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 50),
        search: req.query.q,
        category: req.query.category,
        location: req.query.location,
        verified: req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined,
        sort: 'name',
        order: 'asc'
      };

      const result = await Producer.getAll(options);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error searching producers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to search producers'
      });
    }
  }

  /**
   * Get featured producers
   * GET /api/producers/featured
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

      const result = await Producer.getAll(options);

      res.json({
        success: true,
        data: result.producers
      });
    } catch (error) {
      console.error('Error fetching featured producers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch featured producers'
      });
    }
  }

  /**
   * Get similar producers
   * GET /api/producers/:id/similar
   */
  static async getSimilar(req, res) {
    try {
      const { id } = req.params;
      const producer = await Producer.getByIdOrSlug(id);

      if (!producer) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Producer not found'
        });
      }

      // Get producers in same categories (simplified implementation)
      const options = {
        page: 1,
        limit: parseInt(req.query.limit) || 5,
        category: producer.categories?.[0]?.slug, // Use first category
        sort: 'rating',
        order: 'desc'
      };

      const result = await Producer.getAll(options);
      
      // Filter out the current producer
      const similarProducers = result.producers.filter(p => p.id !== producer.id);

      res.json({
        success: true,
        data: similarProducers
      });
    } catch (error) {
      console.error('Error fetching similar producers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch similar producers'
      });
    }
  }
}

module.exports = ProducerController;