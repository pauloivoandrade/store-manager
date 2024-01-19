const route = require('express').Router();

const { productController } = require('../controllers');

route.get('/', productController.allProducts);
route.get('/:id', productController.productsById);
route.post('/', productController.addProduct);

module.exports = route;