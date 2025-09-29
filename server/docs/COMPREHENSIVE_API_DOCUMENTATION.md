# HelaTrade API Documentation

## Overview
This document provides comprehensive documentation for the HelaTrade Producer and Categories APIs, including all endpoints, request/response structures, authentication requirements, and examples.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)",
  "errors": ["Validation error 1", "Validation error 2"] // For validation errors
}
```

---

# Categories API

## Endpoints Overview
- `GET /categories` - Get all categories with optional filtering
- `GET /categories/:id` - Get category by ID
- `GET /categories/parent/:parentId` - Get subcategories by parent ID
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Soft delete category
- `GET /categories/:id/relationships` - Get category with full relationships
- `PATCH /categories/:id/restore` - Restore soft-deleted category

## Category Data Structure

### Category Object
```json
{
  "id": 1,
  "name": "Agriculture",
  "slug": "agriculture",
  "icon": "agriculture-icon",
  "description": "Agricultural products and services",
  "parent_id": null,
  "display_order": 0,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

### Category with Relationships
```json
{
  "id": 1,
  "name": "Agriculture",
  "slug": "agriculture",
  "icon": "agriculture-icon",
  "description": "Agricultural products and services",
  "parent_id": null,
  "display_order": 0,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z",
  "subcategories": [
    {
      "id": 2,
      "name": "Fruits",
      "slug": "fruits",
      "parent_id": 1,
      // ... other fields
    }
  ],
  "parent": null
}
```

## Category Endpoints

### GET /categories
Retrieve all categories with optional filtering.

**Authentication:** None required

**Query Parameters:**
- `active` (boolean, optional): Filter by active status ("true" or "false")
- `parent_id` (integer/string, optional): Filter by parent ID (use "null" or empty string for root categories)

**Request Example:**
```http
GET /api/categories?active=true&parent_id=null
```

**Response Example:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "Agriculture",
        "slug": "agriculture",
        "icon": "agriculture-icon",
        "description": "Agricultural products and services",
        "parent_id": null,
        "display_order": 0,
        "is_active": true,
        "created_at": "2023-01-01T00:00:00.000Z",
        "updated_at": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### GET /categories/:id
Get a specific category by ID.

**Authentication:** None required

**Path Parameters:**
- `id` (integer, required): Category ID

**Request Example:**
```http
GET /api/categories/1
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "category": {
      "id": 1,
      "name": "Agriculture",
      "slug": "agriculture",
      "icon": "agriculture-icon",
      "description": "Agricultural products and services",
      "parent_id": null,
      "display_order": 0,
      "is_active": true,
      "created_at": "2023-01-01T00:00:00.000Z",
      "updated_at": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- `404 Not Found`: Category not found

### GET /categories/parent/:parentId
Get all subcategories for a specific parent category.

**Authentication:** None required

**Path Parameters:**
- `parentId` (integer, required): Parent category ID

**Request Example:**
```http
GET /api/categories/parent/1
```

**Response Example:**
```json
{
  "success": true,
  "message": "Subcategories retrieved successfully",
  "data": {
    "categories": [
      {
        "id": 2,
        "name": "Fruits",
        "slug": "fruits",
        "parent_id": 1,
        "is_active": true,
        // ... other fields
      }
    ]
  }
}
```

### POST /categories
Create a new category.

**Authentication:** Required (Admin privileges recommended)

**Request Body:**
```json
{
  "name": "New Category",
  "slug": "new-category", // Optional, auto-generated if not provided
  "icon": "category-icon", // Optional
  "description": "Category description", // Optional
  "parent_id": 1, // Optional, null for root category
  "display_order": 0, // Optional, defaults to 0
  "is_active": true // Optional, defaults to true
}
```

**Validation Rules:**
- `name`: Required, string, max 255 characters
- `slug`: Optional, string, max 255 characters, lowercase letters/numbers/hyphens only
- `icon`: Optional, string, max 50 characters
- `description`: Optional, string
- `parent_id`: Optional, positive integer or null
- `display_order`: Optional, non-negative integer
- `is_active`: Optional, boolean

**Request Example:**
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Organic Vegetables",
  "description": "Fresh organic vegetables",
  "parent_id": 1,
  "display_order": 1
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category": {
      "id": 3,
      "name": "Organic Vegetables",
      "slug": "organic-vegetables",
      "description": "Fresh organic vegetables",
      "parent_id": 1,
      "display_order": 1,
      "is_active": true,
      "created_at": "2023-01-01T00:00:00.000Z",
      "updated_at": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors or parent category not found
- `409 Conflict`: Category with this name/slug already exists

### PUT /categories/:id
Update an existing category.

**Authentication:** Required (Admin privileges recommended)

**Path Parameters:**
- `id` (integer, required): Category ID

**Request Body:** Same as POST, but all fields are optional

**Request Example:**
```http
PUT /api/categories/3
Content-Type: application/json

{
  "name": "Premium Organic Vegetables",
  "description": "Premium quality organic vegetables"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "category": {
      "id": 3,
      "name": "Premium Organic Vegetables",
      "slug": "premium-organic-vegetables",
      "description": "Premium quality organic vegetables",
      "parent_id": 1,
      "display_order": 1,
      "is_active": true,
      "created_at": "2023-01-01T00:00:00.000Z",
      "updated_at": "2023-01-01T00:05:00.000Z"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors, parent category not found, or circular reference
- `404 Not Found`: Category not found
- `409 Conflict`: Category with this name/slug already exists

### DELETE /categories/:id
Soft delete a category (sets is_active to false).

**Authentication:** Required (Admin privileges recommended)

**Path Parameters:**
- `id` (integer, required): Category ID

**Request Example:**
```http
DELETE /api/categories/3
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Category has active subcategories
- `404 Not Found`: Category not found

### GET /categories/:id/relationships
Get a category with all its relationships (subcategories and parent).

**Authentication:** None required

**Path Parameters:**
- `id` (integer, required): Category ID

**Request Example:**
```http
GET /api/categories/1/relationships
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category with relationships retrieved successfully",
  "data": {
    "category": {
      "id": 1,
      "name": "Agriculture",
      "slug": "agriculture",
      "parent_id": null,
      "subcategories": [
        {
          "id": 2,
          "name": "Fruits",
          "parent_id": 1
          // ... other fields
        }
      ],
      "parent": null
    }
  }
}
```

### PATCH /categories/:id/restore
Restore a soft-deleted category.

**Authentication:** Required (Admin privileges recommended)

**Path Parameters:**
- `id` (integer, required): Category ID

**Request Example:**
```http
PATCH /api/categories/3/restore
```

**Response Example:**
```json
{
  "success": true,
  "message": "Category restored successfully",
  "data": {
    "category": {
      "id": 3,
      "name": "Organic Vegetables",
      "is_active": true
      // ... other fields
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Category is already active
- `404 Not Found`: Category not found

---

# Producers API

## Endpoints Overview

### Authentication & Registration
- `POST /producers/register` - Register new producer
- `POST /producers/login` - Producer login

### Profile Management
- `GET /producers/profile` - Get authenticated producer's profile
- `GET /producers/profile/:id` - Get producer profile by ID
- `PUT /producers/profile` - Update producer profile
- `GET /producers/` - Get all producers (public listing)

### Categories Management
- `GET /producers/profile/categories` - Get producer's categories
- `POST /producers/profile/categories/:categoryId` - Add category to producer
- `PUT /producers/profile/categories` - Update producer categories
- `DELETE /producers/profile/categories/:categoryId` - Remove category from producer

### Business Hours Management
- `GET /producers/profile/business-hours` - Get producer's business hours
- `PUT /producers/profile/business-hours` - Update business hours

### Certifications Management
- `GET /producers/profile/certifications` - Get producer's certifications
- `PUT /producers/profile/certifications` - Update certifications
- `POST /producers/profile/certifications` - Add new certification

### Languages Management
- `GET /producers/profile/languages` - Get producer's languages
- `PUT /producers/profile/languages` - Update languages
- `POST /producers/profile/languages` - Add new language

### Avatar Management
- `PUT /producers/profile/avatar` - Update producer avatar

### Banner Management
- `PUT /producers/profile/banner` - Update producer banner

### Social Media Management
- `GET /producers/profile/social-media` - Get producer's social media
- `PUT /producers/profile/social-media` - Update social media
- `POST /producers/profile/social-media` - Add new social media

### Specialties Management
- `GET /producers/profile/specialties` - Get producer's specialties
- `PUT /producers/profile/specialties` - Update specialties
- `POST /producers/profile/specialties` - Add new specialty

### Debug Endpoints
- `GET /producers/debug/producer-data` - Debug producer data
- `GET /producers/debug/user-check` - Debug user authentication

---

# Posts API

## Endpoints Overview

### Public Endpoints
- `GET /posts` - Get all posts with optional filtering
- `GET /posts/:id` - Get post by ID
- `GET /posts/producer/:producerId` - Get posts by producer
- `GET /posts/:id/images` - Get post images

### Producer-Only Endpoints (Require Authentication)
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/images` - Add images to post
- `PUT /posts/:id/images` - Update post images (replace all)
- `DELETE /posts/:id/images/:imageId` - Remove image from post

## Post Data Structures

### Post Object
```json
{
  "id": 1,
  "producer_id": 5,
  "content": "Fresh organic vegetables harvested today from our farm!",
  "category_id": 1,
  "category_name": "Vegetables",
  "category_slug": "vegetables",
  "status": "published",
  "is_trending": false,
  "is_featured": false,
  "total_views": 25,
  "total_likes": 5,
  "total_comments": 2,
  "total_shares": 1,
  "popularity_score": 17,
  "created_at": "2023-01-01T10:00:00.000Z",
  "updated_at": "2023-01-01T10:00:00.000Z",
  "images": []
}
```

### Post Image Object
```json
{
  "id": 1,
  "post_id": 1,
  "image_url": "https://example.com/image.jpg",
  "alt_text": "Fresh vegetables",
  "display_order": 0,
  "created_at": "2023-01-01T10:00:00.000Z"
}
```

## Posts API Endpoints

### GET /posts
Retrieve all posts with optional filtering and pagination.

**Authentication:** None required

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20, max: 50)
- `producer_id` (integer, optional): Filter by producer ID
- `category_id` (integer, optional): Filter by category ID
- `is_featured` (boolean, optional): Filter by featured status ("true" or "false")
- `is_trending` (boolean, optional): Filter by trending status ("true" or "false")
- `search` (string, optional): Search in post content
- `orderBy` (string, optional): Sort field (default: "created_at")
- `orderDirection` (string, optional): Sort direction ("ASC" or "DESC", default: "DESC")

**Request Example:**
```http
GET /api/posts?page=1&limit=10&category_id=1&is_featured=true
```

**Response Example:**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "producer_id": 5,
        "content": "Fresh organic vegetables harvested today!",
        "category_id": 1,
        "category_name": "Vegetables",
        "status": "published",
        "total_views": 25,
        "total_likes": 5,
        "created_at": "2023-01-01T10:00:00.000Z",
        "images": [
          {
            "id": 1,
            "image_url": "https://example.com/veggies.jpg",
            "alt_text": "Fresh vegetables",
            "display_order": 0
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1
    }
  }
}
```

### GET /posts/:id
Get a specific post by ID.

**Authentication:** None required

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Example:**
```http
GET /api/posts/1
```

**Response Example:**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "post": {
      "id": 1,
      "producer_id": 5,
      "content": "Fresh organic vegetables harvested today!",
      "category_id": 1,
      "status": "published",
      "total_views": 26,
      "total_likes": 5,
      "created_at": "2023-01-01T10:00:00.000Z",
      "images": []
    }
  }
}
```

**Error Responses:**
- `404 Not Found`: Post not found

### GET /posts/producer/:producerId
Get all posts by a specific producer.

**Authentication:** None required

**Path Parameters:**
- `producerId` (integer, required): Producer ID

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20)
- `status` (string, optional): Filter by status ("draft", "published", "archived")
- `orderBy` (string, optional): Sort field (default: "created_at")
- `orderDirection` (string, optional): Sort direction ("ASC" or "DESC")

**Request Example:**
```http
GET /api/posts/producer/5?page=1&limit=10&status=published
```

**Response Example:**
```json
{
  "success": true,
  "message": "Producer posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "content": "Fresh organic vegetables harvested today!",
        "status": "published",
        "total_views": 25,
        "created_at": "2023-01-01T10:00:00.000Z",
        "images": []
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1
    }
  }
}
```

### POST /posts
Create a new post.

**Authentication:** Required (Producer)

**Request Body:**
```json
{
  "content": "Fresh organic vegetables harvested today from our farm!",
  "category_id": 1,
  "status": "published",
  "images": [
    {
      "image_url": "https://example.com/veggies.jpg",
      "alt_text": "Fresh vegetables",
      "display_order": 0
    }
  ]
}
```

**Required Fields:**
- `content`: Post content (1-5000 characters)

**Optional Fields:**
- `category_id`: Category ID
- `status`: "draft", "published", or "archived" (default: "published")
- `images`: Array of image objects

**Request Example:**
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Check out our new harvest of organic tomatoes!",
  "category_id": 1,
  "status": "published",
  "images": [
    {
      "image_url": "https://example.com/tomatoes.jpg",
      "alt_text": "Ripe organic tomatoes"
    }
  ]
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "id": 2,
      "producer_id": 5,
      "content": "Check out our new harvest of organic tomatoes!",
      "category_id": 1,
      "status": "published",
      "total_views": 0,
      "total_likes": 0,
      "created_at": "2023-01-01T11:00:00.000Z",
      "images": [
        {
          "id": 2,
          "image_url": "https://example.com/tomatoes.jpg",
          "alt_text": "Ripe organic tomatoes",
          "display_order": 0
        }
      ]
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Producer access required

### PUT /posts/:id
Update an existing post.

**Authentication:** Required (Producer - own posts only)

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Body:** (All fields optional)
```json
{
  "content": "Updated post content",
  "category_id": 2,
  "status": "published",
  "is_trending": false,
  "is_featured": false
}
```

**Request Example:**
```http
PUT /api/posts/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated: Fresh organic vegetables harvested today!",
  "category_id": 1
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      "id": 1,
      "content": "Updated: Fresh organic vegetables harvested today!",
      "category_id": 1,
      "updated_at": "2023-01-01T11:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Can only update own posts
- `404 Not Found`: Post not found

### DELETE /posts/:id
Delete a post.

**Authentication:** Required (Producer - own posts only)

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Example:**
```http
DELETE /api/posts/1
Authorization: Bearer <token>
```

**Response Example:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Can only delete own posts
- `404 Not Found`: Post not found

### GET /posts/:id/images
Get all images for a specific post.

**Authentication:** None required

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Example:**
```http
GET /api/posts/1/images
```

**Response Example:**
```json
{
  "success": true,
  "message": "Post images retrieved successfully",
  "data": {
    "images": [
      {
        "id": 1,
        "post_id": 1,
        "image_url": "https://example.com/veggies.jpg",
        "alt_text": "Fresh vegetables",
        "display_order": 0,
        "created_at": "2023-01-01T10:00:00.000Z"
      }
    ]
  }
}
```

### POST /posts/:id/images
Add images to an existing post.

**Authentication:** Required (Producer - own posts only)

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Body:**
```json
{
  "images": [
    {
      "image_url": "https://example.com/image2.jpg",
      "alt_text": "Second image",
      "display_order": 1
    }
  ]
}
```

**Request Example:**
```http
POST /api/posts/1/images
Authorization: Bearer <token>
Content-Type: application/json

{
  "images": [
    {
      "image_url": "https://example.com/additional.jpg",
      "alt_text": "Additional harvest photo"
    }
  ]
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Images added successfully",
  "data": {
    "images": [
      {
        "id": 1,
        "image_url": "https://example.com/veggies.jpg",
        "alt_text": "Fresh vegetables",
        "display_order": 0
      },
      {
        "id": 3,
        "image_url": "https://example.com/additional.jpg",
        "alt_text": "Additional harvest photo",
        "display_order": 1
      }
    ]
  }
}
```

### PUT /posts/:id/images
Replace all images for a post.

**Authentication:** Required (Producer - own posts only)

**Path Parameters:**
- `id` (integer, required): Post ID

**Request Body:**
```json
{
  "images": [
    {
      "image_url": "https://example.com/new-image.jpg",
      "alt_text": "New image",
      "display_order": 0
    }
  ]
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Images updated successfully",
  "data": {
    "images": [
      {
        "id": 4,
        "image_url": "https://example.com/new-image.jpg",
        "alt_text": "New image",
        "display_order": 0
      }
    ]
  }
}
```

### DELETE /posts/:id/images/:imageId
Remove a specific image from a post.

**Authentication:** Required (Producer - own posts only)

**Path Parameters:**
- `id` (integer, required): Post ID
- `imageId` (integer, required): Image ID

**Request Example:**
```http
DELETE /api/posts/1/images/2
Authorization: Bearer <token>
```

**Response Example:**
```json
{
  "success": true,
  "message": "Image removed successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Can only modify own posts
- `404 Not Found`: Post or image not found

---

# Test Endpoints and Sample Data

## Authentication Setup
Before testing posts endpoints, you need to:

1. Register a producer account:
```http
POST /api/producers/register
Content-Type: application/json

{
  "email": "testproducer@example.com",
  "password": "TestPass123!",
  "business_name": "Test Farm",
  "owner_name": "Test Owner"
}
```

2. Login to get JWT token:
```http
POST /api/producers/login
Content-Type: application/json

{
  "email": "testproducer@example.com",
  "password": "TestPass123!"
}
```

Use the returned token in `Authorization: Bearer <token>` header for authenticated requests.

## Sample Test Data

### Create Post
```http
POST /api/posts
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "content": "🌱 Just harvested our first batch of organic tomatoes! These beauties were grown using traditional farming methods passed down through generations. Each tomato is hand-picked at peak ripeness for maximum flavor. #OrganicFarming #SriLankanProduce",
  "category_id": 1,
  "status": "published",
  "images": [
    {
      "image_url": "https://example.com/tomatoes1.jpg",
      "alt_text": "Ripe red tomatoes on vine",
      "display_order": 0
    },
    {
      "image_url": "https://example.com/tomatoes2.jpg",
      "alt_text": "Close-up of organic tomato",
      "display_order": 1
    }
  ]
}
```

### Update Post
```http
PUT /api/posts/1
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "content": "🌱 Just harvested our first batch of organic tomatoes! These beauties were grown using traditional farming methods passed down through generations. Each tomato is hand-picked at peak ripeness for maximum flavor. Now available for pre-order! #OrganicFarming #SriLankanProduce",
  "is_featured": true
}
```

### Get Posts with Filtering
```http
GET /api/posts?page=1&limit=5&category_id=1&is_featured=true&orderBy=total_views&orderDirection=DESC
```

### Add Images to Existing Post
```http
POST /api/posts/1/images
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "images": [
    {
      "image_url": "https://example.com/harvest-process.jpg",
      "alt_text": "Harvesting process",
      "display_order": 2
    }
  ]
}
```

## Common Test Scenarios

1. **Create post without images**
2. **Create post with multiple images**
3. **Update post content and metadata**
4. **Add images to existing post**
5. **Replace all images**
6. **Remove specific image**
7. **Delete entire post**
8. **Try to modify another producer's post** (should fail with 403)
9. **Get posts with various filters**
10. **Test pagination**

## Error Testing

### Invalid Post Creation
```http
POST /api/posts
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "content": "",  // Empty content should fail
  "category_id": 999 // Non-existent category
}
```

### Unauthorized Access
```http
PUT /api/posts/1
// Missing Authorization header should return 401
```

### Forbidden Access
```http
DELETE /api/posts/1
Authorization: Bearer <different_producer_token>
// Should return 403 if trying to delete another producer's post
```

---

This completes the Posts API documentation. The API provides full CRUD operations for posts and post images, with proper authentication and authorization controls.
