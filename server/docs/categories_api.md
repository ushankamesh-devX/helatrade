# Categories API Documentation

## Overview
This document describes the REST API endpoints for managing product categories in the HelaTrade platform.

**Base URL:** `/api/categories`  
**Version:** v1  
**Date:** 2025-09-12

---

## Endpoints

### 1. Get All Categories
Retrieve a list of all active categories.

**Endpoint:** `GET /api/categories`

**Parameters:**
- `active` (optional): Filter by active status (default: true)
- `limit` (optional): Limit number of results (default: 50)
- `offset` (optional): Offset for pagination (default: 0)

**Example Request:**
```bash
GET /api/categories
GET /api/categories?active=true&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Vegetables",
      "slug": "vegetables",
      "icon": "🥕",
      "is_active": true,
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Spices & Herbs",
      "slug": "spices-herbs",
      "icon": "🌶️",
      "is_active": true,
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 9,
    "limit": 50,
    "offset": 0
  }
}
```

---

### 2. Get Category by ID
Retrieve a specific category by its ID.

**Endpoint:** `GET /api/categories/{id}`

**Parameters:**
- `id` (required): Category ID (integer)

**Example Request:**
```bash
GET /api/categories/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Vegetables",
    "slug": "vegetables",
    "icon": "🥕",
    "is_active": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### 3. Get Category by Slug
Retrieve a specific category by its slug.

**Endpoint:** `GET /api/categories/slug/{slug}`

**Parameters:**
- `slug` (required): Category slug (string)

**Example Request:**
```bash
GET /api/categories/slug/vegetables
```

**Response:** Same as Get Category by ID

---

### 4. Create Category
Create a new category.

**Endpoint:** `POST /api/categories`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "name": "New Category",
  "icon": "🌱"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "New Category",
    "slug": "new-category",
    "icon": "🌱",
    "is_active": true,
    "created_at": "2025-09-12T10:30:00Z",
    "updated_at": "2025-09-12T10:30:00Z"
  },
  "message": "Category created successfully"
}
```

---

### 5. Update Category
Update an existing category.

**Endpoint:** `PUT /api/categories/{id}`

**Authentication:** Required (Admin only)

**Parameters:**
- `id` (required): Category ID (integer)

**Request Body:**
```json
{
  "name": "Updated Category Name",
  "icon": "🌿",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Category Name",
    "slug": "updated-category-name",
    "icon": "🌿",
    "is_active": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-09-12T10:35:00Z"
  },
  "message": "Category updated successfully"
}
```

---

### 6. Delete Category
Delete a category (soft delete by setting is_active to false).

**Endpoint:** `DELETE /api/categories/{id}`

**Authentication:** Required (Admin only)

**Parameters:**
- `id` (required): Category ID (integer)

**Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid request data",
  "details": {
    "name": "Category name is required"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Category not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": "Conflict",
  "message": "Category name already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Data Validation Rules

### Category Name
- **Required:** Yes
- **Type:** String
- **Min Length:** 2 characters
- **Max Length:** 100 characters
- **Unique:** Yes
- **Pattern:** Alphanumeric characters, spaces, and common symbols (&, -, etc.)

### Category Icon
- **Required:** No
- **Type:** String
- **Max Length:** 10 characters
- **Format:** Emoji or short text identifier

### Category Slug
- **Auto-generated:** Yes (from name)
- **Format:** Lowercase, hyphen-separated
- **Unique:** Yes

---

## Usage Examples

### Frontend Integration
```javascript
// Get all categories
const response = await fetch('/api/categories');
const { data: categories } = await response.json();

// Create new category
const newCategory = await fetch('/api/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    name: 'Organic Products',
    icon: '🌱'
  })
});
```

### cURL Examples
```bash
# Get all categories
curl -X GET "http://localhost:3000/api/categories"

# Create category
curl -X POST "http://localhost:3000/api/categories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"name": "Organic Products", "icon": "🌱"}'

# Update category
curl -X PUT "http://localhost:3000/api/categories/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"name": "Fresh Vegetables", "icon": "🥕"}'
```