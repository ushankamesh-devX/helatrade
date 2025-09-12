const { executeQuery, getOne } = require('../config/database');
const slugify = require('slugify');

class Category {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.icon = data.icon;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Get all categories
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM categories';
    const params = [];
    const conditions = [];

    // Apply filters
    if (filters.active !== undefined) {
      conditions.push('is_active = ?');
      params.push(filters.active);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY name ASC';

    // Apply pagination
    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
      
      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    try {
      const rows = await executeQuery(query, params);
      return rows.map(row => new Category(row));
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  // Get category by ID
  static async getById(id) {
    try {
      const query = 'SELECT * FROM categories WHERE id = ?';
      const row = await getOne(query, [id]);
      return row ? new Category(row) : null;
    } catch (error) {
      throw new Error(`Failed to fetch category: ${error.message}`);
    }
  }

  // Get category by slug
  static async getBySlug(slug) {
    try {
      const query = 'SELECT * FROM categories WHERE slug = ?';
      const row = await getOne(query, [slug]);
      return row ? new Category(row) : null;
    } catch (error) {
      throw new Error(`Failed to fetch category: ${error.message}`);
    }
  }

  // Create new category
  static async create(data) {
    try {
      // Generate slug from name
      const slug = slugify(data.name, { lower: true, strict: true });
      
      // Check if name or slug already exists
      const existingName = await getOne('SELECT id FROM categories WHERE name = ?', [data.name]);
      if (existingName) {
        throw new Error('Category name already exists');
      }

      const existingSlug = await getOne('SELECT id FROM categories WHERE slug = ?', [slug]);
      if (existingSlug) {
        throw new Error('Category slug already exists');
      }

      const query = `
        INSERT INTO categories (name, slug, icon, is_active) 
        VALUES (?, ?, ?, ?)
      `;
      const params = [
        data.name,
        slug,
        data.icon || null,
        data.is_active !== undefined ? data.is_active : true
      ];

      const result = await executeQuery(query, params);
      return await Category.getById(result.insertId);
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  // Update category
  static async update(id, data) {
    try {
      const category = await Category.getById(id);
      if (!category) {
        throw new Error('Category not found');
      }

      const updates = [];
      const params = [];

      if (data.name) {
        // Check if new name already exists (excluding current category)
        const existingName = await getOne(
          'SELECT id FROM categories WHERE name = ? AND id != ?', 
          [data.name, id]
        );
        if (existingName) {
          throw new Error('Category name already exists');
        }

        const newSlug = slugify(data.name, { lower: true, strict: true });
        updates.push('name = ?', 'slug = ?');
        params.push(data.name, newSlug);
      }

      if (data.icon !== undefined) {
        updates.push('icon = ?');
        params.push(data.icon);
      }

      if (data.is_active !== undefined) {
        updates.push('is_active = ?');
        params.push(data.is_active);
      }

      if (updates.length === 0) {
        return category;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      params.push(id);

      const query = `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`;
      await executeQuery(query, params);

      return await Category.getById(id);
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  // Delete category (soft delete)
  static async delete(id) {
    try {
      const category = await Category.getById(id);
      if (!category) {
        throw new Error('Category not found');
      }

      const query = 'UPDATE categories SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  // Get total count
  static async getCount(filters = {}) {
    let query = 'SELECT COUNT(*) as total FROM categories';
    const params = [];
    const conditions = [];

    if (filters.active !== undefined) {
      conditions.push('is_active = ?');
      params.push(filters.active);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    try {
      const result = await getOne(query, params);
      return result.total;
    } catch (error) {
      throw new Error(`Failed to get category count: ${error.message}`);
    }
  }
}

module.exports = Category;