const connection = require('./connection');

const selectSales = async (sales) => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

module.exports = {
    selectSales,
};