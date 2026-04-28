import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { seedProductsIfEmpty } from "./seed.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in environment.");
  }

  await mongoose.connect(mongoUri);
  await seedProductsIfEmpty();

  app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Cannot start server:", error.message);
  process.exit(1);
});
