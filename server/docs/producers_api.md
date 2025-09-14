# Producer API Endpoints Documentation

## Overview
This document outlines the REST API endpoints required for the Producer functionality based on the ProducerProfile.jsx component analysis.

## Base URL
All endpoints are prefixed with `/api/producers`

## Authentication
Most endpoints require authentication. Public endpoints are marked as such.

### JWT Token Usage
After successful login or registration, include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter  
- At least one number

---

## Authentication Endpoints

### 1. Producer Registration
```
POST /api/producers/register
```
**Public**: Yes  
**Request Body**:
```json
{
  "name": "Highland Tea Estate",
  "email": "info@highlandtea.lk",
  "password": "SecurePassword123",
  "location": "Nuwara Eliya, Sri Lanka",
  "phone": "+94 777 123 456",
  "businessType": "Family-owned Tea Estate",
  "bio": "Premium Ceylon tea direct from high-altitude plantations...",
  "avatar": "🍃",
  "categories": [1, 2, 3], // Category IDs
  "specialties": ["Ceylon Black Tea", "Green Tea"],
  "certifications": ["Organic Certification"],
  "languages": [
    { "language": "English", "proficiency": "advanced" }
  ],
  "businessHours": {
    "monday": { "isOpen": true, "openTime": "08:00", "closeTime": "17:00" }
  },
  "socialMedia": {
    "facebook": "https://facebook.com/highlandteaestate",
    "instagram": "https://instagram.com/highland_tea_estate"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "highland-tea-estate",
    "name": "Highland Tea Estate",
    "email": "info@highlandtea.lk",
    "verified": false,
    "status": "pending",
    "location": "Nuwara Eliya, Sri Lanka",
    "businessType": "Family-owned Tea Estate",
    "avatar": "🍃",
    "contact": {
      "email": "info@highlandtea.lk",
      "phone": "+94 777 123 456"
    },
    "socialMedia": {
      "facebook": "https://facebook.com/highlandteaestate",
      "instagram": "https://instagram.com/highland_tea_estate"
    },
    "categories": [...],
    "specialties": [...],
    "certifications": [...],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token_string",
  "message": "Producer registered successfully"
}
```

### 2. Producer Login
```
POST /api/producers/login
```
**Public**: Yes  
**Request Body**:
```json
{
  "email": "info@highlandtea.lk",
  "password": "SecurePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "highland-tea-estate", 
    "name": "Highland Tea Estate",
    "email": "info@highlandtea.lk",
    "verified": false,
    "status": "active",
    "location": "Nuwara Eliya, Sri Lanka",
    "businessType": "Family-owned Tea Estate",
    "avatar": "🍃",
    "contact": {
      "email": "info@highlandtea.lk",
      "phone": "+94 777 123 456"
    },
    "socialMedia": {
      "facebook": "https://facebook.com/highlandteaestate",
      "instagram": "https://instagram.com/highland_tea_estate"
    },
    "categories": [...],
    "specialties": [...],
    "certifications": [...]
  },
  "token": "jwt_token_string",
  "message": "Login successful"
}
```

