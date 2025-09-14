-- HelaTrade Stores Database Schema
-- This schema supports the store profile functionality for retail stores, wholesalers, etc.

-- Main stores table
CREATE TABLE stores (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly identifier (e.g., 'sarahs-fresh-market')
    
    -- Basic Information
    owner_name VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL,
    store_description TEXT,
    logo_url VARCHAR(500),
    profile_image_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    
    -- Business Details
    business_type ENUM('retail', 'wholesale', 'restaurant', 'export', 'processing', 'online') NOT NULL,
    store_size ENUM('small', 'medium', 'large'),
    established_year YEAR,
    business_focus TEXT, -- What are their specific requirements, quality standards, etc.
    
    -- Contact Information
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Hashed password for authentication
    phone VARCHAR(20),
    website VARCHAR(255),
    
    -- Location Information
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    
    -- Social Media Links
    facebook_url VARCHAR(255),
    instagram_url VARCHAR(255),
    whatsapp_number VARCHAR(20),
    
    -- Operating Hours (JSON format for flexibility)
    operating_hours JSON, -- {"weekdays": "8:00 AM - 8:00 PM", "weekends": "8:00 AM - 9:00 PM"}
    
    -- Statistics
    connections_count INT DEFAULT 0,
    orders_count INT DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00, -- Average rating from producers
    
    -- Status and Metadata
    status ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_slug (slug),
    INDEX idx_email (email),
    INDEX idx_store_name (store_name),
    INDEX idx_business_type (business_type),
    INDEX idx_location (city, district, province),
    INDEX idx_verified (verified),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Store specialties/interests (what they want to source)
CREATE TABLE store_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_specialty (store_id, specialty),
    INDEX idx_store_id (store_id),
    INDEX idx_specialty (specialty)
);

-- Store certifications
CREATE TABLE store_certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issued_by VARCHAR(255),
    issued_date DATE,
    expiry_date DATE,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    INDEX idx_store_id (store_id),
    INDEX idx_expiry_date (expiry_date)
);

-- Store business hours (detailed)
CREATE TABLE store_business_hours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    is_open BOOLEAN DEFAULT TRUE,
    open_time TIME,
    close_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_day (store_id, day_of_week),
    INDEX idx_store_id (store_id)
);

-- Store interested categories (many-to-many with existing categories table)
CREATE TABLE store_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    category_id INT NOT NULL,
    interest_level ENUM('high', 'medium', 'low') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_category (store_id, category_id),
    INDEX idx_store_id (store_id),
    INDEX idx_category_id (category_id)
);

-- Store delivery options
CREATE TABLE store_delivery_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    delivery_type ENUM('pickup', 'local_delivery', 'island_wide_shipping', 'express_delivery') NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    cost DECIMAL(8,2) DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_delivery (store_id, delivery_type),
    INDEX idx_store_id (store_id)
);

-- Store payment methods
CREATE TABLE store_payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    payment_type ENUM('cash', 'card', 'digital_payments', 'bank_transfer', 'mobile_payment') NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    provider VARCHAR(100), -- e.g., 'Visa', 'PayPal', 'Frimi'
    account_details TEXT, -- Encrypted account info if needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_payment (store_id, payment_type, provider),
    INDEX idx_store_id (store_id)
);

-- Store-Producer connections (extending existing producer_connections table concept)
CREATE TABLE store_producer_connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    producer_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'blocked', 'rejected') DEFAULT 'pending',
    connection_type ENUM('regular', 'preferred', 'exclusive') DEFAULT 'regular',
    initiated_by ENUM('store', 'producer') NOT NULL,
    notes TEXT, -- Connection notes or special arrangements
    connected_at TIMESTAMP NULL, -- When connection was accepted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_producer (store_id, producer_id),
    INDEX idx_store_id (store_id),
    INDEX idx_producer_id (producer_id),
    INDEX idx_status (status),
    INDEX idx_connection_type (connection_type)
);

