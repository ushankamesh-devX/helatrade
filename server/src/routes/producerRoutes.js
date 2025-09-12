const express = require('express');
const router = express.Router();
const ProducerController = require('../controllers/producerController');
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

// Producer CRUD routes

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
 * @desc    Create new producer
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
  requireAuth,
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
  requireAuth,
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