### 3. Update Password
```
PUT /api/producers/password
```
**Authentication**: Required (Producer only)  
**Request Body**:
```json
{
  "currentPassword": "CurrentPassword123",
  "newPassword": "NewSecurePassword123",
  "confirmPassword": "NewSecurePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Producer CRUD Operations

### 1. Get All Producers
```
GET /api/producers
```
**Public**: Yes  
**Query Parameters**:
- `page` (number, default: 1) - Page number for pagination
- `limit` (number, default: 10) - Number of results per page
- `search` (string) - Search by name or location
- `category` (string) - Filter by category slug
- `location` (string) - Filter by location
- `verified` (boolean) - Filter by verification status
- `sort` (string) - Sort by: name, rating, connections, created_at
- `order` (string) - asc or desc

**Response**:
```json
{
  "success": true,
  "data": {
    "producers": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### 2. Get Producer by ID/Slug
```
GET /api/producers/:identifier
```
**Public**: Yes  
**Parameters**: 
- `identifier` - Can be producer ID or slug

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "highland-tea-estate",
    "name": "Highland Tea Estate",
    "bio": "...",
    "location": "Nuwara Eliya, Sri Lanka",
    "avatar": "🍃",
    "profileImage": "https://...",
    "coverImage": "https://...",
    "verified": true,
    "businessType": "Family-owned Tea Estate",
    "foundedYear": 1972,
    "contact": {
      "email": "info@highlandtea.lk",
      "phone": "+94 777 123 456",
      "website": "www.highlandtea.lk",
      "address": "Highland Estate Road, Nuwara Eliya 22200, Sri Lanka"
    },
    "socialMedia": {
      "facebook": "https://facebook.com/highlandteaestate",
      "instagram": "https://instagram.com/highland_tea_estate",
      ...
    },
    "statistics": {
      "connections": 245,
      "posts": 127,
      "likes": 8950,
      "rating": 4.8,
      "totalOrders": 450
    },
    "categories": [
      { "id": 1, "name": "Tea", "slug": "tea", "icon": "🍃" }
    ],
    "specialties": ["Ceylon Black Tea", "Green Tea", ...],
    "certifications": ["Organic Certification", ...],
    "languages": [
      { "language": "English", "proficiency": "advanced" }
    ],
    "businessHours": {
      "monday": { "isOpen": true, "openTime": "08:00", "closeTime": "17:00" }
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 3. Create Producer (Legacy)
```
POST /api/producers
```
**Authentication**: Required  
**Note**: This is a legacy endpoint. Use `/api/producers/register` for new producer registration with authentication.

**Request Body**:
```json
{
  "name": "Highland Tea Estate",
  "bio": "Premium Ceylon tea...",
  "location": "Nuwara Eliya, Sri Lanka",
  "avatar": "🍃",
  "businessType": "Family-owned Tea Estate",
  "foundedYear": 1972,
  "contact": {
    "email": "info@highlandtea.lk",
    "phone": "+94 777 123 456",
    "website": "www.highlandtea.lk",
    "address": "Highland Estate Road, Nuwara Eliya 22200, Sri Lanka"
  },
  "socialMedia": {
    "facebook": "https://facebook.com/highlandteaestate",
    ...
  },
  "categories": [1, 2, 3], // Category IDs
  "specialties": ["Ceylon Black Tea", "Green Tea"],
  "certifications": ["Organic Certification"],
  "languages": [
    { "language": "English", "proficiency": "advanced" }
  ],
  "businessHours": {
    "monday": { "isOpen": true, "openTime": "08:00", "closeTime": "17:00" }
  }
}
```

### 4. Update Producer
```
PUT /api/producers/:id
```
**Authentication**: Required (Owner or Admin)

### 5. Delete Producer
```
DELETE /api/producers/:id
```
**Authentication**: Required (Owner or Admin)

---

## Producer Profile Sections

### 6. Get Producer Posts
```
GET /api/producers/:id/posts
```
**Public**: Yes  
**Query Parameters**:
- `page`, `limit` - Pagination
- `category` - Filter by post category

### 7. Create Producer Post
```
POST /api/producers/:id/posts
```
**Authentication**: Required (Owner)  
**Request Body**:
```json
{
  "content": "Fresh tea leaves harvested this morning...",
  "imageUrl": "https://...",
  "category": "Tea"
}
```

### 8. Get Producer Products
```
GET /api/producers/:id/products
```
**Public**: Yes  
**Query Parameters**:
- `page`, `limit` - Pagination
- `category` - Filter by product category
- `inStock` (boolean) - Filter by stock status
- `featured` (boolean) - Filter featured products

### 9. Create Producer Product
```
POST /api/producers/:id/products
```
**Authentication**: Required (Owner)  
**Request Body**:
```json
{
  "name": "Premium Ceylon Black Tea",
  "description": "High-quality black tea...",
  "pricePerUnit": 25.00,
  "unit": "kg",
  "imageUrl": "https://...",
  "category": "Black Tea",
  "isOrganic": true,
  "isFeatured": true,
  "minOrderQuantity": 10
}
```

---

## Connection Management

### 10. Follow/Connect to Producer
```
POST /api/producers/:id/connect
```
**Authentication**: Required

### 11. Unfollow Producer
```
DELETE /api/producers/:id/connect
```
**Authentication**: Required

### 12. Get Producer Connections
```
GET /api/producers/:id/connections
```
**Public**: Yes  
**Query Parameters**:
- `type` - follower or following
- `page`, `limit` - Pagination

---

## Search and Discovery

### 13. Search Producers
```
GET /api/producers/search
```
**Public**: Yes  
**Query Parameters**:
- `q` (string) - Search query
- `location` - Filter by location
- `category` - Filter by category
- `verified` (boolean) - Filter verified producers
- `rating` (number) - Minimum rating filter

### 14. Get Similar Producers
```
GET /api/producers/:id/similar
```
**Public**: Yes  
**Query Parameters**:
- `limit` (number, default: 5) - Number of similar producers

### 15. Get Featured Producers
```
GET /api/producers/featured
```
**Public**: Yes  
**Query Parameters**:
- `limit` (number, default: 10)
- `category` - Filter by category

---

## Statistics and Analytics

### 16. Get Producer Statistics
```
GET /api/producers/:id/stats
```
**Authentication**: Required (Owner or Admin)  
**Response**:
```json
{
  "success": true,
  "data": {
    "views": 1250,
    "connections": 245,
    "posts": 127,
    "likes": 8950,
    "profileVisits": 892,
    "productViews": 2340,
    "contactRequests": 45
  }
}
```

### 17. Update Producer Statistics
```
PATCH /api/producers/:id/stats
```
**Authentication**: System only (for internal use)

---

## Verification and Status

### 18. Request Verification
```
POST /api/producers/:id/verify
```
**Authentication**: Required (Owner)  
**Request Body**:
```json
{
  "documents": ["url1", "url2"],
  "message": "Additional verification information"
}
```

### 19. Update Producer Status
```
PATCH /api/producers/:id/status
```
**Authentication**: Required (Admin)  
**Request Body**:
```json
{
  "status": "active|inactive|pending|suspended",
  "reason": "Optional reason for status change"
}
```

---

## File Upload Endpoints

### 20. Upload Profile Image
```
POST /api/producers/:id/upload/profile
```
**Authentication**: Required (Owner)  
**Content-Type**: multipart/form-data

### 21. Upload Cover Image
```
POST /api/producers/:id/upload/cover
```
**Authentication**: Required (Owner)  
**Content-Type**: multipart/form-data

---

## Business Hours Management

### 22. Update Business Hours
```
PUT /api/producers/:id/business-hours
```
**Authentication**: Required (Owner)  
**Request Body**:
```json
{
  "monday": { "isOpen": true, "openTime": "08:00", "closeTime": "17:00" },
  "tuesday": { "isOpen": true, "openTime": "08:00", "closeTime": "17:00" },
  ...
}
```

---

## Engagement Endpoints

### 23. Like Producer Post
```
POST /api/producers/posts/:postId/like
```
**Authentication**: Required

### 24. Save Producer Post
```
POST /api/producers/posts/:postId/save
```
**Authentication**: Required

### 25. Contact Producer
```
POST /api/producers/:id/contact
```
**Authentication**: Required  
**Request Body**:
```json
{
  "subject": "Inquiry about your products",
  "message": "I'm interested in your tea products...",
  "contactMethod": "email|phone",
  "productId": "optional-product-id"
}
```

---

## Error Responses
All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message",
  "details": {} // Optional additional error details
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error