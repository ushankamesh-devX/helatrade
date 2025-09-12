# HelaTrade API Validation System

## Overview
The HelaTrade API uses a comprehensive validation system built with `express-validator` to ensure data integrity, security, and consistency across all endpoints.

## Validation Architecture

### Centralized Validation Middleware
All validation rules are centralized in `/src/middleware/validation.js` to:
- Ensure consistency across different endpoints
- Make validation rules reusable
- Simplify maintenance and updates
- Provide clear error messages

### Validation Flow
1. **Request comes to route**
2. **Validation middleware runs** (before controller)
3. **handleValidationErrors middleware** processes results
4. **Controller executes** (only if validation passes)

## Validation Categories

### 1. Category Validations
- `validateCreateCategory` - For creating new categories
- `validateUpdateCategory` - For updating existing categories

### 2. Producer Validations
- `validateCreateProducer` - For creating new producers
- `validateUpdateProducer` - For updating producer profiles
- `validateCreateProducerPost` - For creating producer posts
- `validateCreateProducerProduct` - For creating producer products

### 3. Parameter Validations
- `validateProducerIdParam` - For validating producer ID/slug parameters
- `validateUUIDParam` - For validating UUID parameters

### 4. Query Parameter Validations
- `validatePagination` - For page and limit parameters
- `validateProducerFilters` - For search and filter parameters
- `validateProducerStats` - For statistics updates

### 5. Special Validations
- `validateContactProducer` - For contacting producers
- `handleValidationErrors` - Error handling middleware

## Custom Validators

### Sri Lankan Specific Validators
```javascript
// Phone number validation for Sri Lankan format
isValidPhoneNumber(value)
// Accepts: +94XXXXXXXXX, 0XXXXXXXXX, 94XXXXXXXXX

// Location validation for Sri Lankan cities/areas
isValidSriLankanLocation(value)
// Validates common Sri Lankan location patterns

// Year validation
isValidYear(value)
// Validates years between 1800 and current year
```

## Validation Rules

### Producer Data Validation

#### Basic Information
- **Name**: 2-255 characters, alphanumeric with special chars
- **Bio**: Optional, max 2000 characters
- **Location**: Optional, max 255 characters, Sri Lankan format
- **Avatar**: Optional, max 10 characters (emoji)
- **Business Type**: Optional, max 100 characters
- **Founded Year**: Valid year between 1800 and current year

#### Contact Information
- **Email**: Valid email format, normalized
- **Phone**: Sri Lankan phone number format
- **Website**: Valid URL with HTTP/HTTPS
- **Address**: Max 500 characters

#### Social Media URLs
- **Facebook**: Must be from facebook.com domain
- **Instagram**: Must be from instagram.com domain
- **Twitter**: Must be from twitter.com or x.com domain
- **LinkedIn**: Must be from linkedin.com domain
- **YouTube**: Must be from youtube.com domain

#### Arrays and Objects
- **Categories**: Array of valid category IDs (max 10)
- **Specialties**: Array of strings (max 20, each 1-100 chars)
- **Certifications**: Array of certification objects or strings (max 15)
- **Languages**: Array with language and proficiency (max 10)
- **Business Hours**: Object with day-wise operating hours

### Post Data Validation
- **Content**: Required, 1-1000 characters
- **Image URL**: Optional, valid URL
- **Category**: Optional, max 100 characters

### Product Data Validation
- **Name**: Required, 2-255 characters
- **Description**: Optional, max 1000 characters
- **Price**: Optional, positive number
- **Unit**: Optional, max 20 characters (kg, lbs, etc.)
- **Organic/Featured**: Boolean values
- **Min Order Quantity**: Positive integer

### Query Parameters
- **Pagination**: page (min 1), limit (1-50)
- **Search**: 1-100 characters
- **Filters**: category, location, verified status
- **Sorting**: predefined fields only

## Error Response Format

### Validation Error Response
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data provided",
  "details": [
    {
      "field": "email",
      "message": "Must be a valid email address",
      "value": "invalid-email"
    },
    {
      "field": "phone",
      "message": "Must be a valid Sri Lankan phone number",
      "value": "123"
    }
  ]
}
```

## Usage Examples

### In Routes
```javascript
const { validateCreateProducer, handleValidationErrors } = require('../middleware/validation');

router.post('/producers',
  validateCreateProducer,
  handleValidationErrors,
  ProducerController.create
);
```

### Custom Validation
```javascript
body('customField')
  .custom((value, { req }) => {
    if (value && someCondition) {
      throw new Error('Custom validation failed');
    }
    return true;
  })
```

## Security Features

### Input Sanitization
- **Email normalization**: Converts emails to lowercase, removes dots in Gmail
- **String trimming**: Removes whitespace from string inputs
- **HTML escaping**: Prevents XSS attacks (when needed)

### Rate Limiting Protection
- Validation errors don't consume processing power
- Early rejection of invalid requests
- Protection against malformed data attacks

### Data Type Enforcement
- Strict type checking for all fields
- Array length limitations
- String length restrictions
- Number range validations

## Performance Considerations

### Efficient Validation Order
1. Simple validations first (required, length)
2. Format validations (email, URL)
3. Complex custom validations last
4. Database checks (if any) at the end

### Validation Caching
- Validation rules are compiled once at startup
- No runtime compilation overhead
- Reusable validation chains

## Testing Validation

### Test Data Available
- Valid and invalid examples in `validation.test.examples.js`
- Covers all validation scenarios
- Edge cases and boundary conditions

### Testing Approach
```javascript
// Example test
const request = require('supertest');
const app = require('../server');

describe('Producer Validation', () => {
  test('should reject invalid email', async () => {
    const response = await request(app)
      .post('/api/producers')
      .send({ ...validData, email: 'invalid-email' });
    
    expect(response.status).toBe(422);
    expect(response.body.error).toBe('Validation Error');
  });
});
```

## Extending Validations

### Adding New Validations
1. Add validation function to `validation.js`
2. Export it in the module.exports
3. Import and use in routes
4. Add test examples
5. Update documentation

### Custom Validator Pattern
```javascript
const validateNewEntity = [
  body('field1')
    .notEmpty()
    .withMessage('Field1 is required'),
  
  body('field2')
    .custom(customValidatorFunction)
    .withMessage('Custom validation message')
];
```

## Best Practices

### Validation Rules
- Always validate required fields first
- Use specific error messages
- Validate data types strictly
- Set reasonable limits for arrays and strings
- Use custom validators for business logic

### Error Messages
- Be specific about what's wrong
- Include expected format/range
- Don't expose internal system details
- Use consistent terminology

### Performance
- Order validations by complexity (simple first)
- Use early returns in custom validators
- Cache compiled validation chains
- Avoid database calls in validation when possible

## Maintenance

### Regular Updates
- Review validation rules quarterly
- Update regex patterns as needed
- Add new business rules as requirements change
- Monitor validation error logs for patterns

### Documentation
- Keep this documentation updated
- Add examples for new validations
- Document any custom business rules
- Maintain test examples

This validation system ensures data quality, security, and consistency across the HelaTrade API while providing clear feedback to API consumers.