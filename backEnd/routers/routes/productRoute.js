const express = require("express");
const productRoute = express.Router();

const {
  addProduct,
  getUserProduct,
  getAllProduct,
} = require("../controllers/product");

const { authentication } = require("../middleware/authentication");



productRoute.get("/product", authentication, getUserProduct);
productRoute.get("/products", getAllProduct);
productRoute.post("/product", authentication, addProduct);

module.exports = productRoute;
