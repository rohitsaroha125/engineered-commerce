import express from "express"
import { getProducts, singleProduct, uploadProductImage } from "../controllers/productController.js"
import { upload } from "../lib/upload.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", singleProduct)
router.post("/upload-image/:id",  upload.single('image'), uploadProductImage)

export default router