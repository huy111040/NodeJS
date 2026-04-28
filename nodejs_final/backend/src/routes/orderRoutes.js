import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { customerName, phone, address, items } = req.body;

    if (!customerName || !phone || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Vui long nhap day du thong tin don hang." });
    }

    const normalizedItems = items
      .map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 0
      }))
      .filter((item) => mongoose.Types.ObjectId.isValid(item.productId) && item.quantity > 0);

    if (normalizedItems.length === 0) {
      return res.status(400).json({ message: "Danh sach san pham khong hop le." });
    }

    const productIds = normalizedItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((p) => [String(p._id), p]));

    const orderItems = [];
    let total = 0;

    for (const item of normalizedItems) {
      const product = productMap.get(String(item.productId));
      if (!product) continue;

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `San pham "${product.name}" khong du ton kho.` });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
      total += product.price * item.quantity;
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "Khong tim thay san pham hop le trong don hang." });
    }

    await Promise.all(
      orderItems.map((item) =>
        Product.updateOne({ _id: item.productId }, { $inc: { stock: -item.quantity } })
      )
    );

    const newOrder = await Order.create({
      customerName,
      phone,
      address,
      items: orderItems,
      total
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

export default router;
