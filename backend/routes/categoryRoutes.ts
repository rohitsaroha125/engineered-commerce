import express from "express"
import { getAllCategories, getProductsByCategory } from "../controllers/categoryController.js"

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:categoryId", getProductsByCategory)

export default router