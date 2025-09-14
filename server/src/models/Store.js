const { executeQuery, getOne, executeTransaction, pool } = require('../config/database');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

class Store {
  constructor(data = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.ownerName = data.owner_name;
    this.storeName = data.store_name;
    this.storeDescription = data.store_description;
    this.logoUrl = data.logo_url;
    this.profileImageUrl = data.profile_image_url;
    this.coverImageUrl = data.cover_image_url;
    this.verified = data.verified;
    this.businessType = data.business_type;
    this.storeSize = data.store_size;
    this.establishedYear = data.established_year;
    this.businessFocus = data.business_focus;
    this.email = data.email;
    this.passwordHash = data.password_hash;
    this.phone = data.phone;
    this.website = data.website;
    this.address = data.address;
    this.city = data.city;
    this.district = data.district;
    this.province = data.province;
    this.postalCode = data.postal_code;
    this.facebookUrl = data.facebook_url;
    this.instagramUrl = data.instagram_url;
    this.whatsappNumber = data.whatsapp_number;
    this.operatingHours = data.operating_hours;
    this.connectionsCount = data.connections_count;
    this.ordersCount = data.orders_count;
    this.totalSpent = data.total_spent;
    this.rating = data.rating;
    this.status = data.status;
    this.emailVerified = data.email_verified;
    this.phoneVerified = data.phone_verified;
    this.lastLogin = data.last_login;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  // Static methods for database operations

  /**
   * Register a new store
   */
  static async register(data) {
    const {
      ownerName, storeName, email, password, businessType, 
      location = {}, phone, website, description, businessFocus,
      interestedCategories = [], specialties = [], deliveryOptions = [],
      paymentMethods = [], operatingHours = {}
    } = data;

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate slug from store name
    const baseSlug = slugify(storeName, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await this._slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Use a complete transaction for all operations
    const connection = await pool.getConnection();
    let storeId;
    
    try {
      await connection.beginTransaction();
      
      // Generate UUID for the store
      storeId = uuidv4();
      
      // Insert store first
      const storeQuery = `
        INSERT INTO stores (
          id, slug, owner_name, store_name, store_description, business_type,
          business_focus, email, password_hash, phone, website,
          address, city, district, province, postal_code,
          operating_hours, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `;
      
      const storeParams = [
        storeId, slug, ownerName, storeName, description, businessType,
        businessFocus, email, passwordHash, phone, website,
        location.address, location.city, location.district, 
        location.province, location.postalCode,
        JSON.stringify(operatingHours)
      ];

      await connection.execute(storeQuery, storeParams);
      
      console.log('Store created with ID:', storeId);
      console.log('interestedCategories:', interestedCategories);
      console.log('specialties:', specialties);
      console.log('deliveryOptions:', deliveryOptions);
      console.log('paymentMethods:', paymentMethods);

      // Insert related data within the same transaction
      await Promise.all([
        this._insertCategoriesInTransaction(connection, storeId, interestedCategories),
        this._insertSpecialtiesInTransaction(connection, storeId, specialties),
        this._insertDeliveryOptionsInTransaction(connection, storeId, deliveryOptions),
        this._insertPaymentMethodsInTransaction(connection, storeId, paymentMethods)
      ]);
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    return await this.getByIdOrSlug(storeId);
  }

  /**
   * Authenticate store login
   */
  static async authenticate(email, password) {
    const query = 'SELECT * FROM stores WHERE email = ? AND status = "active"';
    const storeData = await getOne(query, [email]);

    if (!storeData) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, storeData.password_hash);
    if (!isValidPassword) {
      return null;
    }

    // Update last login
    await executeQuery(
      'UPDATE stores SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [storeData.id]
    );

    const store = new Store(storeData);
    await store._loadRelatedData();
    return store;
  }

  /**
   * Get all stores with optional filtering and pagination
   */
  static async getAll(options = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      businessType,
      location,
      verified,
      sort = 'created_at',
      order = 'desc'
    } = options;

    const offset = (page - 1) * limit;
    let whereConditions = ['s.status = ?'];
    let queryParams = ['active'];

    // Build WHERE conditions
    if (search) {
      whereConditions.push('(s.store_name LIKE ? OR s.city LIKE ? OR s.store_description LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (businessType) {
      whereConditions.push('s.business_type = ?');
      queryParams.push(businessType);
    }

    if (location) {
      whereConditions.push('(s.city LIKE ? OR s.district LIKE ? OR s.province LIKE ?)');
      const locationTerm = `%${location}%`;
      queryParams.push(locationTerm, locationTerm, locationTerm);
    }

    if (verified !== undefined) {
      whereConditions.push('s.verified = ?');
      queryParams.push(verified);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Validate sort field
    const allowedSortFields = ['store_name', 'rating', 'connections_count', 'created_at', 'updated_at'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM stores s ${whereClause}`;
    const [countResult] = await executeQuery(countQuery, queryParams);
    const total = countResult.total;

    // Get stores
    const query = `
      SELECT s.*, 
             GROUP_CONCAT(DISTINCT c.name) as categories,
             GROUP_CONCAT(DISTINCT c.slug) as category_slugs
      FROM stores s
      LEFT JOIN store_categories sc ON s.id = sc.store_id
      LEFT JOIN categories c ON sc.category_id = c.id
      ${whereClause}
      GROUP BY s.id
      ORDER BY s.${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);
    const results = await executeQuery(query, queryParams);

    const stores = await Promise.all(results.map(async row => {
      const store = new Store(row);
      store.categories = row.categories ? row.categories.split(',') : [];
      store.categorySlug = row.category_slugs ? row.category_slugs.split(',') : [];
      await store._loadRelatedData();
      return store;
    }));

    return {
      stores,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get store by ID or slug
   */
  static async getByIdOrSlug(identifier) {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    const field = isUUID ? 'id' : 'slug';
    
    const query = `SELECT * FROM stores WHERE ${field} = ? AND status != 'inactive'`;
    const storeData = await getOne(query, [identifier]);
    
    if (!storeData) {
      return null;
    }

    const store = new Store(storeData);
    await store._loadRelatedData();
    return store;
  }

  /**
   * Update store profile
   */
  static async update(id, data) {
    const {
      ownerName, storeName, storeDescription, businessType, storeSize,
      establishedYear, businessFocus, phone, website, location = {},
      socialMedia = {}, operatingHours, categories, specialties,
      deliveryOptions, paymentMethods, certifications
    } = data;

    let slug;
    if (storeName) {
      const baseSlug = slugify(storeName, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      while (await this._slugExists(slug, id)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updateFields = [];
    const updateParams = [];

    const fieldsToUpdate = {
      slug, owner_name: ownerName, store_name: storeName, 
      store_description: storeDescription, business_type: businessType,
      store_size: storeSize, established_year: establishedYear,
      business_focus: businessFocus, phone, website,
      address: location.address, city: location.city,
      district: location.district, province: location.province,
      postal_code: location.postalCode,
      facebook_url: socialMedia.facebook, instagram_url: socialMedia.instagram,
      whatsapp_number: socialMedia.whatsapp,
      operating_hours: operatingHours ? JSON.stringify(operatingHours) : undefined
    };

    Object.entries(fieldsToUpdate).forEach(([field, value]) => {
      if (value !== undefined) {
        updateFields.push(`${field} = ?`);
        updateParams.push(value);
      }
    });

    if (updateFields.length > 0) {
      updateParams.push(id);
      const query = `UPDATE stores SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
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
    if (deliveryOptions !== undefined) {
      updatePromises.push(this._updateDeliveryOptions(id, deliveryOptions));
    }
    if (paymentMethods !== undefined) {
      updatePromises.push(this._updatePaymentMethods(id, paymentMethods));
    }
    if (certifications !== undefined) {
      updatePromises.push(this._updateCertifications(id, certifications));
    }

    await Promise.all(updatePromises);

    return await this.getByIdOrSlug(id);
  }

  /**
   * Update store password
   */
  static async updatePassword(id, currentPassword, newPassword) {
    const store = await this.getByIdOrSlug(id);
    if (!store) {
      throw new Error('Store not found');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, store.passwordHash);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    const query = 'UPDATE stores SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await executeQuery(query, [newPasswordHash, id]);

    return true;
  }

  /**
   * Get store connections with producers
   */
  static async getConnections(storeId, options = {}) {
    const { status = 'accepted', page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const query = `
      SELECT p.*, spc.status, spc.connection_type, spc.connected_at, spc.notes
      FROM producers p
      JOIN store_producer_connections spc ON p.id = spc.producer_id
      WHERE spc.store_id = ? AND spc.status = ?
      ORDER BY spc.connected_at DESC
      LIMIT ? OFFSET ?
    `;

    const connections = await executeQuery(query, [storeId, status, limit, offset]);
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM store_producer_connections 
      WHERE store_id = ? AND status = ?
    `;
    const [countResult] = await executeQuery(countQuery, [storeId, status]);

    return {
      connections,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult.total,
        pages: Math.ceil(countResult.total / limit)
      }
    };
  }

  /**
   * Connect with a producer
   */
  static async connectWithProducer(storeId, producerId, notes = '') {
    const checkQuery = 'SELECT id FROM store_producer_connections WHERE store_id = ? AND producer_id = ?';
    const existing = await getOne(checkQuery, [storeId, producerId]);

    if (existing) {
      throw new Error('Connection already exists');
    }

    const query = `
      INSERT INTO store_producer_connections (store_id, producer_id, initiated_by, notes, status) 
      VALUES (?, ?, 'store', ?, 'pending')
    `;
    await executeQuery(query, [storeId, producerId, notes]);

    return true;
  }

  /**
   * Update connection status
   */
  static async updateConnection(storeId, producerId, status, connectionType = 'regular') {
    const query = `
      UPDATE store_producer_connections 
      SET status = ?, connection_type = ?, connected_at = CASE WHEN ? = 'accepted' THEN CURRENT_TIMESTAMP ELSE connected_at END,
          updated_at = CURRENT_TIMESTAMP
      WHERE store_id = ? AND producer_id = ?
    `;
    const result = await executeQuery(query, [status, connectionType, status, storeId, producerId]);

    if (result.affectedRows === 0) {
      throw new Error('Connection not found');
    }

    // Update connections count if accepted
    if (status === 'accepted') {
      await executeQuery(
        'UPDATE stores SET connections_count = connections_count + 1 WHERE id = ?',
        [storeId]
      );
    }

    return true;
  }

  /**
   * Soft delete store
   */
  static async delete(id) {
    const query = 'UPDATE stores SET status = "inactive", updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const result = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  // Instance methods for loading related data

  async _loadRelatedData() {
    await Promise.all([
      this._loadCategories(),
      this._loadSpecialties(),
      this._loadCertifications(),
      this._loadBusinessHours(),
      this._loadDeliveryOptions(),
      this._loadPaymentMethods()
    ]);
  }

  async _loadCategories() {
    const query = `
      SELECT c.id, c.name, c.slug, c.icon, sc.interest_level
      FROM categories c
      JOIN store_categories sc ON c.id = sc.category_id
      WHERE sc.store_id = ?
    `;
    this.categories = await executeQuery(query, [this.id]);
  }

  async _loadSpecialties() {
    const query = 'SELECT specialty, priority FROM store_specialties WHERE store_id = ?';
    this.specialties = await executeQuery(query, [this.id]);
  }

  async _loadCertifications() {
    const query = `
      SELECT certification_name, issued_by, issued_date, expiry_date, certificate_url 
      FROM store_certifications 
      WHERE store_id = ?
    `;
    this.certifications = await executeQuery(query, [this.id]);
  }

  async _loadBusinessHours() {
    const query = `
      SELECT day_of_week, is_open, open_time, close_time 
      FROM store_business_hours 
      WHERE store_id = ?
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

  async _loadDeliveryOptions() {
    const query = 'SELECT delivery_type, is_available, cost, description FROM store_delivery_options WHERE store_id = ?';
    this.deliveryOptions = await executeQuery(query, [this.id]);
  }

  async _loadPaymentMethods() {
    const query = 'SELECT payment_type, is_available, provider FROM store_payment_methods WHERE store_id = ?';
    this.paymentMethods = await executeQuery(query, [this.id]);
  }

  // Helper methods

  static async _slugExists(slug, excludeId = null) {
    let query = 'SELECT id FROM stores WHERE slug = ?';
    const params = [slug];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const result = await getOne(query, params);
    return !!result;
  }

  static async _insertCategories(storeId, categories) {
    if (!categories || categories.length === 0) return;

    const values = categories.map(cat => [
      storeId,
      typeof cat === 'object' ? cat.id : cat,
      typeof cat === 'object' ? cat.interestLevel || 'medium' : 'medium'
    ]);
    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const query = `INSERT INTO store_categories (store_id, category_id, interest_level) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertSpecialties(storeId, specialties) {
    if (!specialties || specialties.length === 0) return;

    const values = specialties.map(spec => [
      storeId,
      typeof spec === 'string' ? spec : spec.name,
      typeof spec === 'object' ? spec.priority || 'medium' : 'medium'
    ]);
    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const query = `INSERT INTO store_specialties (store_id, specialty, priority) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertDeliveryOptions(storeId, options) {
    if (!options || options.length === 0) return;

    const values = options.map(opt => [
      storeId,
      typeof opt === 'string' ? opt : opt.type,
      typeof opt === 'object' ? opt.available !== false : true,
      typeof opt === 'object' ? opt.cost || 0.00 : 0.00,
      typeof opt === 'object' ? opt.description || null : null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const query = `INSERT INTO store_delivery_options (store_id, delivery_type, is_available, cost, description) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertPaymentMethods(storeId, methods) {
    if (!methods || methods.length === 0) return;

    const values = methods.map(method => [
      storeId,
      typeof method === 'string' ? method : method.type,
      typeof method === 'object' ? method.available !== false : true,
      typeof method === 'object' ? method.provider || null : null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');
    const query = `INSERT INTO store_payment_methods (store_id, payment_type, is_available, provider) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  static async _insertCertifications(storeId, certifications) {
    if (!certifications || certifications.length === 0) return;

    const values = certifications.map(cert => [
      storeId,
      typeof cert === 'string' ? cert : cert.name,
      cert.issuedBy || null,
      cert.issuedDate || null,
      cert.expiryDate || null,
      cert.certificateUrl || null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
    const query = `
      INSERT INTO store_certifications 
      (store_id, certification_name, issued_by, issued_date, expiry_date, certificate_url) 
      VALUES ${placeholders}
    `;
    const flatParams = values.flat();
    
    await executeQuery(query, flatParams);
  }

  // Update methods for related data
  static async _updateCategories(storeId, categories) {
    await executeQuery('DELETE FROM store_categories WHERE store_id = ?', [storeId]);
    await this._insertCategories(storeId, categories);
  }

  static async _updateSpecialties(storeId, specialties) {
    await executeQuery('DELETE FROM store_specialties WHERE store_id = ?', [storeId]);
    await this._insertSpecialties(storeId, specialties);
  }

  static async _updateDeliveryOptions(storeId, options) {
    await executeQuery('DELETE FROM store_delivery_options WHERE store_id = ?', [storeId]);
    await this._insertDeliveryOptions(storeId, options);
  }

  static async _updatePaymentMethods(storeId, methods) {
    await executeQuery('DELETE FROM store_payment_methods WHERE store_id = ?', [storeId]);
    await this._insertPaymentMethods(storeId, methods);
  }

  static async _updateCertifications(storeId, certifications) {
    await executeQuery('DELETE FROM store_certifications WHERE store_id = ?', [storeId]);
    await this._insertCertifications(storeId, certifications);
  }

  // Convert to JSON representation
  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      ownerName: this.ownerName,
      storeName: this.storeName,
      storeDescription: this.storeDescription,
      logoUrl: this.logoUrl,
      profileImageUrl: this.profileImageUrl,
      coverImageUrl: this.coverImageUrl,
      verified: this.verified,
      businessType: this.businessType,
      storeSize: this.storeSize,
      establishedYear: this.establishedYear,
      businessFocus: this.businessFocus,
      contact: {
        email: this.email,
        phone: this.phone,
        website: this.website
      },
      location: {
        address: this.address,
        city: this.city,
        district: this.district,
        province: this.province,
        postalCode: this.postalCode
      },
      socialMedia: {
        facebook: this.facebookUrl,
        instagram: this.instagramUrl,
        whatsapp: this.whatsappNumber
      },
      operatingHours: this.operatingHours ? JSON.parse(this.operatingHours) : {},
      statistics: {
        connections: this.connectionsCount,
        orders: this.ordersCount,
        totalSpent: this.totalSpent,
        rating: this.rating
      },
      status: this.status,
      emailVerified: this.emailVerified,
      phoneVerified: this.phoneVerified,
      lastLogin: this.lastLogin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // Related data (loaded separately)
      categories: this.categories,
      specialties: this.specialties,
      certifications: this.certifications,
      businessHours: this.businessHours,
      deliveryOptions: this.deliveryOptions,
      paymentMethods: this.paymentMethods
    };
  }

  // Method to get public profile (without sensitive data)
  toPublicJSON() {
    const json = this.toJSON();
    delete json.contact.email; // Remove email from public profile
    return json;
  }

  // Transaction-aware helper methods
  static async _insertCategoriesInTransaction(connection, storeId, categories) {
    if (!categories || categories.length === 0) return;

    console.log('Inserting categories for store:', storeId, 'categories:', categories);

    // Validate that all category IDs exist first
    const categoryIds = categories.map(cat => typeof cat === 'object' ? cat.id : cat);
    const uniqueIds = [...new Set(categoryIds)].filter(id => id != null);
    
    if (uniqueIds.length === 0) return;

    // Check if categories exist
    const checkPlaceholders = uniqueIds.map(() => '?').join(',');
    const checkQuery = `SELECT id FROM categories WHERE id IN (${checkPlaceholders}) AND is_active = true`;
    const [existingCategories] = await connection.execute(checkQuery, uniqueIds);
    
    const existingIds = existingCategories.map(cat => cat.id);
    console.log('Existing category IDs:', existingIds);
    
    if (existingIds.length === 0) {
      console.warn('No valid categories found for IDs:', uniqueIds);
      return;
    }

    // Only insert valid categories
    const validCategories = categories.filter(cat => {
      const catId = typeof cat === 'object' ? cat.id : cat;
      return existingIds.includes(catId);
    });

    if (validCategories.length === 0) return;

    const values = validCategories.map(cat => [
      storeId,
      typeof cat === 'object' ? cat.id : cat,
      typeof cat === 'object' ? cat.interestLevel || 'medium' : 'medium'
    ]);
    const insertPlaceholders = values.map(() => '(?, ?, ?)').join(', ');
    const query = `INSERT INTO store_categories (store_id, category_id, interest_level) VALUES ${insertPlaceholders}`;
    const flatParams = values.flat();
    
    await connection.execute(query, flatParams);
  }

  static async _insertSpecialtiesInTransaction(connection, storeId, specialties) {
    if (!specialties || specialties.length === 0) return;

    const values = specialties.map(spec => [
      storeId,
      typeof spec === 'string' ? spec : spec.name,
      typeof spec === 'object' ? spec.priority || 'medium' : 'medium'
    ]);
    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const query = `INSERT INTO store_specialties (store_id, specialty, priority) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await connection.execute(query, flatParams);
  }

  static async _insertDeliveryOptionsInTransaction(connection, storeId, deliveryOptions) {
    if (!deliveryOptions || deliveryOptions.length === 0) return;

    const values = deliveryOptions.map(option => [
      storeId,
      option.type,
      option.available !== undefined ? option.available : true,
      option.cost || 0,
      option.description || null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const query = `INSERT INTO store_delivery_options (store_id, delivery_type, is_available, cost, description) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await connection.execute(query, flatParams);
  }

  static async _insertPaymentMethodsInTransaction(connection, storeId, paymentMethods) {
    if (!paymentMethods || paymentMethods.length === 0) return;

    const values = paymentMethods.map(method => [
      storeId,
      method.type,
      method.available !== undefined ? method.available : true,
      method.provider || null
    ]);
    const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');
    const query = `INSERT INTO store_payment_methods (store_id, payment_type, is_available, provider) VALUES ${placeholders}`;
    const flatParams = values.flat();
    
    await connection.execute(query, flatParams);
  }
}

module.exports = Store;