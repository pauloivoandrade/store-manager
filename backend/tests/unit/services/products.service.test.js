const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productsByIdMock } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testa a camada Products Service', function () {
  afterEach(function () { sinon.restore(); });

  describe('Teste - camada Products Service pelo Id', function () {
    it('Busca produto por um Id inexistente', async function () {
      const expected = { status: 404, data: { message: 'Product not found' } };
      
      sinon.stub(productModel, 'productsById').resolves(undefined);
      
      const response = await productsService.isProductId(9999);
      
      expect(response).to.be.deep.equal(expected);
    });
    it('Busca por um Id existente', async function () {
      const expected = productsByIdMock[0];
      
      sinon.stub(productModel, 'productsById').resolves(productsByIdMock[0]);
      
      const response = await productsService.isProductId(2);
      
      expect(response.data).to.be.deep.equal(expected);
    });
  }); 
});
