import express from "express";

import { clearCache } from "../controllers/redisController.js";

const router = express.Router();

router.get("/clear-cache", clearCache);

export default router;
