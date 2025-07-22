import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { db } from "./database/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { authenticateToken } from "./middleware/token-middleware.js";
import { authRouter, cartRouter, orderRouter, productRouter, userRouter } from "./route/index.js";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import path from 'path';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes and static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploads with CORS
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(process.cwd(), 'uploads')));

// Public routes (no authentication required)
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// Protected routes (authentication required)
app.use("/api/users", authenticateToken, userRouter);
app.use("/api/cart", authenticateToken, cartRouter);
app.use("/api/orders", authenticateToken, orderRouter);
app.use("/api/file", authenticateToken, router);

// Create uploads folder
createUploadsFolder();

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
  db();
});
