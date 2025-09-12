-- HelaTrade Producers Database Schema
-- This schema supports the producer profile functionality shown in ProducerProfile.jsx

-- Main producers table
CREATE TABLE producers (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly identifier (e.g., 'highland-tea-estate')
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    location VARCHAR(255),
    avatar VARCHAR(10), -- Emoji or character representation
    profile_image_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    
    -- Business Details
    business_type VARCHAR(100),
    founded_year YEAR,
    
    -- Contact Information
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(255),
    address TEXT,
    
    -- Social Media Links
    facebook_url VARCHAR(255),
    instagram_url VARCHAR(255),
    twitter_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    youtube_url VARCHAR(255),
    
    -- Statistics
    connections_count INT DEFAULT 0,
    posts_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00, -- e.g., 4.85
    total_orders INT DEFAULT 0,
    
    -- Status and Metadata
    status ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_slug (slug),
    INDEX idx_name (name),
    INDEX idx_location (location),
    INDEX idx_verified (verified),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Producer specialties (many-to-many relationship)
CREATE TABLE producer_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producer_specialty (producer_id, specialty),
    INDEX idx_producer_id (producer_id)
);

-- Producer certifications
CREATE TABLE producer_certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issued_by VARCHAR(255),
    issued_date DATE,
    expiry_date DATE,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    INDEX idx_producer_id (producer_id),
    INDEX idx_expiry_date (expiry_date)
);

-- Producer languages
CREATE TABLE producer_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    language VARCHAR(50) NOT NULL,
    proficiency ENUM('basic', 'intermediate', 'advanced', 'native') DEFAULT 'intermediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producer_language (producer_id, language),
    INDEX idx_producer_id (producer_id)
);

-- Producer business hours
CREATE TABLE producer_business_hours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    is_open BOOLEAN DEFAULT TRUE,
    open_time TIME,
    close_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producer_day (producer_id, day_of_week),
    INDEX idx_producer_id (producer_id)
);

-- Producer categories (many-to-many with existing categories table)
CREATE TABLE producer_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    category_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producer_category (producer_id, category_id),
    INDEX idx_producer_id (producer_id),
    INDEX idx_category_id (category_id)
);

-- Producer posts (for the posts shown in profile)
CREATE TABLE producer_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    is_trending BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    INDEX idx_producer_id (producer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_trending (is_trending)
);

-- Producer products
CREATE TABLE producer_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producer_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_unit DECIMAL(10,2),
    unit VARCHAR(20), -- kg, lbs, pieces, etc.
    image_url VARCHAR(500),
    category VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0.00,
    in_stock BOOLEAN DEFAULT TRUE,
    is_organic BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    min_order_quantity INT DEFAULT 1,
    status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    INDEX idx_producer_id (producer_id),
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_organic (is_organic)
);

-- Producer connections (following/follower relationship)
CREATE TABLE producer_connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id VARCHAR(36), -- Can be producer or store
    follower_type ENUM('producer', 'store', 'customer') NOT NULL,
    following_producer_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'blocked') DEFAULT 'accepted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (following_producer_id) REFERENCES producers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_connection (follower_id, follower_type, following_producer_id),
    INDEX idx_follower (follower_id, follower_type),
    INDEX idx_following (following_producer_id),
    INDEX idx_status (status)
);

-- Sample data insertion
INSERT INTO producers (
    slug, name, bio, location, avatar, profile_image_url, cover_image_url, 
    verified, business_type, founded_year, email, phone, website, address,
    facebook_url, instagram_url, twitter_url, linkedin_url, youtube_url,
    connections_count, posts_count, likes_count, rating, total_orders
) VALUES (
    'highland-tea-estate',
    'Highland Tea Estate',
    'Premium Ceylon tea direct from high-altitude plantations in Nuwara Eliya. We are a family-owned business with over 50 years of experience in tea cultivation and processing. Our commitment to sustainable farming practices and traditional methods ensures the highest quality tea for our customers worldwide.',
    'Nuwara Eliya, Sri Lanka',
    '🍃',
    'https://images.unsplash.com/photo-1566471369132-2f8bb474e60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1563822249366-dab87a7a5c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    TRUE,
    'Family-owned Tea Estate',
    1972,
    'info@highlandtea.lk',
    '+94 777 123 456',
    'www.highlandtea.lk',
    'Highland Estate Road, Nuwara Eliya 22200, Sri Lanka',
    'https://facebook.com/highlandteaestate',
    'https://instagram.com/highland_tea_estate',
    'https://twitter.com/highland_tea',
    'https://linkedin.com/company/highland-tea-estate',
    'https://youtube.com/channel/highland-tea-estate',
    245, 127, 8950, 4.8, 450
);

-- Insert specialties for the sample producer
INSERT INTO producer_specialties (producer_id, specialty) VALUES
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Ceylon Black Tea'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Green Tea'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'White Tea'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Organic Tea'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Tea Processing');

-- Insert certifications
INSERT INTO producer_certifications (producer_id, certification_name) VALUES
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Organic Certification'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Fair Trade Certified'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Rainforest Alliance'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'ISO 22000'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'HACCP');

-- Insert languages
INSERT INTO producer_languages (producer_id, language, proficiency) VALUES
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'English', 'advanced'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Sinhala', 'native'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'Tamil', 'intermediate');

-- Insert business hours
INSERT INTO producer_business_hours (producer_id, day_of_week, is_open, open_time, close_time) VALUES
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'monday', TRUE, '08:00:00', '17:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'tuesday', TRUE, '08:00:00', '17:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'wednesday', TRUE, '08:00:00', '17:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'thursday', TRUE, '08:00:00', '17:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'friday', TRUE, '08:00:00', '17:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'saturday', TRUE, '09:00:00', '15:00:00'),
((SELECT id FROM producers WHERE slug = 'highland-tea-estate'), 'sunday', FALSE, NULL, NULL);