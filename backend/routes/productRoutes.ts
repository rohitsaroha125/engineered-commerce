import express from "express"
import { getProducts, singleProduct } from "../controllers/productController.ts"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", singleProduct)

export default router