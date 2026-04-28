import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";

import productSeedData from "./data/products.js";
import Product from "./models/Product.js";

dotenv.config();

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(productSeedData);
    return { inserted: productSeedData.length, skipped: false };
  }
  return { inserted: 0, skipped: true };
}

async function runSeed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in environment.");
  }

  await mongoose.connect(mongoUri);
  const result = await seedProductsIfEmpty();
  await mongoose.disconnect();

  if (result.skipped) {
    console.log("Seed skipped: products already exist.");
  } else {
    console.log(`Seed success: inserted ${result.inserted} products.`);
  }
}

const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[1] === currentFilePath) {
  runSeed().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
  });
}
