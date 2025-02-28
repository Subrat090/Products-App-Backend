const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// 1️⃣ Add Product (Protected)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2️⃣ Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3️⃣ Update Product (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4️⃣ Delete Product (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5️⃣ Fetch Featured Products
router.get("/featured", async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true });
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6️⃣ Fetch Products with Price Less Than a Certain Value
router.get("/price/:maxPrice", async (req, res) => {
    try {
        const maxPrice = parseFloat(req.params.maxPrice);
        const products = await Product.find({ price: { $lt: maxPrice } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7️⃣ Fetch Products with Rating Higher Than a Certain Value
router.get("/rating/:minRating", async (req, res) => {
    try {
        const minRating = parseFloat(req.params.minRating);
        const products = await Product.find({ rating: { $gt: minRating } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: "Invalid product ID format" });
    }
});

module.exports = router;
