const productModel = require("../../db/models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const userId = req.token.userId;
    const newProduct = new productModel({
      name,
      description,
      image,
      price,
      ownerId: userId,
    });
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserProduct = async (req, res) => {
  try {
    const userId = req.token.userId;
    const product = await productModel.findOne({ ownerId: userId });
            res.status(200).json(product);

  } catch (error) {
    res.status(400).json(error);
  }
};
const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json(products);
    } catch (error) {
         res.status(400).json(error);
    }
};
module.exports = {
  addProduct,
  getUserProduct,
  getAllProduct,
};
