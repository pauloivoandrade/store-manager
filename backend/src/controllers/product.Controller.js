const { productsService } = require('../services');

const allProducts = async (_req, res) => {
  const response = await productsService.isProduct();

  return res.status(response.status).json(response.data);
};

const productsById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.isProductId(Number(id));

  return res.status(response.status).json(response.data);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.isNewProduct(Object(name));

  return res.status(response.status).json(response.data);
};

const removeProductController = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await productsService.removeProductService(id);
  return res.status(status).json(data);
};

module.exports = {
  allProducts,
  productsById,
  addProduct,
  removeProductController,
};