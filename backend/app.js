import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8010;

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
