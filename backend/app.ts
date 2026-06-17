import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.ts";
import productRoutes from "./routes/productRoutes.ts"
import categoryRoutes from "./routes/categoryRoutes.ts"
import orderRoutes from "./routes/orderRoutes.ts"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 8010;

console.log("everything working fine");

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use("/user", userRoutes);
app.use("/products", productRoutes)
app.use("/category", categoryRoutes)
app.use("/orders", orderRoutes)

app.use((req, res, next) => {
  const err: any = new Error("Route not found")
  err.statusCode = 404
  next(err)
})

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  res.status(err.statusCode).json({
    ok: false,
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

process.on("unhandledRejection", (err: {name: string, message: string}) => {
  console.log("Err is ", err.name, " ", err.message)
})

process.on("uncaughtException", (err:{name: string, message: string}) => {
  console.log("Err is ", err.name, " ", err.message)
})