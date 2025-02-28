const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number },
    createdAt: { type: Date, required: true, default: Date.now },
    company: { type: String, required: true }
});

// Ensure the collection name is "products"
module.exports = mongoose.model("Product", ProductSchema, "products");
