const route = require('express').Router();

const { salesController } = require('../controllers');
const { salesAndProductsController } = require('../controllers');

route.get('/', salesController.allSales);
route.get('/:id', salesController.salesById);
route.post('/', salesAndProductsController.createSale);

module.exports = route;