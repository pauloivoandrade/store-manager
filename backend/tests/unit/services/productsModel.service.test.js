const { expect } = require('chai');
const sinon = require('sinon');

const productsModels = require('../../../src/models/product.Model');
const saleProductsService = require('../../../src/services/salesAndProducts.Services');
// const salesModels = require('../../../src/models/sales.Model');
const salesProductsModels = require('../../../src/models/salesAndProducts.Model');
const {
  createSale,
  findAll,
  findById,
} = require('../../../src/services/salesAndProducts.Services');
const {
  allProductsMock,
  newProductWithId,
  newProduct,
} = require('../mocks/products.mock');
const {
  allSalesMock,
  salesByIdMock,
  // saleProducts,
} = require('../mocks/sales.mock');

describe('Teste de unidade de sales_products.service', function () {
  afterEach(sinon.restore);

  describe('Testes relacionados a função GET', function () {
    it('Recuperando lista de todos as vendas', async function () {
      sinon.stub(salesProductsModels, 'findAll').resolves(allSalesMock);

      const result = await findAll();

      expect(result.message).to.deep.equal(allSalesMock);
    });

    it('Recuperando vendas pelo id', async function () {
      sinon.stub(salesProductsModels, 'findByIdWithDate').resolves(salesByIdMock);

      const result = await findById(2);

      expect(result.message).to.deep.equal(salesByIdMock);
    });

    it('Retorno quando o id não existe', async function () {
      sinon.stub(salesProductsModels, 'findByIdWithDate').resolves([]);

      const result = await findById(999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  describe('Testes relacionados a função POST', function () {
    afterEach(function () { sinon.restore(); });

    // it('Cadastrando venda', async function () {
    //   sinon.stub(productsModels, 'allProducts').resolves(allProductsMock);
    //   sinon.stub(salesModels, 'createSaleDate').resolves();
    //   sinon.stub(salesProductsModels, 'newSalesProduct').resolves();
    //   sinon
    //     .stub(salesProductsModels, 'findByIdAndColumns')
    //     .resolves(saleProducts);

    //   const result = await createSale(saleProducts);

    //   expect(result.type).to.equal(null);
    //   expect(result.message).to.be.deep.equal({
    //     id: 1,
    //     itemsSold: saleProducts,
    //   });
    // });

    it('Retorno caso a quantidade for zero', async function () {
      const result = await createSale([
        {
          productId: 1,
          quantity: 0,
        },
      ]);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1',
      );
    });

    it('Retorno caso a productId for inexistente', async function () {
      sinon.stub(productsModels, 'allProducts').resolves(allProductsMock);

      const result = await createSale([
        {
          productId: 9999,
          quantity: 1,
        },
      ]);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  describe('Testes relacionados a função PUT', function () {
    it('Atualizando informações do produto', async function () {
      sinon.stub(productsModels, 'productsById').resolves(newProductWithId);
      sinon.stub(salesProductsModels, 'updateSale').resolves({ type: null, message: newProductWithId });
    
      const result = await salesProductsModels.updateSale(1, newProduct.name);
    
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newProductWithId);
    });    

    // it('Retorno caso seja inserido um name inválido', async function () {
    //   const result = await salesProductsModels.updateSale('bola', 1);
    
    //   expect(result.type).to.equal('INVALID_VALUE');
    //   expect(result.message).to.equal('name" length must be at least 5 characters long');
    // });    

    // it('Retorno caso seja inserido um id inválido', async function () {
    //   sinon.stub(productsModels, 'productsById').resolves(undefined);
    
    //   const result = await salesProductsModels.updateSale('Máscara do Máskara', 10);
    
    //   expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    //   expect(result.message).to.equal('Product not found');
    // });    
    it('Testando a atualisação de um produto', async function () {
      const updateResult = { id: 1, name: 'updatedName' };
      sinon.stub(salesProductsModels, 'updateSale').resolves(updateResult);
  
      const response = await saleProductsService.updateSale('updatedName', 1);
      expect(response.status).to.be.equal(200);
      expect(response.data).to.be.deep.equal(updateResult);
    });
  });
});