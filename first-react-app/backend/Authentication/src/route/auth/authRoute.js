import express from "express";
import { authController } from "../../controller/index.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateToken, authController.getCurrentUser);
router.put("/profile", authenticateToken, authController.updateProfile);

export { router as authRouter };

