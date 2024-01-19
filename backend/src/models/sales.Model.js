const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute(`
  Select b.sale_id, a.date, b.product_id, b.quantity
  FROM StoreManager.sales AS a
  INNER JOIN StoreManager.sales_products AS b on a.id = b.sale_id;`);
  return sales;
};

const salesById = async (id) => {
  const [sales] = await connection.execute(`SELECT
  date, product_id AS productId, quantity
  FROM StoreManager.sales AS a
  INNER JOIN StoreManager.sales_products AS b on a.id = sale_id WHERE id = ?`, [id]);
  return sales;
};

module.exports = {
  allSales,
  salesById,
};
