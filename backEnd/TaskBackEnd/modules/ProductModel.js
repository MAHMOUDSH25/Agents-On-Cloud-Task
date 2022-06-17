const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
  },
  
)

// Create the model
const ProductModel = mongoose.model('product', ProductSchema);

// Export the model
module.exports = ProductModel;