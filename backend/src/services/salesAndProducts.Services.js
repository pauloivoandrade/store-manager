const salesAndProducts = require('../models/salesAndProducts.Model');
const productsModels = require('../models/product.Model');
const productModels = require('../models/product.Model');
const validations = require('../middlewares/validationsValues');
const { validateProductNameField } = require('../middlewares/validateNameUpdate');

const findAll = async () => {
  const sales = await salesAndProducts.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sales = await salesAndProducts.findByIdWithDate(saleId);

  if (sales.length > 0) return { type: null, message: sales };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const createSale = async (sale) => {
  const error = validations.validateNewSale(sale);
  if (error.type) return error;
  const allProducts = await productsModels.allProducts();
  const productsSales = sale.every(({ productId }) => (
    allProducts.some(({ id }) => id === productId)
  ));
  if (!productsSales) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  const currentDateId = await productModels.insertDate();
  await Promise.all(sale.map(({ productId, quantity }) => (
    salesAndProducts.newSalesProduct(productId, quantity, currentDateId)
  )));
  const newSale = await salesAndProducts.findByIdAndColumns(currentDateId, [
    'product_id',
    'quantity',
  ]);
  return {
    type: null,
    message: { id: currentDateId, itemsSold: newSale } };
};

const updateSale = async (name, id) => {
  const { status, message } = validateProductNameField(name);

  if (!id) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  if (status !== 201) {
    return { status, data: { message } };
  }

  const product = await salesAndProducts.updateSale(name, id);

  if (product) {
    return { status: 200, data: product };
  } 
  return { status: 404, data: { message: 'Product not found' } };
};

module.exports = {
  createSale,
  findAll,
  findById,
  updateSale,
};