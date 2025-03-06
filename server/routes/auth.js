import express from "express";
const router = express.Router();
import {login, verify} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

router.post("/login", login);
router.get("/verify", authMiddleware, verify)

export default router 