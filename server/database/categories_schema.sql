-- ============================================
-- HelaTrade Category Database Schema
-- ============================================
-- Description: Database schema for managing product categories
-- Created: 2025-09-12
-- Author: HelaTrade Development Team
-- ============================================

-- Categories Table
-- This table stores all product categories available in the platform
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Category name (e.g., Vegetables, Spices)',
    slug VARCHAR(100) NOT NULL UNIQUE COMMENT 'URL-friendly version (e.g., vegetables, spices-herbs)',
    icon VARCHAR(10) COMMENT 'Emoji or icon identifier (e.g., 🥕, 🌶️)',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the category is active and visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update timestamp'
);

-- Indexes for better performance
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_name ON categories(name);

-- ============================================
-- Sample Data
-- ============================================

INSERT INTO categories (name, slug, icon) VALUES
('Vegetables', 'vegetables', '🥕'),
('Spices & Herbs', 'spices-herbs', '🌶️'),
('Fruits', 'fruits', '🥭'),
('Dairy Products', 'dairy-products', '🥛'),
('Seafood', 'seafood', '🐟'),
('Rice & Grains', 'rice-grains', '🌾'),
('Tea & Beverages', 'tea-beverages', '🍃'),
('Processed Foods', 'processed-foods', '🍯'),
('Coconut Products', 'coconut-products', '🥥');

-- ============================================
-- Common Queries
-- ============================================

-- Get all active categories
-- SELECT * FROM categories WHERE is_active = TRUE ORDER BY name;

-- Get category by slug
-- SELECT * FROM categories WHERE slug = 'vegetables' AND is_active = TRUE;

-- Search categories by name
-- SELECT * FROM categories WHERE name LIKE '%spice%' AND is_active = TRUE;

-- Count total categories
-- SELECT COUNT(*) as total_categories FROM categories WHERE is_active = TRUE;