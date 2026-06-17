import express from "express"
import { getAllCategories, getProductsByCategory } from "../controllers/categoryController.ts"

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:categoryId", getProductsByCategory)

export default router