const { body, param, query, validationResult } = require('express-validator');
const validator = require('validator');

// Custom validation functions
const isValidPhoneNumber = (value) => {
  // Sri Lankan phone number pattern
  const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
  return phoneRegex.test(value.replace(/\s/g, ''));
};

const isValidSriLankanLocation = (value) => {
  // Common Sri Lankan locations validation
  const locationRegex = /^[a-zA-Z\s,.-]+$/;
  return locationRegex.test(value);
};

const isValidYear = (value) => {
  const year = parseInt(value);
  const currentYear = new Date().getFullYear();
  return year >= 1800 && year <= currentYear;
};

// =============================================================================
// CATEGORY VALIDATIONS
// =============================================================================

// Validation rules for creating a category
const validateCreateCategory = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s&\-,.()]+$/)
    .withMessage('Category name contains invalid characters'),
  
  body('icon')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Icon must be maximum 10 characters'),
    
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean value')
];

// Validation rules for updating a category
const validateUpdateCategory = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s&\-,.()]+$/)
    .withMessage('Category name contains invalid characters'),
  
  body('icon')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Icon must be maximum 10 characters'),
    
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean value')
];

// =============================================================================
// PRODUCER VALIDATIONS
// =============================================================================

// Base producer validation rules (shared between create and update)
const baseProducerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Producer name must be between 2 and 255 characters')
    .matches(/^[a-zA-Z0-9\s&\-,.()'"]+$/)
    .withMessage('Producer name contains invalid characters'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Bio must not exceed 2000 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters')
    .custom(isValidSriLankanLocation)
    .withMessage('Please enter a valid Sri Lankan location'),
  
  body('avatar')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('Avatar must not exceed 10 characters'),
  
  body('businessType')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Business type must not exceed 100 characters'),
  
  body('foundedYear')
    .optional()
    .custom(isValidYear)
    .withMessage('Founded year must be a valid year between 1800 and current year'),
  
  // Contact Information
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  
  body('phone')
    .optional()
    .trim()
    .custom(isValidPhoneNumber)
    .withMessage('Must be a valid Sri Lankan phone number'),
  
  body('website')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: false })
    .withMessage('Must be a valid website URL'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  
  // Social Media URLs
  body('socialMedia.facebook')
    .optional()
    .isURL()
    .withMessage('Facebook URL must be valid')
    .custom(value => {
      if (value && !value.includes('facebook.com')) {
        throw new Error('Facebook URL must be from facebook.com domain');
      }
      return true;
    }),
  
  body('socialMedia.instagram')
    .optional()
    .isURL()
    .withMessage('Instagram URL must be valid')
    .custom(value => {
      if (value && !value.includes('instagram.com')) {
        throw new Error('Instagram URL must be from instagram.com domain');
      }
      return true;
    }),
  
  body('socialMedia.twitter')
    .optional()
    .isURL()
    .withMessage('Twitter URL must be valid')
    .custom(value => {
      if (value && !(value.includes('twitter.com') || value.includes('x.com'))) {
        throw new Error('Twitter URL must be from twitter.com or x.com domain');
      }
      return true;
    }),
  
  body('socialMedia.linkedin')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be valid')
    .custom(value => {
      if (value && !value.includes('linkedin.com')) {
        throw new Error('LinkedIn URL must be from linkedin.com domain');
      }
      return true;
    }),
  
  body('socialMedia.youtube')
    .optional()
    .isURL()
    .withMessage('YouTube URL must be valid')
    .custom(value => {
      if (value && !value.includes('youtube.com')) {
        throw new Error('YouTube URL must be from youtube.com domain');
      }
      return true;
    }),
  
  // Arrays validation
  body('categories')
    .optional()
    .isArray({ min: 0, max: 10 })
    .withMessage('Categories must be an array with maximum 10 items'),
  
  body('categories.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Each category must be a valid category ID'),
  
  body('specialties')
    .optional()
    .isArray({ min: 0, max: 20 })
    .withMessage('Specialties must be an array with maximum 20 items'),
  
  body('specialties.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Each specialty must be between 1 and 100 characters'),
  
  body('certifications')
    .optional()
    .isArray({ min: 0, max: 15 })
    .withMessage('Certifications must be an array with maximum 15 items'),
  
  body('certifications.*')
    .optional()
    .custom((cert) => {
      if (typeof cert === 'string') {
        if (cert.length < 1 || cert.length > 255) {
          throw new Error('Certification name must be between 1 and 255 characters');
        }
      } else if (typeof cert === 'object') {
        if (!cert.name || cert.name.length < 1 || cert.name.length > 255) {
          throw new Error('Certification name is required and must be between 1 and 255 characters');
        }
        if (cert.issuedBy && cert.issuedBy.length > 255) {
          throw new Error('Certification issuer must not exceed 255 characters');
        }
        if (cert.certificateUrl && !validator.isURL(cert.certificateUrl)) {
          throw new Error('Certificate URL must be valid');
        }
      }
      return true;
    }),
  
  body('languages')
    .optional()
    .isArray({ min: 0, max: 10 })
    .withMessage('Languages must be an array with maximum 10 items'),
  
  body('languages.*.language')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Language name must be between 1 and 50 characters'),
  
  body('languages.*.proficiency')
    .optional()
    .isIn(['basic', 'intermediate', 'advanced', 'native'])
    .withMessage('Language proficiency must be basic, intermediate, advanced, or native'),
  
  // Business Hours Validation
  body('businessHours')
    .optional()
    .isObject()
    .withMessage('Business hours must be an object'),
  
  body('businessHours.monday')
    .optional()
    .isObject()
    .withMessage('Monday business hours must be an object'),
  
  body('businessHours.*.isOpen')
    .optional()
    .isBoolean()
    .withMessage('isOpen must be a boolean value'),
  
  body('businessHours.*.openTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Open time must be in HH:MM format'),
  
  body('businessHours.*.closeTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Close time must be in HH:MM format')
];

// Validation rules for creating a producer
const validateCreateProducer = [
  body('name')
    .notEmpty()
    .withMessage('Producer name is required'),
  
  ...baseProducerValidation
];

// Validation rules for updating a producer
const validateUpdateProducer = [
  param('id')
    .isUUID()
    .withMessage('Producer ID must be a valid UUID'),
  
  ...baseProducerValidation.map(validation => validation.optional())
];

// =============================================================================
// PARAMETER VALIDATIONS
// =============================================================================

// Validation for ID parameters
const validateProducerIdParam = [
  param('identifier')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Producer identifier is required')
    .custom(value => {
      // Check if it's either a UUID or a valid slug
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
      const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
      
      if (!isUUID && !isSlug) {
        throw new Error('Producer identifier must be a valid UUID or slug');
      }
      return true;
    })
];

const validateUUIDParam = [
  param('id')
    .isUUID()
    .withMessage('ID must be a valid UUID')
];

// =============================================================================
// QUERY PARAMETER VALIDATIONS
// =============================================================================

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// Search and filter validation
const validateProducerFilters = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  query('category')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category filter must be between 1 and 100 characters'),
  
  query('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location filter must be between 1 and 100 characters'),
  
  query('verified')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Verified filter must be true or false'),
  
  query('sort')
    .optional()
    .isIn(['name', 'rating', 'connections_count', 'created_at', 'updated_at'])
    .withMessage('Sort field must be one of: name, rating, connections_count, created_at, updated_at'),
  
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc')
];

