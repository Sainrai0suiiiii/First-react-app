# Grocery Store Backend API

A professional, scalable backend API for an online grocery store built with Node.js, Express, Sequelize, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: Full CRUD operations with image uploads, categories, and search
- **User Management**: User profiles, registration, and admin user management
- **Order Processing**: Complete order lifecycle management
- **Cart Management**: Shopping cart functionality
- **Security**: Rate limiting, input validation, security headers, and CORS protection
- **Logging**: Comprehensive logging with Winston
- **File Uploads**: Secure image upload handling with Multer
- **API Documentation**: Built-in API documentation endpoint
- **Health Monitoring**: Health check endpoints and graceful shutdown

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES6 Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: Helmet, Rate Limiting
- **Logging**: Winston
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend/Authentication
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb grocery_store

# Or using psql
psql -U postgres
CREATE DATABASE grocery_store;
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
src/
├── controller/          # Business logic controllers
│   ├── auth/           # Authentication controllers
│   ├── product/        # Product management
│   ├── user/           # User management
│   ├── cart/           # Cart operations
│   └── order/          # Order processing
├── models/             # Sequelize models
│   ├── user/           # User model
│   ├── product/        # Product model
│   ├── order/          # Order models
│   └── cart/           # Cart model
├── middleware/         # Express middleware
│   ├── validation.js   # Input validation
│   ├── security.js     # Security middleware
│   ├── token-middleware.js # JWT authentication
│   └── multerConfig.js # File upload configuration
├── route/              # API routes
├── database/           # Database configuration
├── security/           # Security utilities
├── utils/              # Utility functions
└── index.js            # Main server file
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | grocery_store |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | - |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `secretkey` | JWT secret key | - |
| `expiresIn` | JWT expiration | 7d |
| `FRONTEND_URL` | Frontend URL | http://localhost:5173 |

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user (protected)

### Product Endpoints

- `GET /api/v1/products` - Get all products (with pagination & filters)
- `GET /api/v1/products/:id` - Get product by ID
- `GET /api/v1/products/slug/:slug` - Get product by slug
- `GET /api/v1/products/category/:category` - Get products by category
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/products/categories` - Get all categories
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### User Endpoints

- `GET /api/v1/users/profile` - Get user profile (protected)
- `PUT /api/v1/users/profile` - Update user profile (protected)
- `GET /api/v1/users` - Get all users (admin)
- `PUT /api/v1/users/:id` - Update user (admin)
- `DELETE /api/v1/users/:id` - Delete user (admin)

### Cart Endpoints

- `GET /api/v1/cart` - Get user cart (protected)
- `POST /api/v1/cart` - Add item to cart (protected)
- `PUT /api/v1/cart/:id` - Update cart item (protected)
- `DELETE /api/v1/cart/:id` - Remove item from cart (protected)
- `DELETE /api/v1/cart` - Clear cart (protected)

### Order Endpoints

- `GET /api/v1/orders` - Get user orders (protected)
- `POST /api/v1/orders` - Create new order (protected)
- `GET /api/v1/orders/:id` - Get order details (protected)
- `PUT /api/v1/orders/:id/status` - Update order status (admin)

## 🔍 API Features

### Product Filtering & Search

```bash
# Get products with filters
GET /api/v1/products?search=apple&category=fruits&minPrice=1&maxPrice=10&inStock=true&page=1&limit=10&sortBy=price&sortOrder=ASC
```

### Pagination

All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation using express-validator
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Configurable CORS settings
- **File Upload Security**: File type and size validation
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Security**: Secure token-based authentication

## 📊 Logging

The application uses Winston for comprehensive logging:

- **Console Logging**: Colored output for development
- **File Logging**: Separate error and combined logs
- **Log Levels**: Error, Warn, Info, Debug
- **Structured Logging**: JSON format with timestamps

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Production Deployment

### 1. Environment Setup

```bash
NODE_ENV=production
PORT=5000
# Set all required environment variables
```

### 2. Database Migration

```bash
npm run migrate
```

### 3. Start Production Server

```bash
npm start   
```

### 4. Process Management (PM2)

```bash
npm install -g pm2
pm2 start src/index.js --name "grocery-store-api"
pm2 save
pm2 startup
```

## 🔧 Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/docs`
- Review the health check at `/health`

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added enhanced security and validation
- **v1.2.0** - Added comprehensive logging and monitoring