-- Store orders/inquiries (simplified for now, full order system can be added later)
CREATE TABLE store_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    producer_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(255),
    quantity_needed INT,
    unit VARCHAR(20),
    budget_range VARCHAR(100),
    delivery_deadline DATE,
    message TEXT,
    status ENUM('pending', 'responded', 'negotiating', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    INDEX idx_store_id (store_id),
    INDEX idx_producer_id (producer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Store authentication tokens (for JWT token blacklisting, password resets, etc.)
CREATE TABLE store_auth_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    token_type ENUM('access', 'refresh', 'reset_password', 'email_verification') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_blacklisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    INDEX idx_store_id (store_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at),
    INDEX idx_token_type (token_type)
);

-- Sample data insertion
INSERT INTO stores (
    slug, owner_name, store_name, store_description, business_type, store_size, 
    established_year, business_focus, email, password_hash, phone, website, 
    address, city, district, province, postal_code,
    facebook_url, instagram_url, whatsapp_number,
    operating_hours, connections_count, orders_count, rating
) VALUES (
    'sarahs-fresh-market',
    'Sarah Wilson',
    'Sarah\'s Fresh Market',
    'Your neighborhood\'s trusted source for fresh, quality products from local producers. We pride ourselves on connecting our community with the best local agriculture.',
    'retail',
    'medium',
    2018,
    'We focus on sourcing organic and locally-grown products. Looking for consistent suppliers who can provide quality vegetables, fruits, and spices. Prefer producers with organic certifications.',
    'sarah@freshmarket.lk',
    '$2b$12$LQv3c1yqBwkvHSJfHkOKTOdVKYVSCv1nJHb5lN3p7cTH2S1rQ8p0K', -- hashed password: 'password123'
    '+94 77 123 4567',
    'www.sarahsfreshmarket.lk',
    '123 Main Street, Colombo 03',
    'Colombo',
    'Colombo',
    'Western',
    '00300',
    'facebook.com/sarahsfreshmarket',
    '@sarahsfreshmarket',
    '+94 77 123 4567',
    '{"weekdays": "8:00 AM - 8:00 PM", "weekends": "8:00 AM - 9:00 PM"}',
    15, 45, 4.6
);

-- Insert specialties for the sample store
INSERT INTO store_specialties (store_id, specialty, priority) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Organic Products', 'high'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Local Produce', 'high'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Fresh Vegetables', 'high'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Spices', 'medium'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Fruits', 'medium');

-- Insert certifications
INSERT INTO store_certifications (store_id, certification_name, issued_by) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Food Safety Certification', 'Sri Lanka Standards Institution'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'Organic Retailer License', 'Department of Agriculture');

-- Insert business hours
INSERT INTO store_business_hours (store_id, day_of_week, is_open, open_time, close_time) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'monday', TRUE, '08:00:00', '20:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'tuesday', TRUE, '08:00:00', '20:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'wednesday', TRUE, '08:00:00', '20:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'thursday', TRUE, '08:00:00', '20:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'friday', TRUE, '08:00:00', '20:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'saturday', TRUE, '08:00:00', '21:00:00'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'sunday', TRUE, '08:00:00', '21:00:00');

-- Insert delivery options
INSERT INTO store_delivery_options (store_id, delivery_type, is_available, cost, description) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'pickup', TRUE, 0.00, 'Free pickup from store'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'local_delivery', TRUE, 200.00, 'Local delivery within Colombo district'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'island_wide_shipping', TRUE, 500.00, 'Island-wide shipping via courier');

-- Insert payment methods
INSERT INTO store_payment_methods (store_id, payment_type, is_available, provider) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'cash', TRUE, NULL),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'card', TRUE, 'Visa/Mastercard'),
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 'digital_payments', TRUE, 'Frimi');

-- Insert interested categories (assuming some categories exist)
INSERT INTO store_categories (store_id, category_id, interest_level) VALUES
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 1, 'high'), -- Vegetables
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 2, 'high'), -- Fruits
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 4, 'medium'), -- Spices
((SELECT id FROM stores WHERE slug = 'sarahs-fresh-market'), 5, 'medium'); -- Tea