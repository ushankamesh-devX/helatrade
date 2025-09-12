const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { 
  validateCreateCategory, 
  validateUpdateCategory,
  handleValidationErrors 
} = require('../middleware/validation');

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', categoryController.getCategoryById);

// GET /api/categories/slug/:slug - Get category by slug
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// POST /api/categories - Create new category
router.post('/', 
  validateCreateCategory, 
  handleValidationErrors,
  categoryController.createCategory
);

// PUT /api/categories/:id - Update category
router.put('/:id', 
  validateUpdateCategory, 
  handleValidationErrors,
  categoryController.updateCategory
);

// DELETE /api/categories/:id - Delete category (soft delete)
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;