const connection = require('./connection');

const newSalesProduct = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
  await connection.execute(query, [saleId, productId, quantity]);
  const result = {
    id: saleId,
    itemSold: [{
      productId,
      quantity,
    }],
  };
  return result;
};

module.exports = {
  newSalesProduct,
};