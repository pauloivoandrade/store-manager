const { salesAndProducts } = require('../models/salesAndProducts.Model');
const { validations } = require('../middlewares/validateSalesFields');

const createSale = async (sale) => {
  const error = validations.validateNewSale(sale);
  if (error.type) return error;
  const allProducts = await productsModels.findAll();
  const productsSales = sale.every(({ productId }) => (
    allProducts.some(({ id }) => id === productId)
  ));
  if (!productsSales) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  const currentDateId = await salesModels.insert();
  await Promise.all(sale.map(({ productId, quantity }) => (
    salesProductsModels.insert(productId, quantity, currentDateId)
  )));
  const newSale = await salesProductsModels.findByIdAndColumns(currentDateId, [
    'product_id',
    'quantity',
  ]);
  return {
    type: null,
    message: { id: currentDateId, itemsSold: newSale } };
};

module.exports = {
  createSale,
};