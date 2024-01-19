const route = require('express').Router();

const { salesController } = require('../controllers');

route.get('/', salesController.allSales);
route.get('/:id', salesController.salesById);

module.exports = route;