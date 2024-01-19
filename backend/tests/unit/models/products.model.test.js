const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { allProductsMock, productsByIdMock, newProductMock, emptyProduct } = require('../mocks/products.mock');

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
  describe('Testa a camada Products Model para a função "insert"', function () {
    it('Faz a inserção de um novo produto', async function () {
      const expected = { insertId: 100 };
      const product = 'Abóbora';
      sinon.stub(connection, 'execute').resolves([{ insertId: 100 }]);
  
      const response = await productModel.addNewProduct(product);
  
      // Ajuste o objeto de resposta esperado para refletir o formato real do retorno
      expect(response).to.be.deep.equal({
        id: 100,
        name: 'Abóbora',
      });
    });
  });
  
  // it('Adicionando produto vazio sem sucesso', async function () {
  //   sinon.stub(connection, 'execute').resolves([]);
  
  //   try {
  //     await productModel.addNewProduct(emptyProduct);
  //     // Se a execução atingir este ponto, não ocorreu um erro, então falhe o teste
  //     expect.fail('A exceção esperada não foi lançada.');
  //   } catch (error) {
  //     // Verifique se o erro possui a estrutura esperada
  //     expect(error.status).to.equal(400);
  //     expect(error.data).to.deep.equal({ message: '"name" is required' });
  //   }
  // });  
  
  afterEach(function () {
    sinon.restore();
  });
});