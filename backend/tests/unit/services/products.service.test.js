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
  describe('Testa camada Products Service para inserir um novo produtos', function () {
    it('Adiciona um produto', async function () {
      const body = 'Abóbora';
      const expected = { id: 10, name: 'Abóbora' };
      sinon.stub(productModel, 'addNewProduct').resolves(expected);
  
      const response = await productsService.isNewProduct(body);
  
      expect(response).to.be.deep.equal({ status: 201, data: expected });
    });
  });
  describe('Testa camada Products Service para deletar um produtos', function () {
    it('Excluir um produto com sucesso', async function () {
      const productId = 1;
      const deleteResult = { affectedRows: 1 };
    
      sinon.stub(productModel, 'remove').resolves(deleteResult);
    
      const response = await productsService.removeProductService(productId);
    
      expect(response.status).to.be.equal(204);
      expect(response.data.message).to.be.equal('Produto excluído com sucesso');
    });
    
    it('Retorna erro ao tentar excluir um produto que não existe', async function () {
      const productId = 1;
      const deleteResult = { affectedRows: 0 };
    
      sinon.stub(productModel, 'remove').resolves(deleteResult);
    
      const response = await productsService.removeProductService(productId);
    
      expect(response.status).to.be.equal(404);
      expect(response.data.message).to.be.equal('Product not found');
    });
  });
});
