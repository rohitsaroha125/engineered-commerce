import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.ts";

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
