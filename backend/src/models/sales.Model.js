const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute(`
  SELECT sale_id AS saleId, a.date, product_id AS productId, quantity
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

const createSaleDate = async () => {
  const querySale = 'INSERT INTO sales (date) VALUES (current_timestamp());';
  const [result] = await connection.execute(querySale);

  const { insertId } = result;
  return insertId;
};
const remove = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  allSales,
  salesById,
  createSaleDate,
  remove,
};