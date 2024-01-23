const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesProductModel } = require('../../../src/models');
const { allSalesMock, salesByIdMock, saleProductsDb, saleProducts } = require('../mocks/sales.mock');

describe('Teste de unidade de sales_products.models', function () {
  afterEach(sinon.restore);
  
  describe('Testes relacionados a função GET', function () {
    it('Recuperando lista de todos as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesMock]);
      const result = await salesProductModel.findAll();
      expect(result).to.be.deep.equal(allSalesMock);
    });
  
    it('Recuperando vendas pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([salesByIdMock]);
      const result = await salesProductModel.findByIdWithDate(2);
      expect(result).to.be.deep.equal(salesByIdMock);
    });
  });
  
  describe('Testes relacionados a função POST', function () {
    it('Cadastrando venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
      const result = await salesProductModel.newSalesProduct(1, 5, 3);
      expect(result).to.equal(0);
    });
  
    it('Requisitando venda por id', async function () {
      sinon.stub(connection, 'execute').resolves([saleProductsDb]);
      const result = await salesProductModel.findByIdAndColumns(1, [
        'product_id',
        'quantity',
      ]);
      expect(result).to.be.deep.equal(saleProducts);
    });
  });
});