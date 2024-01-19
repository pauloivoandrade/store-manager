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

const isNewProduct = async (name) => {
  const newProduct = await productModel.addNewProduct(name);
  if (Object.keys(name).length === 0) {
    return { status: 400, data: { message: '"name" is required' } };
  }
  if (name.length < 5) {
    return { status: 422, data: { message: '"name" length must be at least 5 characters long' } };
  }
  return { status: 201, data: newProduct };
};

module.exports = {
  isProduct,
  isProductId,
  isNewProduct,
};