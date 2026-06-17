import express from "express"
import authMiddleware from "../lib/authMiddleware.ts"
import { addOrder } from "../controllers/orderItemController.ts"

const router = express.Router()

router.post("/add-order", authMiddleware, addOrder)

export default router