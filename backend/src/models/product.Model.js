const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const productsById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};
module.exports = {
  allProducts,
  productsById,
};