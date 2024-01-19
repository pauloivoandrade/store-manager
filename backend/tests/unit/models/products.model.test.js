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
  afterEach(function () {
    sinon.restore();
  });
});