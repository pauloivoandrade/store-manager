const allProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const updateResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0,
};
const productsByIdMock = [
  {
    name: 'Traje de encolhimento',
    id: 2,
  },
];
const newProductWithId = {
  name: 'playstation 2',
  id: 4,
};
const newProduct = {
  name: 'playstation 2',
};
const newProductMock = {
  name: 'ProdutoX',
  id: 1,
};
const emptyProduct = {};

module.exports = {
  allProductsMock,
  productsByIdMock,
  newProductMock,
  emptyProduct,
  updateResult,
  newProductWithId,
  newProduct,
};