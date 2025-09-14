const { executeQuery, getOne, executeTransaction } = require('../config/database');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class Producer {
  constructor(data = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.bio = data.bio;
    this.location = data.location;
    this.avatar = data.avatar;
    this.profileImageUrl = data.profile_image_url;
    this.coverImageUrl = data.cover_image_url;
    this.verified = data.verified;
    this.businessType = data.business_type;
    this.foundedYear = data.founded_year;
    this.email = data.email;
    this.passwordHash = data.password_hash;
    this.phone = data.phone;
    this.website = data.website;
    this.address = data.address;
    this.facebookUrl = data.facebook_url;
    this.instagramUrl = data.instagram_url;
    this.twitterUrl = data.twitter_url;
    this.linkedinUrl = data.linkedin_url;
    this.youtubeUrl = data.youtube_url;
    this.connectionsCount = data.connections_count;
    this.likesCount = data.likes_count;
    this.rating = data.rating;
    this.totalOrders = data.total_orders;
    this.status = data.status;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  // Static methods for database operations

  /**
   * Get all producers with optional filtering and pagination
   */
  static async getAll(options = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      location,
      verified,
      sort = 'created_at',
      order = 'desc'
    } = options;

    const offset = (page - 1) * limit;
    let whereConditions = ['p.status = ?'];
    let queryParams = ['active'];

    // Build WHERE conditions
    if (search) {
      whereConditions.push('(p.name LIKE ? OR p.location LIKE ? OR p.bio LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      whereConditions.push('EXISTS (SELECT 1 FROM producer_categories pc JOIN categories c ON pc.category_id = c.id WHERE pc.producer_id = p.id AND c.slug = ?)');
      queryParams.push(category);
    }

    if (location) {
      whereConditions.push('p.location LIKE ?');
      queryParams.push(`%${location}%`);
    }

    if (verified !== undefined) {
      whereConditions.push('p.verified = ?');
      queryParams.push(verified);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Validate sort field
    const allowedSortFields = ['name', 'rating', 'connections_count', 'created_at', 'updated_at'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM producers p 
      ${whereClause}
    `;
    const [countResult] = await executeQuery(countQuery, queryParams);
    const total = countResult.total;

    // Get producers
    const query = `
      SELECT p.*, 
             GROUP_CONCAT(DISTINCT c.name) as categories,
             GROUP_CONCAT(DISTINCT c.slug) as category_slugs
      FROM producers p
      LEFT JOIN producer_categories pc ON p.id = pc.producer_id
      LEFT JOIN categories c ON pc.category_id = c.id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);
    const results = await executeQuery(query, queryParams);

    const producers = await Promise.all(results.map(async row => {
      const producer = new Producer(row);
      producer.categories = row.categories ? row.categories.split(',') : [];
      producer.categorySlug = row.category_slugs ? row.category_slugs.split(',') : [];
      
      // Load related data for each producer
      await Promise.all([
        producer._loadSpecialties(),
        producer._loadCertifications(),
        producer._loadLanguages(),
        producer._loadBusinessHours()
      ]);
      
      return producer;
    }));

    return {
      producers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get producer by ID or slug
   */
  static async getByIdOrSlug(identifier) {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    const field = isUUID ? 'id' : 'slug';
    
    const query = `SELECT * FROM producers WHERE ${field} = ? AND status = 'active'`;
    const producerData = await getOne(query, [identifier]);
    
    if (!producerData) {
      return null;
    }

    const producer = new Producer(producerData);
    
    // Get related data
    await Promise.all([
      producer._loadCategories(),
      producer._loadSpecialties(),
      producer._loadCertifications(),
      producer._loadLanguages(),
      producer._loadBusinessHours()
    ]);

    return producer;
  }

  /**
   * Create a new producer
   */
  static async create(data) {
    const {
      name, bio, location, avatar, businessType, foundedYear,
      email, password, phone, website, address, socialMedia = {},
      contact = {}, // Add contact object support
      categories = [], specialties = [], certifications = [],
      languages = [], businessHours = {}
    } = data;

    // Extract contact information from nested object if provided
    const producerEmail = email || contact.email;
    const producerPhone = phone || contact.phone;
    const producerWebsite = website || contact.website;
    const producerAddress = address || contact.address;

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      const saltRounds = 12;
      passwordHash = await bcrypt.hash(password, saltRounds);
    }

    // Generate UUID for the producer
    const producerId = uuidv4();

    // Generate slug from name
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await this._slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const queries = [
      {
        query: `
          INSERT INTO producers (
            id, slug, name, bio, location, avatar, business_type, founded_year,
            email, password_hash, phone, website, address, facebook_url, instagram_url,
            twitter_url, linkedin_url, youtube_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        params: [
          producerId, slug, name, bio || null, location || null, avatar || null, businessType || null, foundedYear || null,
          producerEmail || null, passwordHash, producerPhone || null, producerWebsite || null, producerAddress || null,
          socialMedia.facebook || null, socialMedia.instagram || null, socialMedia.twitter || null,
          socialMedia.linkedin || null, socialMedia.youtube || null
        ]
      }
    ];

    await executeTransaction(queries);

    // Insert related data
    await Promise.all([
      this._insertCategories(producerId, categories),
      this._insertSpecialties(producerId, specialties),
      this._insertCertifications(producerId, certifications),
      this._insertLanguages(producerId, languages),
      this._insertBusinessHours(producerId, businessHours)
    ]);

    // Return the created producer directly with a manual query to ensure it exists
    const producerData = await getOne('SELECT * FROM producers WHERE id = ?', [producerId]);
    if (!producerData) {
      throw new Error('Producer was not created successfully');
    }

    const producer = new Producer(producerData);
    
    // Load related data
    await Promise.all([
      producer._loadCategories(),
      producer._loadSpecialties(),
      producer._loadCertifications(),
      producer._loadLanguages(),
      producer._loadBusinessHours()
    ]);

    return producer;
  }

  /**
   * Update producer
   */
  static async update(id, data) {
    const {
      name, bio, location, avatar, businessType, foundedYear,
      email, phone, website, address, socialMedia = {},
      categories, specialties, certifications, languages, businessHours
    } = data;

    let slug;
    if (name) {
      const baseSlug = slugify(name, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      // Ensure unique slug (excluding current producer)
      while (await this._slugExists(slug, id)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updateFields = [];
    const updateParams = [];

    // Build dynamic update query
    const fieldsToUpdate = {
      slug, name, bio, location, avatar, business_type: businessType,
      founded_year: foundedYear, email, phone, website, address,
      facebook_url: socialMedia.facebook, instagram_url: socialMedia.instagram,
      twitter_url: socialMedia.twitter, linkedin_url: socialMedia.linkedin,
      youtube_url: socialMedia.youtube
    };

    Object.entries(fieldsToUpdate).forEach(([field, value]) => {
      if (value !== undefined) {
        updateFields.push(`${field} = ?`);
        updateParams.push(value);
      }
    });

    if (updateFields.length > 0) {
      updateParams.push(id);
      const query = `UPDATE producers SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      await executeQuery(query, updateParams);
    }

    // Update related data if provided
    const updatePromises = [];
    
    if (categories !== undefined) {
      updatePromises.push(this._updateCategories(id, categories));
    }
    if (specialties !== undefined) {
      updatePromises.push(this._updateSpecialties(id, specialties));
    }
    if (certifications !== undefined) {
      updatePromises.push(this._updateCertifications(id, certifications));
    }
    if (languages !== undefined) {
      updatePromises.push(this._updateLanguages(id, languages));
    }
    if (businessHours !== undefined) {
      updatePromises.push(this._updateBusinessHours(id, businessHours));
    }

    await Promise.all(updatePromises);

    return await this.getByIdOrSlug(id);
  }

  /**
   * Delete producer
   */
  static async delete(id) {
    const query = 'UPDATE producers SET status = "inactive", updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const result = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  /**
   * Authenticate producer login
   */
  static async authenticate(email, password) {
    const query = 'SELECT * FROM producers WHERE email = ? AND status IN ("active", "pending")';
    const producerData = await getOne(query, [email]);
    
    if (!producerData) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, producerData.password_hash);
    if (!isValidPassword) {
      return null;
    }

    const producer = new Producer(producerData);
    
    // Load related data
    await Promise.all([
      producer._loadCategories(),
      producer._loadSpecialties(),
      producer._loadCertifications(),
      producer._loadLanguages(),
      producer._loadBusinessHours()
    ]);

    return producer;
  }

  /**
   * Update producer password
   */
  static async updatePassword(id, currentPassword, newPassword) {
    const producer = await this.getByIdOrSlug(id);
    if (!producer) {
      throw new Error('Producer not found');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, producer.passwordHash);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    const query = 'UPDATE producers SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await executeQuery(query, [newPasswordHash, id]);
  }





  /**
   * Update producer statistics
   */
  static async updateStats(id, stats) {
    const updateFields = [];
    const updateParams = [];

    const allowedStats = ['connections_count', 'likes_count', 'rating', 'total_orders'];
    
    Object.entries(stats).forEach(([field, value]) => {
      if (allowedStats.includes(field) && value !== undefined) {
        updateFields.push(`${field} = ?`);
        updateParams.push(value);
      }
    });

    if (updateFields.length > 0) {
      updateParams.push(id);
      const query = `UPDATE producers SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      await executeQuery(query, updateParams);
    }
  }

  // Instance methods for loading related data

  async _loadCategories() {
    const query = `
      SELECT c.id, c.name, c.slug, c.icon 
      FROM categories c
      JOIN producer_categories pc ON c.id = pc.category_id
      WHERE pc.producer_id = ?
    `;
    this.categories = await executeQuery(query, [this.id]);
  }

  async _loadSpecialties() {
    const query = 'SELECT specialty FROM producer_specialties WHERE producer_id = ?';
    const results = await executeQuery(query, [this.id]);
    this.specialties = results.map(row => row.specialty);
  }

  async _loadCertifications() {
    const query = `
      SELECT certification_name, issued_by, issued_date, expiry_date, certificate_url 
      FROM producer_certifications 
      WHERE producer_id = ?
    `;
    this.certifications = await executeQuery(query, [this.id]);
  }

  async _loadLanguages() {
    const query = 'SELECT language, proficiency FROM producer_languages WHERE producer_id = ?';
    this.languages = await executeQuery(query, [this.id]);
  }

  async _loadBusinessHours() {
    const query = `
      SELECT day_of_week, is_open, open_time, close_time 
      FROM producer_business_hours 
      WHERE producer_id = ?
    `;
    const results = await executeQuery(query, [this.id]);
    
    this.businessHours = {};
    results.forEach(row => {
      this.businessHours[row.day_of_week] = {
        isOpen: row.is_open,
        openTime: row.open_time,
        closeTime: row.close_time
      };
    });
  }

  // Helper methods

  static async _slugExists(slug, excludeId = null) {
    let query = 'SELECT id FROM producers WHERE slug = ?';
    const params = [slug];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const result = await getOne(query, params);
    return !!result;
  }

  static async _insertCategories(producerId, categories) {
    if (!categories || categories.length === 0) return;

    const values = categories.map(categoryId => [producerId, categoryId]);
    const placeholders = values.map(() => '(?, ?)').join(', ');
    const query = `INSERT INTO producer_categories (producer_id, category_id) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertSpecialties(producerId, specialties) {
    if (!specialties || specialties.length === 0) return;

    const values = specialties.map(specialty => [producerId, specialty]);
    const placeholders = values.map(() => '(?, ?)').join(', ');
    const query = `INSERT INTO producer_specialties (producer_id, specialty) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertCertifications(producerId, certifications) {
    if (!certifications || certifications.length === 0) return;

    const values = certifications.map(cert => [
      producerId, 
      typeof cert === 'string' ? cert : cert.name,
      cert.issuedBy || null,
      cert.issuedDate || null,
      cert.expiryDate || null,
      cert.certificateUrl || null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
    const query = `
      INSERT INTO producer_certifications 
      (producer_id, certification_name, issued_by, issued_date, expiry_date, certificate_url) 
      VALUES ${placeholders}
    `;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertLanguages(producerId, languages) {
    if (!languages || languages.length === 0) return;

    const values = languages.map(lang => [
      producerId, 
      typeof lang === 'string' ? lang : lang.language,
      typeof lang === 'object' ? lang.proficiency : 'intermediate'
    ]);
    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const query = `INSERT INTO producer_languages (producer_id, language, proficiency) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertBusinessHours(producerId, businessHours) {
    if (!businessHours || Object.keys(businessHours).length === 0) return;

    const values = Object.entries(businessHours).map(([day, hours]) => [
      producerId,
      day,
      hours.isOpen !== undefined ? hours.isOpen : true,
      hours.openTime || null,
      hours.closeTime || null
    ]);
    
    const placeholders = values.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const query = `
      INSERT INTO producer_business_hours (producer_id, day_of_week, is_open, open_time, close_time) 
      VALUES ${placeholders}
    `;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _updateCategories(producerId, categories) {
    // Delete existing categories
    await executeQuery('DELETE FROM producer_categories WHERE producer_id = ?', [producerId]);
    // Insert new categories
    await this._insertCategories(producerId, categories);
  }

  static async _updateSpecialties(producerId, specialties) {
    await executeQuery('DELETE FROM producer_specialties WHERE producer_id = ?', [producerId]);
    await this._insertSpecialties(producerId, specialties);
  }

  static async _updateCertifications(producerId, certifications) {
    await executeQuery('DELETE FROM producer_certifications WHERE producer_id = ?', [producerId]);
    await this._insertCertifications(producerId, certifications);
  }

  static async _updateLanguages(producerId, languages) {
    await executeQuery('DELETE FROM producer_languages WHERE producer_id = ?', [producerId]);
    await this._insertLanguages(producerId, languages);
  }

  static async _updateBusinessHours(producerId, businessHours) {
    await executeQuery('DELETE FROM producer_business_hours WHERE producer_id = ?', [producerId]);
    await this._insertBusinessHours(producerId, businessHours);
  }

  // Convert to JSON representation
  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      bio: this.bio,
      location: this.location,
      avatar: this.avatar,
      profileImage: this.profileImageUrl,
      coverImage: this.coverImageUrl,
      verified: this.verified,
      businessType: this.businessType,
      foundedYear: this.foundedYear,
      contact: {
        email: this.email,
        phone: this.phone,
        website: this.website,
        address: this.address
      },
      socialMedia: {
        facebook: this.facebookUrl,
        instagram: this.instagramUrl,
        twitter: this.twitterUrl,
        linkedin: this.linkedinUrl,
        youtube: this.youtubeUrl
      },
      statistics: {
        connections: this.connectionsCount,
        likes: this.likesCount,
        rating: this.rating,
        totalOrders: this.totalOrders
      },
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // Related data (loaded separately)
      categories: this.categories,
      specialties: this.specialties,
      certifications: this.certifications,
      languages: this.languages,
      businessHours: this.businessHours
    };
  }
}

module.exports = Producer;