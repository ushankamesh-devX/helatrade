# HelaTrade Backend

Backend API server for the HelaTrade platform - connecting Sri Lankan producers with retail stores.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Setup database**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE helatrade;"
   
   # Import schema
   mysql -u root -p helatrade < database/categories_schema.sql
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   └── categoryController.js # Category business logic
│   ├── middleware/
│   │   └── validation.js        # Request validation
│   ├── models/
│   │   └── Category.js          # Category data model
│   ├── routes/
│   │   └── categoryRoutes.js    # Category API routes
│   └── utils/                   # Utility functions
├── docs/
│   └── categories_api.md        # API documentation
├── database/
│   └── categories_schema.sql    # Database schema
├── server.js                    # Main application entry
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment template
└── README.md                    # This file
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix code style issues

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/slug/:slug` - Get category by slug
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Health Check
- `GET /health` - Server health status

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=helatrade

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## Database Setup

1. **Create database:**
   ```sql
   CREATE DATABASE helatrade;
   ```

2. **Import schema:**
   ```bash
   mysql -u root -p helatrade < database/categories_schema.sql
   ```

## Features

✅ **Express.js** - Fast, minimalist web framework  
✅ **MySQL** - Reliable database with connection pooling  
✅ **Input Validation** - Request validation with express-validator  
✅ **Error Handling** - Comprehensive error responses  
✅ **Security** - Helmet, CORS, rate limiting  
✅ **Logging** - Morgan HTTP request logger  
✅ **Development** - Hot reload with nodemon  

## API Documentation

Complete API documentation is available in the `docs/` directory:
- [Categories API](docs/categories_api.md)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Deployment

1. **Production environment:**
   ```bash
   NODE_ENV=production npm start
   ```

2. **Environment setup:**
   - Set all required environment variables
   - Configure database connection
   - Setup SSL certificates (recommended)

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Follow eslint rules
5. Create descriptive commit messages

## License

MIT License - see LICENSE file for details