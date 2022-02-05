const express = require("express");
// defined productRoute from express
const productRoute = express.Router();

// require all action functions from controller
const {
  addProduct,
  getUserProduct,
  getAllProduct,
} = require("../controllers/product");

const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

// this endpoint to get product data for one seller
productRoute.get(
  "/product",
  authentication,
  authorization("seller"),
  getUserProduct
);
// this endpoint to get all products data
productRoute.get("/products", getAllProduct);
// this endpoint to create a new product for a seller
productRoute.post(
  "/product",
  authentication,
  authorization("seller"),
  addProduct
);

module.exports = productRoute;
