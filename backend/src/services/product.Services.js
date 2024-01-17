// services/productService.js
const productModel = require('../models/product.Model');

const getAllProducts = async () => {
  return productModel.getAllProducts();
};

const getProductById = async (productId) => {
  return await productModel.getProductById(productId);
};

module.exports = {
  getAllProducts,
  getProductById,
};
