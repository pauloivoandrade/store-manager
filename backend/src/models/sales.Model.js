const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

const salesById = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM sales WHERE ID = ?', [id]);
  return sales;
};

module.exports = {
  allSales,
  salesById,
};