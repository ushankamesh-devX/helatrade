const express = require('express');
const Post = require('../models/Post');
const Producer = require('../models/Producer');
const {
  validatePostCreate,
  validatePostUpdate,
  validatePostImagesUpdate
} = require('../middleware/validation');
const {
  authenticateToken,
  requireProducer,
  optionalAuth
} = require('../middleware/auth');

const router = express.Router();

// Get all posts (public with filtering)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      producer_id,
      category_id,
      is_featured,
      is_trending,
      search,
      orderBy = 'created_at',
      orderDirection = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const filters = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      orderBy,
      orderDirection
    };

    // Apply filters
    if (producer_id) filters.producer_id = parseInt(producer_id);
    if (category_id) filters.category_id = parseInt(category_id);
    if (is_featured !== undefined) filters.is_featured = is_featured === 'true';
    if (is_trending !== undefined) filters.is_trending = is_trending === 'true';
    if (search) filters.search = search;

    const posts = await Post.getAll(filters);

    res.json({
      success: true,
      message: 'Posts retrieved successfully',
      data: {
        posts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: posts.length
        }
      }
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get post by ID (public)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count if not the owner viewing
    if (req.user) {
      try {
        const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);
        if (post.producer_id !== userProducerId) {
          await post.incrementViews();
        }
      } catch (error) {
        // If user doesn't have a producer profile, still increment views
        await post.incrementViews();
      }
    } else {
      // Anonymous user viewing
      await post.incrementViews();
    }

    res.json({
      success: true,
      message: 'Post retrieved successfully',
      data: { post: post.toJSON() }
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get posts by producer (public)
router.get('/producer/:producerId', optionalAuth, async (req, res) => {
  try {
    const { producerId } = req.params;
    const {
      page = 1,
      limit = 20,
      status = 'published',
      orderBy = 'created_at',
      orderDirection = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const filters = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      orderBy,
      orderDirection
    };

    if (status) filters.status = status;

    const posts = await Post.findByProducerId(producerId, filters);

    res.json({
      success: true,
      message: 'Producer posts retrieved successfully',
      data: {
        posts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: posts.length
        }
      }
    });
  } catch (error) {
    console.error('Get producer posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve producer posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Create new post (producer only)
router.post('/', authenticateToken, requireProducer, validatePostCreate, async (req, res) => {
  try {
    // Get the producer ID from the user ID
    const producerId = await Producer.getProducerIdFromUserId(req.user.id);
    
    const postData = {
      producer_id: producerId, // Use the actual producer ID from producers table
      content: req.body.content,
      category_id: req.body.category_id,
      status: req.body.status || 'published',
      images: req.body.images || []
    };

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post: post.toJSON() }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update post (producer only, own posts)
router.put('/:id', authenticateToken, requireProducer, validatePostUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    // Check if user owns this post
    if (post.producer_id !== userProducerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own posts'
      });
    }

    await post.update(req.body);

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: { post: post.toJSON() }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete post (producer only, own posts)
router.delete('/:id', authenticateToken, requireProducer, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    // Check if user owns this post
    if (post.producer_id !== userProducerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own posts'
      });
    }

    await post.delete();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Bulk delete posts (producer only, own posts)
router.delete('/', authenticateToken, requireProducer, async (req, res) => {
  try {
    const { postIds } = req.body;

    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Post IDs array is required'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    const results = [];
    const errors = [];

    // Process each post ID
    for (const postId of postIds) {
      try {
        const post = await Post.findById(postId);

        if (!post) {
          errors.push({ postId, error: 'Post not found' });
          continue;
        }

        // Check if user owns this post
        if (post.producer_id !== userProducerId) {
          errors.push({ postId, error: 'You can only delete your own posts' });
          continue;
        }

        await post.delete();
        results.push({ postId, success: true });
      } catch (error) {
        errors.push({ postId, error: error.message });
      }
    }

    const successCount = results.length;
    const errorCount = errors.length;

    res.json({
      success: errorCount === 0,
      message: `Deleted ${successCount} post(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      data: {
        results,
        errors: errorCount > 0 ? errors : undefined
      }
    });
  } catch (error) {
    console.error('Bulk delete posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get post images
router.get('/:id/images', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Post images retrieved successfully',
      data: { images: post.images }
    });
  } catch (error) {
    console.error('Get post images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve post images',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Add images to post (producer only, own posts)
router.post('/:id/images', authenticateToken, requireProducer, validatePostImagesUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    // Check if user owns this post
    if (post.producer_id !== userProducerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify images for your own posts'
      });
    }

    await post.addImages(req.body.images);

    res.status(201).json({
      success: true,
      message: 'Images added successfully',
      data: { images: post.images }
    });
  } catch (error) {
    console.error('Add post images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add images',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update post images (replace all) (producer only, own posts)
router.put('/:id/images', authenticateToken, requireProducer, validatePostImagesUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    // Check if user owns this post
    if (post.producer_id !== userProducerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify images for your own posts'
      });
    }

    await post.updateImages(req.body.images);

    res.json({
      success: true,
      message: 'Images updated successfully',
      data: { images: post.images }
    });
  } catch (error) {
    console.error('Update post images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update images',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Remove image from post (producer only, own posts)
router.delete('/:id/images/:imageId', authenticateToken, requireProducer, async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Get the producer ID for the current user
    const userProducerId = await Producer.getProducerIdFromUserId(req.user.id);

    // Check if user owns this post
    if (post.producer_id !== userProducerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify images for your own posts'
      });
    }

    // Check if image exists in post
    const imageExists = post.images.some(img => img.id == imageId);
    if (!imageExists) {
      return res.status(404).json({
        success: false,
        message: 'Image not found in this post'
      });
    }

    await post.removeImage(imageId);

    res.json({
      success: true,
      message: 'Image removed successfully'
    });
  } catch (error) {
    console.error('Remove post image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove image',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;