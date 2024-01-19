const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute(`
    SELECT 
      sales.saleId,
      sales.date,
      sales_products.productId,
      sales_products.quantity
    FROM sales
    INNER JOIN sales_products ON sales.saleId = sales_products.saleId
    ORDER BY sales.saleId ASC, sales_products.productId ASC
  `);
  return sales;
};

const salesById = async (id) => {
  const [sales] = await connection.execute(`
    SELECT 
      sales.saleId,
      sales.date,
      sales_products.productId,
      sales_products.quantity
    FROM sales
    INNER JOIN sales_products ON sales.saleId = sales_products.saleId
    WHERE sales.saleId = ?
    ORDER BY sales.saleId ASC, sales_products.productId ASC
  `, [id]);
  return sales;
};

module.exports = {
  allSales,
  salesById,
};
