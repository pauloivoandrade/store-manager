const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesMock, salesByIdMock } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Teste se a requisição de todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);
    const response = await salesModel.allSales();
    expect(response).to.be.deep.equal(allSalesMock);
  });
  // it('Teste se a criação de uma venda é feita com sucesso', async function () {
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 1 }], []);
  //   const saleData = [
  //     { productId: 1, quantity: 2 },
  //     { productId: 2, quantity: 3 },
  //   ];
  //   const response = await salesModel.createSaleDate(saleData);

  //   expect(response).to.be.deep.equal({ id: 1, itemsSold: saleData });
  // });
  it('Buscando sale por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[salesByIdMock]]);
      
    const inputData = 2;
    const sale = await salesModel.salesById(inputData);
  
    expect(sale).to.be.an('array');
    expect(sale[0]).to.be.an('array');
    expect(sale[0][0]).to.deep.equal(salesByIdMock[0]);
  });

  it('Buscando todos os sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);

    const sale = await salesModel.allSales();

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(allSalesMock);
  });

  it('Testa criacao de uma nova sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.createSaleDate();
    expect(result).to.equal(3);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});