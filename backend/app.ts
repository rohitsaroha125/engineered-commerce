import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import redisRoutes from "./routes/redisRoutes.js"
import { Request, Response, NextFunction } from "express";
import { rateLimit } from 'express-rate-limit'
import { createClient } from 'redis';
import './jobs/updatePrices.js'

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 8010;

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const limiter = rateLimit({
  limit: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests"
})

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use("/user", userRoutes);
app.use("/products", limiter, productRoutes)
app.use("/category", categoryRoutes)
app.use("/orders", orderRoutes)
app.use("/redis", redisRoutes)

app.use((req, res, next) => {
  const err: any = new Error("Route not found")
  err.statusCode = 404
  next(err)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  res.status(err.statusCode).json({
    ok: false,
    message: err.message
  })
})

export {client}
export default app;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

process.on("unhandledRejection", (err: {name: string, message: string}) => {
  console.log("Err is ", err.name, " ", err.message)
})

process.on("uncaughtException", (err:{name: string, message: string}) => {
  console.log("Err is ", err.name, " ", err.message)
})