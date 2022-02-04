const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("productModel", productModel);
