const { productModel } = require('../models');

const isProduct = async () => {
  const products = await productModel.allProducts();
  return { status: 200, data: products };
};

const isProductId = async (id) => {
  const product = await productModel.productsById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

module.exports = {
  isProduct,
  isProductId,
};