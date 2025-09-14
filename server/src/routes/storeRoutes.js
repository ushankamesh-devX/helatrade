const express = require('express');
const { body, param, query } = require('express-validator');
const StoreController = require('../controllers/storeController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Validation rules for store registration
const registerValidation = [
  body('ownerName')
    .notEmpty()
    .withMessage('Owner name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Owner name must be between 2 and 255 characters')
    .trim()
    .escape(),
  
  body('storeName')
    .notEmpty()
    .withMessage('Store name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Store name must be between 2 and 255 characters')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('businessType')
    .isIn(['retail', 'wholesale', 'restaurant', 'export', 'processing', 'online'])
    .withMessage('Invalid business type'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('Invalid website URL'),
  
  body('location.province')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Province must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('location.district')
    .optional()
    .isLength({ max: 100 })
    .withMessage('District must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('location.city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('location.address')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters')
    .trim()
    .escape(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('businessFocus')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Business focus must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('interestedCategories')
    .optional()
    .isArray()
    .withMessage('Interested categories must be an array'),
  
  body('interestedCategories.*')
    .isInt()
    .withMessage('Each category ID must be an integer')
];

// Validation rules for store login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for profile update
const profileUpdateValidation = [
  body('ownerName')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Owner name must be between 2 and 255 characters')
    .trim()
    .escape(),
  
  body('storeName')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Store name must be between 2 and 255 characters')
    .trim()
    .escape(),
  
  body('storeDescription')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Store description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('businessType')
    .optional()
    .isIn(['retail', 'wholesale', 'restaurant', 'export', 'processing', 'online'])
    .withMessage('Invalid business type'),
  
  body('storeSize')
    .optional()
    .isIn(['small', 'medium', 'large'])
    .withMessage('Invalid store size'),
  
  body('establishedYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Invalid established year'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('Invalid website URL'),
  
  body('location.province')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Province must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('location.district')
    .optional()
    .isLength({ max: 100 })
    .withMessage('District must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('location.city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('socialMedia.facebook')
    .optional()
    .isURL()
    .withMessage('Invalid Facebook URL'),
  
  body('socialMedia.instagram')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Instagram handle must not exceed 255 characters'),
  
  body('socialMedia.whatsapp')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid WhatsApp number format')
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

// Validation for connection updates
const connectionUpdateValidation = [
  param('producerId')
    .isUUID()
    .withMessage('Invalid producer ID format'),
  
  body('status')
    .optional()
    .isIn(['pending', 'accepted', 'blocked', 'rejected'])
    .withMessage('Invalid connection status'),
  
  body('connectionType')
    .optional()
    .isIn(['regular', 'preferred', 'exclusive'])
    .withMessage('Invalid connection type')
];

// Common query validation
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  
  query('search')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Search term must not exceed 255 characters')
    .trim()
    .escape()
];

// Routes

/**
 * @route   POST /api/stores/register
 * @desc    Register a new store
 * @access  Public
 */
router.post('/register', registerValidation, StoreController.register);

/**
 * @route   POST /api/stores/login
 * @desc    Store login
 * @access  Public
 */
router.post('/login', loginValidation, StoreController.login);

/**
 * @route   GET /api/stores/profile
 * @desc    Get store profile
 * @access  Private (Store)
 */
router.get('/profile', authMiddleware.authenticateStore, StoreController.getProfile);

/**
 * @route   PUT /api/stores/profile
 * @desc    Update store profile
 * @access  Private (Store)
 */
router.put('/profile', authMiddleware.authenticateStore, profileUpdateValidation, StoreController.updateProfile);

/**
 * @route   PUT /api/stores/password
 * @desc    Update store password
 * @access  Private (Store)
 */
router.put('/password', authMiddleware.authenticateStore, passwordUpdateValidation, StoreController.updatePassword);

/**
 * @route   GET /api/stores
 * @desc    Get all stores with filtering
 * @access  Public
 */
router.get('/', paginationValidation, StoreController.getAll);

/**
 * @route   GET /api/stores/search
 * @desc    Search stores
 * @access  Public
 */
router.get('/search', paginationValidation, StoreController.search);

/**
 * @route   GET /api/stores/featured
 * @desc    Get featured stores
 * @access  Public
 */
router.get('/featured', [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
], StoreController.getFeatured);

/**
 * @route   GET /api/stores/:identifier
 * @desc    Get store by ID or slug
 * @access  Public
 */
router.get('/:identifier', [
  param('identifier')
    .notEmpty()
    .withMessage('Store identifier is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Invalid identifier format')
], StoreController.getById);

/**
 * @route   GET /api/stores/connections
 * @desc    Get store connections with producers
 * @access  Private (Store)
 */
router.get('/connections', authMiddleware.authenticateStore, [
  query('status')
    .optional()
    .isIn(['pending', 'accepted', 'blocked', 'rejected'])
    .withMessage('Invalid connection status'),
  ...paginationValidation
], StoreController.getConnections);

/**
 * @route   POST /api/stores/connections/:producerId
 * @desc    Connect with a producer
 * @access  Private (Store)
 */
router.post('/connections/:producerId', authMiddleware.authenticateStore, [
  param('producerId')
    .isUUID()
    .withMessage('Invalid producer ID format'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters')
    .trim()
    .escape()
], StoreController.connectWithProducer);

/**
 * @route   PUT /api/stores/connections/:producerId
 * @desc    Update connection with producer
 * @access  Private (Store)
 */
router.put('/connections/:producerId', authMiddleware.authenticateStore, connectionUpdateValidation, StoreController.updateConnection);

/**
 * @route   DELETE /api/stores/connections/:producerId
 * @desc    Remove connection with producer
 * @access  Private (Store)
 */
router.delete('/connections/:producerId', authMiddleware.authenticateStore, [
  param('producerId')
    .isUUID()
    .withMessage('Invalid producer ID format')
], StoreController.removeConnection);

/**
 * @route   POST /api/stores/verify-email
 * @desc    Verify store email
 * @access  Private (Store)
 */
router.post('/verify-email', authMiddleware.authenticateStore, StoreController.verifyEmail);

/**
 * @route   GET /api/stores/dashboard/stats
 * @desc    Get store dashboard statistics
 * @access  Private (Store)
 */
router.get('/dashboard/stats', authMiddleware.authenticateStore, StoreController.getDashboardStats);

/**
 * @route   DELETE /api/stores/account
 * @desc    Delete store account
 * @access  Private (Store)
 */
router.delete('/account', authMiddleware.authenticateStore, StoreController.deleteAccount);

module.exports = router;