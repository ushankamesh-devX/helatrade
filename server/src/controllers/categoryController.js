const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const filters = {
      active: req.query.active ? req.query.active === 'true' : true,
      limit: req.query.limit ? parseInt(req.query.limit) : null,
      offset: req.query.offset ? parseInt(req.query.offset) : null
    };

    const categories = await Category.getAll(filters);
    const total = await Category.getCount({ active: filters.active });

    res.json({
      success: true,
      data: categories,
      meta: {
        total,
        limit: filters.limit || total,
        offset: filters.offset || 0
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid category ID'
      });
    }

    const category = await Category.getById(parseInt(id));
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// Get category by slug
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Slug is required'
      });
    }

    const category = await Category.getBySlug(slug);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// Create category
const createCategory = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid request data',
        details: errors.array().reduce((acc, error) => {
          acc[error.path] = error.msg;
          return acc;
        }, {})
      });
    }

    const categoryData = {
      name: req.body.name,
      icon: req.body.icon,
      is_active: req.body.is_active
    };

    const category = await Category.create(categoryData);

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('Create category error:', error);
    
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid category ID'
      });
    }

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid request data',
        details: errors.array().reduce((acc, error) => {
          acc[error.path] = error.msg;
          return acc;
        }, {})
      });
    }

    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.icon !== undefined) updateData.icon = req.body.icon;
    if (req.body.is_active !== undefined) updateData.is_active = req.body.is_active;

    const category = await Category.update(parseInt(id), updateData);

    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Update category error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: error.message
      });
    }

    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid category ID'
      });
    }

    await Category.delete(parseInt(id));

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};