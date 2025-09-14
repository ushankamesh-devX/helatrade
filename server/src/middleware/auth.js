const jwt = require('jsonwebtoken');
const { getOne } = require('../config/database');

class AuthMiddleware {
  /**
   * Generic JWT authentication middleware
   */
  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'No token provided'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'helatrade_jwt_secret');
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token Expired',
          message: 'Your session has expired. Please login again.'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({
          success: false,
          error: 'Invalid Token',
          message: 'Invalid token provided'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Authentication Error',
        message: 'Failed to authenticate token'
      });
    }
  }

  /**
   * Store-specific authentication middleware
   */
  static async authenticateStore(req, res, next) {
    try {
      // First authenticate the token
      AuthMiddleware.authenticateToken(req, res, async (error) => {
        if (error) return;

        // Check if the token is for a store
        if (req.user.type !== 'store') {
          return res.status(403).json({
            success: false,
            error: 'Access Forbidden',
            message: 'Store access required'
          });
        }

        // Verify store exists and is active
        const query = 'SELECT id, email, status FROM stores WHERE id = ?';
        const store = await getOne(query, [req.user.storeId]);

        if (!store) {
          return res.status(404).json({
            success: false,
            error: 'Store Not Found',
            message: 'Store account not found'
          });
        }

        if (store.status !== 'active') {
          return res.status(403).json({
            success: false,
            error: 'Account Inactive',
            message: 'Store account is not active'
          });
        }

        // Add store info to request
        req.store = req.user;
        req.storeData = store;
        next();
      });
    } catch (error) {
      console.error('Store authentication error:', error);
      return res.status(500).json({
        success: false,
        error: 'Authentication Error',
        message: 'Failed to authenticate store'
      });
    }
  }

  /**
   * Producer-specific authentication middleware
   */
  static async authenticateProducer(req, res, next) {
    try {
      // First authenticate the token
      AuthMiddleware.authenticateToken(req, res, async (error) => {
        if (error) return;

        // Check if the token is for a producer
        if (req.user.type !== 'producer') {
          return res.status(403).json({
            success: false,
            error: 'Access Forbidden',
            message: 'Producer access required'
          });
        }

        // Verify producer exists and is active
        const query = 'SELECT id, email, status FROM producers WHERE id = ?';
        const producer = await getOne(query, [req.user.producerId]);

        if (!producer) {
          return res.status(404).json({
            success: false,
            error: 'Producer Not Found',
            message: 'Producer account not found'
          });
        }

        if (producer.status !== 'active') {
          return res.status(403).json({
            success: false,
            error: 'Account Inactive',
            message: 'Producer account is not active'
          });
        }

        // Add producer info to request
        req.producer = req.user;
        req.producerData = producer;
        next();
      });
    } catch (error) {
      console.error('Producer authentication error:', error);
      return res.status(500).json({
        success: false,
        error: 'Authentication Error',
        message: 'Failed to authenticate producer'
      });
    }
  }

  /**
   * Admin authentication middleware
   */
  static async authenticateAdmin(req, res, next) {
    try {
      // First authenticate the token
      AuthMiddleware.authenticateToken(req, res, async (error) => {
        if (error) return;

        // Check if the token is for an admin
        if (req.user.type !== 'admin') {
          return res.status(403).json({
            success: false,
            error: 'Access Forbidden',
            message: 'Admin access required'
          });
        }

        // Add admin info to request
        req.admin = req.user;
        next();
      });
    } catch (error) {
      console.error('Admin authentication error:', error);
      return res.status(500).json({
        success: false,
        error: 'Authentication Error',
        message: 'Failed to authenticate admin'
      });
    }
  }

  /**
   * Optional authentication middleware - doesn't fail if no token
   */
  static optionalAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'helatrade_jwt_secret');
      req.user = decoded;
    } catch (error) {
      req.user = null;
    }

    next();
  }

  /**
   * Check if user owns the resource (for stores/producers)
   */
  static checkResourceOwnership(resourceIdParam = 'id') {
    return (req, res, next) => {
      const resourceId = req.params[resourceIdParam];
      
      // For stores
      if (req.store && req.store.storeId === resourceId) {
        return next();
      }
      
      // For producers
      if (req.producer && req.producer.producerId === resourceId) {
        return next();
      }
      
      // For admins - they can access any resource
      if (req.admin) {
        return next();
      }

      return res.status(403).json({
        success: false,
        error: 'Access Forbidden',
        message: 'You can only access your own resources'
      });
    };
  }

  /**
   * Rate limiting middleware for sensitive operations
   */
  static rateLimit(windowMs = 15 * 60 * 1000, maxAttempts = 5) {
    const attempts = new Map();

    return (req, res, next) => {
      const clientId = req.ip + (req.user ? req.user.email : '');
      const now = Date.now();
      
      // Clean old entries
      for (const [key, data] of attempts.entries()) {
        if (now - data.firstAttempt > windowMs) {
          attempts.delete(key);
        }
      }

      const clientAttempts = attempts.get(clientId);
      
      if (!clientAttempts) {
        attempts.set(clientId, { count: 1, firstAttempt: now });
        return next();
      }

      if (clientAttempts.count >= maxAttempts) {
        return res.status(429).json({
          success: false,
          error: 'Too Many Requests',
          message: 'Too many attempts. Please try again later.',
          retryAfter: Math.ceil((clientAttempts.firstAttempt + windowMs - now) / 1000)
        });
      }

      clientAttempts.count++;
      next();
    };
  }

  /**
   * Verify email middleware (checks if user's email is verified)
   */
  static requireEmailVerification(req, res, next) {
    // For stores
    if (req.storeData && !req.storeData.email_verified) {
      return res.status(403).json({
        success: false,
        error: 'Email Verification Required',
        message: 'Please verify your email address to access this feature'
      });
    }

    // For producers
    if (req.producerData && !req.producerData.email_verified) {
      return res.status(403).json({
        success: false,
        error: 'Email Verification Required',
        message: 'Please verify your email address to access this feature'
      });
    }

    next();
  }

  /**
   * Generate JWT token helper function
   */
  static generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, process.env.JWT_SECRET || 'helatrade_jwt_secret', { expiresIn });
  }

  /**
   * Verify token helper function
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'helatrade_jwt_secret');
    } catch (error) {
      return null;
    }
  }
}

module.exports = AuthMiddleware;