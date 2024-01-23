const route = require('express').Router();

const { validateProduct } = require('../middlewares/validateProductFields');
const { validateQuantity } = require('../middlewares/validateQuantityFields');

const { salesController } = require('../controllers');
const { salesAndProductsController } = require('../controllers');

route.get('/', salesController.allSales);
route.get('/:id', salesController.salesById);
route.post('/', validateProduct, validateQuantity, salesAndProductsController.createSale);

module.exports = route;