const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesProductsService = require('../../../src/services/salesAndProducts.Services');
const salesProductsController = require('../../../src/controllers/salesAndProducts.Controller');
const {
  createSale,
  listAllSales,
  listSalesById,
} = require('../../../src/controllers/salesAndProducts.Controller');
const { saleProducts, allSalesMock, salesByIdMock } = require('../mocks/sales.mock');
const { productsService } = require('../../../src/services');
const productsController = require('../../../src/controllers/product.Controller');

describe('Teste de unidade de sales_products.models', function () {
  afterEach(sinon.restore);

  describe('Testes relacionados a função GET', function () {
    it('Recuperando lista de todos as vendas', async function () {
      const res = {};
      const req = {};
      const salesList = [allSalesMock];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, 'findAll')
        .resolves({ type: null, message: salesList });

      await listAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });

    it('Recuperando vendas pelo id', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, 'findById')
        .resolves({ type: null, message: salesByIdMock });

      await listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesByIdMock);
    });

    it('Retorno quando o id não existe', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, 'findById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Testes relacionados a função POST', function () {
    it('Cadastrando um novo produto', async function () {
      const res = {};
      const req = {
        body: saleProducts,
      };
      const currentSale = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, 'createSale')
        .resolves({ type: null, message: currentSale });

      await createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(currentSale);
    });

    it('Retorno caso a quantidade for zero', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, 'createSale').resolves({
        type: 'INVALID_VALUE',
        message: '"quantity" must be greater than or equal to 1',
      });

      await createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
    it('Testando se a aplicação retorna um erro quando busca um produto que não existe', async function () {
      const req = { params: { id: 6 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      const errorResult = { status: 404, data: { message: 'Product not found' } };
      sinon.stub(productsService, 'isProductId').resolves(errorResult);
  
      await productsController.productsById(req, res);
  
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledOnce(productsService.isProductId);
    });

    it('Retorno caso a productId for inexistente', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 999,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, 'createSale').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
  describe('Testa a camada Sales Products Controller para a função "updateSale"', function () {
    it('Faz a atualização de um produto', async function () {
      const req = {
        params: {
          id: 100,
        },
        body: { name: 'batman' },
      };
      const res = {};
      const dataService = { name: 'batman', id: 100 };
      const responseService = { status: 200, data: dataService };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesProductsService, 'updateSale').resolves(responseService);

      await salesProductsController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(dataService);
    });
  });
  describe('Testa a camada Products Controller para a função "DELETE"', function () {
    it('Testando se a aplicação retorna todos os produtos', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      const findAllProducts = { status: 200, data: [{ id: 1, name: 'teste' }] };
      sinon.stub(productsService, 'isProduct').resolves(findAllProducts);
      await productsController.allProducts(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledOnce(productsService.isProduct);
    });
    it('Exclui um produto com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const deleteResult = { status: 204, data: { message: 'Produto excluído com sucesso' } };
      sinon.stub(productsService, 'removeProductService').resolves(deleteResult);
      await productsController.removeProductController(req, res);
      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledOnce(productsService.removeProductService);
    });
    it('Retorna um erro ao tentar excluir um produto inexistente', async function () {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const errorResult = { status: 404, data: { message: 'Product not found' } };
      sinon.stub(productsService, 'removeProductService').resolves(errorResult);
      await productsController.removeProductController(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledOnce(productsService.removeProductService);
    });
  });
});