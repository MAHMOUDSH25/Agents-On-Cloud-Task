const mongoose = require("mongoose");

const bookingModel = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "productModel" },
  userId: { type: mongoose.Schema.ObjectId, ref: "userModel" },
  date: { type: Date },
  status: { type: String },
});

module.exports = mongoose.model("bookingModel", bookingModel);
