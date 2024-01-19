const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesMock, salesByIdMock } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
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
  afterEach(function () {
    sinon.restore();
  });
});