import express from "express";
import { authController } from "../../controller/index.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/init", authController.init);

export { router as authRouter };
