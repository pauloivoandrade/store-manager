const route = require('express').Router();

const { productController } = require('../controllers');
const { salesAndProductsController } = require('../controllers');

route.get('/', productController.allProducts);
route.get('/:id', productController.productsById);
route.post('/', productController.addProduct);
route.put(
  '/:id', 
  salesAndProductsController.updateSale,
);

// route.delete('/:id', salesAndProductsController.removeSale);

module.exports = route;