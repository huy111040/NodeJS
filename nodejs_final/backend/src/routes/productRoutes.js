import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { q } = req.query;
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
          ]
        }
      : {};

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
