import express from "express";
import authMiddleware from "../lib/authMiddleware.js";
import { paymentSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", authMiddleware, paymentSession);

export default router;