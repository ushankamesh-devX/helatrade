const { query, transaction } = require('../config/database');

class Post {
  constructor(postData, images = []) {
    this.id = postData.id;
    this.producer_id = postData.producer_id;
    this.content = postData.content;
    this.category_id = postData.category_id;
    this.status = postData.status || 'published';
    this.is_trending = postData.is_trending || false;
    this.is_featured = postData.is_featured || false;
    this.total_views = postData.total_views || 0;
    this.total_likes = postData.total_likes || 0;
    this.total_comments = postData.total_comments || 0;
    this.total_shares = postData.total_shares || 0;
    this.popularity_score = postData.popularity_score || 0;
    this.created_at = postData.created_at;
    this.updated_at = postData.updated_at;

    // Images will be loaded separately
    this.images = images;
  }

  // Create a new post
  static async create(postData) {
    const {
      producer_id,
      content,
      category_id,
      status = 'published',
      images = []
    } = postData;

    // Validate required fields
    if (!producer_id || !content) {
      throw new Error('Producer ID and content are required');
    }

    try {
      // Start transaction
      const queries = [];

      // Insert post
      queries.push({
        sql: `INSERT INTO posts
              (producer_id, content, category_id, status, created_at, updated_at)
              VALUES (?, ?, ?, ?, NOW(), NOW())`,
        params: [producer_id, content, category_id || null, status]
      });

      // Execute transaction to get post ID
      const [postResult] = await transaction(queries);
      const postId = postResult.insertId;

      // Add images if provided
      if (images && images.length > 0) {
        const imageQueries = images.map((image, index) => ({
          sql: `INSERT INTO post_images
                (post_id, image_url, alt_text, display_order, created_at)
                VALUES (?, ?, ?, ?, NOW())`,
          params: [postId, image.image_url, image.alt_text || null, image.display_order || index]
        }));

        await transaction(imageQueries);
      }

      // Return the created post
      return await Post.findById(postId);
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  // Find post by ID
  static async findById(postId) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;

    const results = await query(sql, [postId]);

    if (results.length === 0) {
      return null;
    }

    const postData = results[0];
    const images = await Post.getPostImages(postId);

    return new Post(postData, images);
  }

  // Find posts by producer ID
  static async findByProducerId(producerId, filters = {}) {
    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.producer_id = ?
    `;

    const params = [producerId];
    const conditions = [];

    // Apply filters
    if (filters.status) {
      conditions.push('p.status = ?');
      params.push(filters.status);
    }

    if (filters.category_id) {
      conditions.push('p.category_id = ?');
      params.push(filters.category_id);
    }

    if (filters.is_featured !== undefined) {
      conditions.push('p.is_featured = ?');
      params.push(filters.is_featured);
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ');
    }

    // Apply ordering
    const orderBy = filters.orderBy || 'created_at';
    const orderDirection = filters.orderDirection || 'DESC';
    sql += ` ORDER BY p.${orderBy} ${orderDirection}`;

    // Apply pagination
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(filters.limit));

      if (filters.offset) {
        sql += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    const results = await query(sql, params);

    // Get images for each post
    const posts = [];
    for (const postData of results) {
      const images = await Post.getPostImages(postData.id);
      posts.push(new Post(postData, images));
    }

    return posts;
  }

  // Get all posts with filters
  static async getAll(filters = {}) {
    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug,
             pr.business_name, pr.avatar as producer_avatar
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN producers pr ON p.producer_id = pr.id
      WHERE p.status = 'published'
    `;

    const params = [];
    const conditions = [];

    // Apply filters
    if (filters.producer_id) {
      conditions.push('p.producer_id = ?');
      params.push(filters.producer_id);
    }

    if (filters.category_id) {
      conditions.push('p.category_id = ?');
      params.push(filters.category_id);
    }

    if (filters.is_featured !== undefined) {
      conditions.push('p.is_featured = ?');
      params.push(filters.is_featured);
    }

    if (filters.is_trending !== undefined) {
      conditions.push('p.is_trending = ?');
      params.push(filters.is_trending);
    }

    if (filters.search) {
      conditions.push('p.content LIKE ?');
      params.push(`%${filters.search}%`);
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ');
    }

    // Apply ordering
    const orderBy = filters.orderBy || 'created_at';
    const orderDirection = filters.orderDirection || 'DESC';
    sql += ` ORDER BY p.${orderBy} ${orderDirection}`;

    // Apply pagination
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(filters.limit));

      if (filters.offset) {
        sql += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    const results = await query(sql, params);

    // Get images for each post
    const posts = [];
    for (const postData of results) {
      const images = await Post.getPostImages(postData.id);
      posts.push(new Post(postData, images));
    }

    return posts;
  }

  // Get post images
  static async getPostImages(postId) {
    const sql = `
      SELECT id, post_id, image_url, alt_text, display_order, created_at
      FROM post_images
      WHERE post_id = ?
      ORDER BY display_order, created_at
    `;

    return await query(sql, [postId]);
  }

  // Update post
  async update(updateData) {
    const allowedFields = [
      'content', 'category_id', 'status', 'is_trending', 'is_featured'
    ];

    const updates = {};
    const params = [];

    // Build update query
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updates[field] = updateData[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new Error('No valid fields to update');
    }

    const updateFields = Object.keys(updates).map(field => `${field} = ?`);
    const updateValues = Object.values(updates);
    updateValues.push(this.id);

    const sql = `UPDATE posts SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`;

    await query(sql, updateValues);

    // Refresh post data
    const updatedPost = await Post.findById(this.id);
    Object.assign(this, updatedPost);

    return this;
  }

  // Delete post
  async delete() {
    try {
      // Start transaction to delete post and related data
      const queries = [
        // Delete post images first (foreign key constraint)
        {
          sql: 'DELETE FROM post_images WHERE post_id = ?',
          params: [this.id]
        },
        // Delete post likes
        {
          sql: 'DELETE FROM post_likes WHERE post_id = ?',
          params: [this.id]
        },
        // Delete post comments
        {
          sql: 'DELETE FROM post_comments WHERE post_id = ?',
          params: [this.id]
        },
        // Delete the post
        {
          sql: 'DELETE FROM posts WHERE id = ?',
          params: [this.id]
        }
      ];

      await transaction(queries);

      return true;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }

  // Add images to post
  async addImages(images) {
    if (!images || images.length === 0) {
      return;
    }

    const imageQueries = images.map((image, index) => ({
      sql: `INSERT INTO post_images
            (post_id, image_url, alt_text, display_order, created_at)
            VALUES (?, ?, ?, ?, NOW())`,
      params: [
        this.id,
        image.image_url,
        image.alt_text || null,
        image.display_order || (this.images.length + index)
      ]
    }));

    await transaction(imageQueries);

    // Refresh images
    this.images = await Post.getPostImages(this.id);
  }

  // Remove image from post
  async removeImage(imageId) {
    const sql = 'DELETE FROM post_images WHERE id = ? AND post_id = ?';
    await query(sql, [imageId, this.id]);

    // Refresh images
    this.images = await Post.getPostImages(this.id);
  }

  // Update post images (replace all)
  async updateImages(images) {
    try {
      const queries = [
        // Delete existing images
        {
          sql: 'DELETE FROM post_images WHERE post_id = ?',
          params: [this.id]
        }
      ];

      // Add new images
      if (images && images.length > 0) {
        const imageQueries = images.map((image, index) => ({
          sql: `INSERT INTO post_images
                (post_id, image_url, alt_text, display_order, created_at)
                VALUES (?, ?, ?, ?, NOW())`,
          params: [this.id, image.image_url, image.alt_text || null, image.display_order || index]
        }));
        queries.push(...imageQueries);
      }

      await transaction(queries);

      // Refresh images
      this.images = await Post.getPostImages(this.id);
    } catch (error) {
      throw new Error(`Failed to update post images: ${error.message}`);
    }
  }

  // Increment view count
  async incrementViews() {
    const sql = 'UPDATE posts SET total_views = total_views + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.total_views = (this.total_views || 0) + 1;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      producer_id: this.producer_id,
      content: this.content,
      category_id: this.category_id,
      category_name: this.category_name,
      category_slug: this.category_slug,
      status: this.status,
      is_trending: this.is_trending,
      is_featured: this.is_featured,
      total_views: this.total_views,
      total_likes: this.total_likes,
      total_comments: this.total_comments,
      total_shares: this.total_shares,
      popularity_score: this.popularity_score,
      created_at: this.created_at,
      updated_at: this.updated_at,
      images: this.images
    };
  }
}

module.exports = Post;