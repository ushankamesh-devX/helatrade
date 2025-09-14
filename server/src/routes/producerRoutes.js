const express = require('express');
const router = express.Router();
const ProducerController = require('../controllers/producerController');
const AuthMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const {
  validateCreateProducer,
  validateUpdateProducer,
  validateProducerIdParam,
  validatePagination,
  validateProducerFilters,
  validateProducerStats,
  validateContactProducer,
  handleValidationErrors
} = require('../middleware/validation');

// Middleware for authentication (placeholder - implement based on your auth system)
const requireAuth = (req, res, next) => {
  // TODO: Implement authentication middleware
  // For now, we'll skip authentication
  next();
};

const requireAdmin = (req, res, next) => {
  // TODO: Implement admin authorization middleware
  next();
};

// Validation rules for producer registration
const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Producer name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Producer name must be between 2 and 255 characters')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('location')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters')
    .trim()
    .escape(),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),
  
  body('businessType')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Business type must not exceed 100 characters')
    .trim()
    .escape()
];

// Validation rules for producer login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for password update
const passwordUpdateValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

// Producer CRUD routes

// Authentication routes (must come first to avoid conflicts with /:identifier)

/**
 * @route   POST /api/producers/register
 * @desc    Register a new producer
 * @access  Public
 */
router.post('/register',
  registerValidation,
  handleValidationErrors,
  ProducerController.register
);

/**
 * @route   POST /api/producers/login
 * @desc    Producer login
 * @access  Public
 */
router.post('/login',
  loginValidation,
  handleValidationErrors,
  ProducerController.login
);

/**
 * @route   PUT /api/producers/password
 * @desc    Update producer password
 * @access  Private (Producer)
 */
router.put('/password',
  AuthMiddleware.authenticateProducer,
  passwordUpdateValidation,
  handleValidationErrors,
  ProducerController.updatePassword
);

// Public routes

/**
 * @route   GET /api/producers
 * @desc    Get all producers with filtering and pagination
 * @access  Public
 */
router.get('/', 
  validatePagination,
  validateProducerFilters,
  handleValidationErrors,
  ProducerController.getAll
);

/**
 * @route   GET /api/producers/search
 * @desc    Search producers
 * @access  Public
 * @note    This route must come before /:identifier to avoid conflicts
 */
router.get('/search',
  validatePagination,
  validateProducerFilters,
  handleValidationErrors,
  ProducerController.search
);

/**
 * @route   GET /api/producers/featured
 * @desc    Get featured producers
 * @access  Public
 */
router.get('/featured',
  validatePagination,
  handleValidationErrors,
  ProducerController.getFeatured
);

/**
 * @route   GET /api/producers/:identifier
 * @desc    Get producer by ID or slug
 * @access  Public
 */
router.get('/:identifier',
  validateProducerIdParam,
  handleValidationErrors,
  ProducerController.getById
);

/**
 * @route   POST /api/producers
 * @desc    Create new producer (legacy endpoint - use /register instead)
 * @access  Private (Authenticated users)
 */
router.post('/',
  requireAuth,
  validateCreateProducer,
  handleValidationErrors,
  ProducerController.create
);

/**
 * @route   PUT /api/producers/:id
 * @desc    Update producer
 * @access  Private (Producer owner or Admin)
 */
router.put('/:id',
  AuthMiddleware.authenticateProducer,
  validateUpdateProducer,
  handleValidationErrors,
  ProducerController.update
);

/**
 * @route   DELETE /api/producers/:id
 * @desc    Delete producer (soft delete)
 * @access  Private (Producer owner or Admin)
 */
router.delete('/:id',
  AuthMiddleware.authenticateProducer,
  validateUpdateProducer, // Using update validation for ID validation
  handleValidationErrors,
  ProducerController.delete
);

/**
 * @route   GET /api/producers/:id/similar
 * @desc    Get similar producers
 * @access  Public
 */
router.get('/:id/similar',
  validateProducerIdParam,
  validatePagination,
  handleValidationErrors,
  ProducerController.getSimilar
);

// Producer statistics routes

/**
 * @route   PATCH /api/producers/:id/stats
 * @desc    Update producer statistics
 * @access  Private (System/Admin only)
 */
router.patch('/:id/stats',
  requireAdmin,
  validateProducerStats,
  handleValidationErrors,
  ProducerController.updateStats
);

// Error handling middleware specific to producer routes
router.use((error, req, res, next) => {
  console.error('Producer route error:', error);
  
  // Handle specific database errors
  if (error.code === 'ER_NO_SUCH_TABLE') {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Database tables not properly initialized'
    });
  }
  
  if (error.code === 'ER_BAD_FIELD_ERROR') {
    return res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Database schema mismatch'
    });
  }
  
  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      error: 'Validation Error',
      message: error.message,
      details: error.details
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred in producer routes'
  });
});

module.exports = router;