// Statistics validation
const validateProducerStats = [
  body('connections_count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Connections count must be a non-negative integer'),
  
  body('likes_count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Likes count must be a non-negative integer'),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  
  body('total_orders')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total orders must be a non-negative integer')
];

// Contact producer validation
const validateContactProducer = [
  param('id')
    .isUUID()
    .withMessage('Producer ID must be a valid UUID'),
  
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('contactMethod')
    .optional()
    .isIn(['email', 'phone'])
    .withMessage('Contact method must be email or phone'),
  
  body('productId')
    .optional()
    .isUUID()
    .withMessage('Product ID must be a valid UUID')
];

// =============================================================================
// VALIDATION RESULT HANDLER
// =============================================================================

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid input data provided',
      details: errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

module.exports = {
  // Category validations
  validateCreateCategory,
  validateUpdateCategory,
  
  // Producer validations
  validateCreateProducer,
  validateUpdateProducer,
  
  // Parameter validations
  validateProducerIdParam,
  validateUUIDParam,
  
  // Query validations
  validatePagination,
  validateProducerFilters,
  validateProducerStats,
  validateContactProducer,
  
  // Validation handler
  handleValidationErrors,
  
  // Custom validators (for reuse)
  customValidators: {
    isValidPhoneNumber,
    isValidSriLankanLocation,
    isValidYear
  }
};