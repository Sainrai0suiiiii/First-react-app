import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import forgotPasswordRouter from './route/auth/forgotPasswordRoute.js';


import { db } from "./database/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import {
  authRateLimit,
  createRateLimit,
  requestLogger,
  requestSizeLimit,
  securityHeaders,
  uploadRateLimit
} from "./middleware/security.js";
import { authenticateToken } from "./middleware/token-middleware.js";
import { authRouter, cartRouter, orderRouter, productRouter, userRouter } from "./route/index.js";
import uploadRouter from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import logger from "./utils/logger.js";

const app = express();
const port = process.env.PORT || 5001;
const nodeEnv = process.env.NODE_ENV || 'development';

// Ensure uploads folder exists
createUploadsFolder();

// Security and logging middleware
app.use(securityHeaders);
app.use(requestLogger);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(requestSizeLimit);

// Rate limiting (development-friendly)
if (nodeEnv === 'production') {
  app.use(createRateLimit()); // General rate limit in production
} else {
  // Higher limit for development
  app.use(createRateLimit(1 * 60 * 1000, 10000));
}
app.use('/api/v1/auth', authRateLimit);
app.use('/api/v1/file', uploadRateLimit);
app.use('/api/v1/auth/forgot-password', forgotPasswordRouter);

// Body parsing
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: nodeEnv,
    uptime: process.uptime()
  });
});

// API versioning
app.use('/api/v1', (req, res, next) => {
  req.apiVersion = 'v1';
  next();
});

// Public routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

// Protected routes
app.use("/api/v1/users", authenticateToken, userRouter);
app.use("/api/v1/cart", authenticateToken, cartRouter);
app.use("/api/v1/orders", authenticateToken, orderRouter);
app.use("/api/v1/file", authenticateToken, uploadRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    await db();
    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port} in ${nodeEnv} mode`);
      logger.info(`🏥 Health Check: http://localhost:${port}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
