const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { allProductsMock, productsByIdMock } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {
  it('Buscando produto por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productsByIdMock]]);
      
    const inputData = 2;
    const product = await productModel.productsById(inputData);
  
    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(productsByIdMock);
  });

  it('Buscando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const product = await productModel.allProducts();

    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(allProductsMock);
  });
  describe('Testando a camada Products Model para na função "insert"', function () {
    it('Insere um novo produto', async function () {
      const product = 'Abóbora';
      sinon.stub(connection, 'execute').resolves([{ insertId: 100 }]);
  
      const response = await productModel.addNewProduct(product);
  
      expect(response).to.be.deep.equal({
        id: 100,
        name: 'Abóbora',
      });
    });
  });
  describe('Testando a camada Products Model para na função "DELETE"', function () {
    it('Testando o produto e excluido com sucesso', async function () {
      const productId = 1;
      const deletedProduct = {
        affectedRows: 1,
      };
  
      sinon.stub(connection, 'execute').resolves([deletedProduct]);
      const response = await productModel.remove(productId);
  
      expect(response).to.be.deep.equal(deletedProduct);
    });
  
    it('Testando se o retorno é 0 quando não se encontra um produto para excluir', async function () {
      const productId = 1;
      const deletedProduct = {
        affectedRows: 0,
      };
  
      sinon.stub(connection, 'execute').resolves([deletedProduct]);
      const response = await productModel.remove(productId);
  
      expect(response).to.be.deep.equal(deletedProduct);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});