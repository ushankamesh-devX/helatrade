# Store APIs Documentation

This document provides comprehensive documentation for the HelaTrade Store APIs, including endpoints, request/response formats, validation rules, and test cases.

## Table of Contents

1. [Authentication](#authentication)
2. [Store Registration & Authentication](#store-registration--authentication)
3. [Store Profile Management](#store-profile-management)
4. [Store Connections](#store-connections)
5. [Public Store APIs](#public-store-apis)
6. [Validation Rules](#validation-rules)
7. [Test Cases](#test-cases)
8. [Error Handling](#error-handling)

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The JWT token contains the following payload for stores:
```json
{
  "storeId": "uuid",
  "email": "store@example.com",
  "type": "store",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Store Registration & Authentication

### Register Store

**Endpoint:** `POST /api/stores/register`  
**Access:** Public  
**Description:** Register a new store account

**Request Body:**
```json
{
  "ownerName": "John Smith",
  "storeName": "Fresh Market",
  "email": "john@freshmarket.lk",
  "password": "Password123",
  "businessType": "retail",
  "phone": "+94 77 123 4567",
  "website": "https://freshmarket.lk",
  "description": "Quality fresh products from local producers",
  "businessFocus": "We focus on organic and locally-grown products",
  "location": {
    "province": "Western",
    "district": "Colombo",
    "city": "Colombo",
    "address": "123 Main Street, Colombo 03",
    "postalCode": "00300"
  },
  "interestedCategories": [1, 2, 4],
  "specialties": ["Organic Products", "Local Produce"],
  "deliveryOptions": [
    { "type": "pickup", "available": true, "cost": 0 },
    { "type": "local_delivery", "available": true, "cost": 200 }
  ],
  "paymentMethods": [
    { "type": "cash", "available": true },
    { "type": "card", "available": true, "provider": "Visa/Mastercard" }
  ],
  "operatingHours": {
    "weekdays": "8:00 AM - 8:00 PM",
    "weekends": "8:00 AM - 9:00 PM"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "store": {
      "id": "uuid",
      "slug": "fresh-market",
      "ownerName": "John Smith",
      "storeName": "Fresh Market",
      "verified": false,
      "businessType": "retail",
      "status": "pending",
      "createdAt": "2025-09-14T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Store registered successfully"
}
```

### Store Login

**Endpoint:** `POST /api/stores/login`  
**Access:** Public  
**Description:** Authenticate store and get access token

**Request Body:**
```json
{
  "email": "john@freshmarket.lk",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "store": {
      "id": "uuid",
      "slug": "fresh-market",
      "ownerName": "John Smith",
      "storeName": "Fresh Market",
      "email": "john@freshmarket.lk",
      "verified": false,
      "businessType": "retail",
      "lastLogin": "2025-09-14T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

## Store Profile Management

### Get Store Profile

**Endpoint:** `GET /api/stores/profile`  
**Access:** Private (Store)  
**Description:** Get authenticated store's complete profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "fresh-market",
    "ownerName": "John Smith",
    "storeName": "Fresh Market",
    "storeDescription": "Quality fresh products from local producers",
    "businessType": "retail",
    "storeSize": "medium",
    "establishedYear": 2018,
    "contact": {
      "email": "john@freshmarket.lk",
      "phone": "+94 77 123 4567",
      "website": "https://freshmarket.lk"
    },
    "location": {
      "address": "123 Main Street, Colombo 03",
      "city": "Colombo",
      "district": "Colombo",
      "province": "Western",
      "postalCode": "00300"
    },
    "categories": [
      {
        "id": 1,
        "name": "Vegetables",
        "slug": "vegetables",
        "interestLevel": "high"
      }
    ],
    "specialties": [
      {
        "specialty": "Organic Products",
        "priority": "high"
      }
    ],
    "deliveryOptions": [
      {
        "deliveryType": "pickup",
        "isAvailable": true,
        "cost": "0.00"
      }
    ],
    "statistics": {
      "connections": 15,
      "orders": 45,
      "rating": 4.6
    }
  }
}
```

### Update Store Profile

**Endpoint:** `PUT /api/stores/profile`  
**Access:** Private (Store)  
**Description:** Update store profile information

**Request Body:**
```json
{
  "storeName": "Fresh Market Pro",
  "storeDescription": "Premium quality fresh products",
  "storeSize": "large",
  "establishedYear": 2018,
  "phone": "+94 77 123 4568",
  "website": "https://freshmarketpro.lk",
  "location": {
    "address": "456 New Street, Colombo 03",
    "city": "Colombo",
    "district": "Colombo",
    "province": "Western",
    "postalCode": "00300"
  },
  "socialMedia": {
    "facebook": "https://facebook.com/freshmarketpro",
    "instagram": "@freshmarketpro",
    "whatsapp": "+94 77 123 4568"
  },
  "specialties": [
    { "name": "Organic Products", "priority": "high" },
    { "name": "Local Produce", "priority": "medium" }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "storeName": "Fresh Market Pro",
    "storeDescription": "Premium quality fresh products"
  },
  "message": "Store profile updated successfully"
}
```

### Update Password

**Endpoint:** `PUT /api/stores/password`  
**Access:** Private (Store)  
**Description:** Update store account password

**Request Body:**
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456",
  "confirmPassword": "NewPassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

## Store Connections

### Get Store Connections

**Endpoint:** `GET /api/stores/connections`  
**Access:** Private (Store)  
**Description:** Get store's connections with producers

**Query Parameters:**
- `status` (optional): Filter by connection status (pending, accepted, blocked, rejected)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)

**Example:** `GET /api/stores/connections?status=accepted&page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "connections": [
      {
        "id": "producer-uuid",
        "name": "Highland Tea Estate",
        "location": "Nuwara Eliya, Sri Lanka",
        "verified": true,
        "rating": 4.8,
        "status": "accepted",
        "connectionType": "preferred",
        "connectedAt": "2025-09-10T08:00:00.000Z",
        "notes": "Excellent quality tea supplier"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

### Connect with Producer

**Endpoint:** `POST /api/stores/connections/:producerId`  
**Access:** Private (Store)  
**Description:** Send connection request to a producer

**Request Body:**
```json
{
  "notes": "Interested in your organic vegetable products"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Connection request sent successfully"
}
```

### Update Connection

**Endpoint:** `PUT /api/stores/connections/:producerId`  
**Access:** Private (Store)  
**Description:** Update connection status or type

**Request Body:**
```json
{
  "status": "accepted",
  "connectionType": "preferred"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Connection updated successfully"
}
```

### Remove Connection

**Endpoint:** `DELETE /api/stores/connections/:producerId`  
**Access:** Private (Store)  
**Description:** Remove connection with producer

**Response (200):**
```json
{
  "success": true,
  "message": "Connection removed successfully"
}
```

## Public Store APIs

### Get All Stores

**Endpoint:** `GET /api/stores`  
**Access:** Public  
**Description:** Get list of stores with filtering and pagination

**Query Parameters:**
- `search` (optional): Search in store name, city, description
- `businessType` (optional): Filter by business type
- `location` (optional): Filter by location
- `verified` (optional): Filter by verification status
- `page` (optional): Page number
- `limit` (optional): Items per page
- `sort` (optional): Sort field (store_name, rating, connections_count, created_at)
- `order` (optional): Sort order (asc, desc)

**Example:** `GET /api/stores?businessType=retail&location=Colombo&page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stores": [
      {
        "id": "uuid",
        "slug": "fresh-market",
        "storeName": "Fresh Market",
        "businessType": "retail",
        "location": {
          "city": "Colombo",
          "district": "Colombo",
          "province": "Western"
        },
        "verified": true,
        "rating": 4.6,
        "connectionsCount": 15
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### Get Store by ID/Slug

**Endpoint:** `GET /api/stores/:identifier`  
**Access:** Public  
**Description:** Get public store profile by ID or slug

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "fresh-market",
    "storeName": "Fresh Market",
    "storeDescription": "Quality fresh products from local producers",
    "businessType": "retail",
    "verified": true,
    "location": {
      "city": "Colombo",
      "district": "Colombo",
      "province": "Western"
    },
    "categories": ["Vegetables", "Fruits"],
    "specialties": ["Organic Products", "Local Produce"],
    "statistics": {
      "connections": 15,
      "rating": 4.6
    }
  }
}
```

### Search Stores

**Endpoint:** `GET /api/stores/search`  
**Access:** Public  
**Description:** Search stores by query

**Query Parameters:**
- `q`: Search query
- `businessType` (optional): Filter by business type
- `location` (optional): Filter by location
- `page` (optional): Page number
- `limit` (optional): Items per page

**Example:** `GET /api/stores/search?q=fresh&businessType=retail`

### Get Featured Stores

**Endpoint:** `GET /api/stores/featured`  
**Access:** Public  
**Description:** Get featured/verified stores with high ratings

**Query Parameters:**
- `limit` (optional): Number of stores (default: 10, max: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "storeName": "Fresh Market",
      "businessType": "retail",
      "verified": true,
      "rating": 4.8,
      "location": {
        "city": "Colombo",
        "province": "Western"
      }
    }
  ]
}
```

## Validation Rules

### Store Registration Validation

- **ownerName**: Required, 2-255 characters, alphanumeric with spaces
- **storeName**: Required, 2-255 characters, alphanumeric with spaces
- **email**: Required, valid email format, unique
- **password**: Required, minimum 8 characters, must contain uppercase, lowercase, and number
- **businessType**: Required, must be one of: retail, wholesale, restaurant, export, processing, online
- **phone**: Optional, valid mobile phone format
- **website**: Optional, valid URL format
- **location fields**: Optional, max 100 characters each
- **description**: Optional, max 1000 characters
- **interestedCategories**: Optional array of category IDs

### Profile Update Validation

- All fields optional for updates
- Same format requirements as registration
- **establishedYear**: Must be between 1900 and current year
- **storeSize**: Must be one of: small, medium, large

### Password Update Validation

- **currentPassword**: Required
- **newPassword**: Same requirements as registration password
- **confirmPassword**: Must match newPassword

## Test Cases

### 1. Store Registration Tests

#### Test Case 1.1: Successful Registration
```bash
POST /api/stores/register
Content-Type: application/json

{
  "ownerName": "Sarah Wilson",
  "storeName": "Sarah's Fresh Market",
  "email": "sarah@freshmarket.lk",
  "password": "Password123",
  "businessType": "retail"
}

Expected: 201 Created with store data and JWT token
```

#### Test Case 1.2: Registration with Duplicate Email
```bash
POST /api/stores/register
Content-Type: application/json

{
  "ownerName": "John Doe",
  "storeName": "Another Market",
  "email": "sarah@freshmarket.lk",
  "password": "Password123",
  "businessType": "retail"
}

Expected: 409 Conflict - "Store with this email already exists"
```

#### Test Case 1.3: Registration with Invalid Data
```bash
POST /api/stores/register
Content-Type: application/json

{
  "ownerName": "A",
  "storeName": "",
  "email": "invalid-email",
  "password": "123",
  "businessType": "invalid_type"
}

Expected: 422 Validation Error with detailed field errors
```

### 2. Authentication Tests

#### Test Case 2.1: Successful Login
```bash
POST /api/stores/login
Content-Type: application/json

{
  "email": "sarah@freshmarket.lk",
  "password": "Password123"
}

Expected: 200 OK with store data and JWT token
```

#### Test Case 2.2: Login with Wrong Password
```bash
POST /api/stores/login
Content-Type: application/json

{
  "email": "sarah@freshmarket.lk",
  "password": "WrongPassword"
}

Expected: 401 Unauthorized - "Invalid email or password"
```

#### Test Case 2.3: Login with Non-existent Email
```bash
POST /api/stores/login
Content-Type: application/json

{
  "email": "nonexistent@example.com",
  "password": "Password123"
}

Expected: 401 Unauthorized - "Invalid email or password"
```

### 3. Profile Management Tests

#### Test Case 3.1: Get Profile with Valid Token
```bash
GET /api/stores/profile
Authorization: Bearer <valid_jwt_token>

Expected: 200 OK with complete store profile
```

#### Test Case 3.2: Get Profile without Token
```bash
GET /api/stores/profile

Expected: 401 Access Denied - "No token provided"
```

#### Test Case 3.3: Get Profile with Invalid Token
```bash
GET /api/stores/profile
Authorization: Bearer invalid_token

Expected: 403 Invalid Token
```

#### Test Case 3.4: Update Profile Successfully
```bash
PUT /api/stores/profile
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "storeName": "Sarah's Premium Market",
  "storeDescription": "Premium quality products",
  "phone": "+94 77 999 8888"
}

Expected: 200 OK with updated profile data
```

#### Test Case 3.5: Update Profile with Invalid Data
```bash
PUT /api/stores/profile
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "storeName": "A",
  "establishedYear": 1800,
  "storeSize": "invalid_size"
}

Expected: 422 Validation Error
```

### 4. Connection Management Tests

#### Test Case 4.1: Get Connections Successfully
```bash
GET /api/stores/connections?status=accepted&page=1&limit=10
Authorization: Bearer <valid_jwt_token>

Expected: 200 OK with connections list and pagination
```

#### Test Case 4.2: Connect with Producer
```bash
POST /api/stores/connections/producer-uuid-123
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "notes": "Interested in your organic products"
}

Expected: 201 Created - Connection request sent
```

#### Test Case 4.3: Connect with Same Producer Twice
```bash
POST /api/stores/connections/producer-uuid-123
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "notes": "Second attempt"
}

Expected: 409 Conflict - "Connection already exists"
```

#### Test Case 4.4: Update Connection Status
```bash
PUT /api/stores/connections/producer-uuid-123
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "status": "accepted",
  "connectionType": "preferred"
}

Expected: 200 OK - Connection updated
```

### 5. Public API Tests

#### Test Case 5.1: Get All Stores with Filters
```bash
GET /api/stores?businessType=retail&location=Colombo&page=1&limit=5

Expected: 200 OK with filtered stores list
```

#### Test Case 5.2: Get Store by Valid Slug
```bash
GET /api/stores/sarahs-fresh-market

Expected: 200 OK with public store profile
```

#### Test Case 5.3: Get Store by Invalid ID
```bash
GET /api/stores/invalid-id-123

Expected: 404 Not Found - "Store not found"
```

#### Test Case 5.4: Search Stores
```bash
GET /api/stores/search?q=fresh&businessType=retail&limit=10

Expected: 200 OK with search results
```

#### Test Case 5.5: Get Featured Stores
```bash
GET /api/stores/featured?limit=5

Expected: 200 OK with top-rated verified stores
```

### 6. Password Update Tests

#### Test Case 6.1: Successful Password Update
```bash
PUT /api/stores/password
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456",
  "confirmPassword": "NewPassword456"
}

Expected: 200 OK - "Password updated successfully"
```

#### Test Case 6.2: Wrong Current Password
```bash
PUT /api/stores/password
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "currentPassword": "WrongPassword",
  "newPassword": "NewPassword456",
  "confirmPassword": "NewPassword456"
}

Expected: 400 Bad Request - "Current password is incorrect"
```

#### Test Case 6.3: Password Confirmation Mismatch
```bash
PUT /api/stores/password
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456",
  "confirmPassword": "DifferentPassword789"
}

Expected: 422 Validation Error - "Password confirmation does not match"
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid request data"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "error": "Access Denied",
  "message": "No token provided"
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": "Access Forbidden",
  "message": "Store access required"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Store not found"
}
```

#### 409 Conflict
```json
{
  "success": false,
  "error": "Conflict",
  "message": "Store with this email already exists"
}
```

#### 422 Validation Error
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": [
    {
      "field": "storeName",
      "message": "Store name must be between 2 and 255 characters",
      "value": "A"
    },
    {
      "field": "email",
      "message": "Valid email is required",
      "value": "invalid-email"
    }
  ]
}
```

#### 429 Too Many Requests
```json
{
  "success": false,
  "error": "Too Many Requests",
  "message": "Too many attempts. Please try again later.",
  "retryAfter": 900
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

Sensitive endpoints have rate limiting applied:

- **Login attempts**: 5 attempts per 15 minutes per IP
- **Password reset**: 3 attempts per hour per email
- **Registration**: 10 attempts per hour per IP

## Security Considerations

1. **Password Storage**: Passwords are hashed using bcrypt with 12 salt rounds
2. **JWT Tokens**: Tokens expire after 24 hours by default
3. **Input Validation**: All inputs are validated and sanitized
4. **SQL Injection**: Protection through parameterized queries
5. **XSS Protection**: Input escaping and output encoding
6. **Rate Limiting**: Applied to prevent abuse
7. **CORS**: Configured for frontend domains only

## Database Schema Dependencies

The Store APIs depend on the following database tables:
- `stores` (main store data)
- `store_categories` (interested categories)
- `store_specialties` (store specialties)
- `store_certifications` (business certifications)
- `store_business_hours` (operating hours)
- `store_delivery_options` (delivery methods)
- `store_payment_methods` (payment options)
- `store_producer_connections` (producer relationships)
- `categories` (product categories)
- `producers` (producer data for connections)

Ensure all tables are created using the `stores_schema.sql` file before using these APIs.