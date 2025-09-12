const { body } = require('express-validator');

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

module.exports = {
  validateCreateCategory,
  validateUpdateCategory
};