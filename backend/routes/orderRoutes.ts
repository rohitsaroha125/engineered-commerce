import express from "express"
import authMiddleware from "../lib/authMiddleware.js"
import { addOrder } from "../controllers/orderItemController.js"

const router = express.Router()

router.post("/add-order", authMiddleware, addOrder)

export default router