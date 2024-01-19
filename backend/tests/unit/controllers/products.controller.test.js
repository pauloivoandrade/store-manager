const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/product.Services');
const productsController = require('../../../src/controllers/product.Controller');
const { allProductsMock } = require('../mocks/products.mock');

describe('Testa a camada Products Controller', function () {
  afterEach(function () { sinon.restore(); });
  
  describe('Testa a camada Products Controller para a função "allProducts"', function () {
    it('Busca por todos os produtos', async function () {
      const req = {};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'isProduct').resolves([allProductsMock]);
  
      await productsController.allProducts(req, res);
  
      expect(res.status.calledWith(200)).to.equal(false);
      expect(res.json.calledWith(!allProductsMock)).to.equal(true);
    });
  }); 
});