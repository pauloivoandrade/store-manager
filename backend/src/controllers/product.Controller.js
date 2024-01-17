// controllers/productController.js
const productService = require('../services/product.Services');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
