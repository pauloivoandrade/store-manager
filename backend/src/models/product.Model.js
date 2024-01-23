const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const productsById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};

const addNewProduct = async (name) => {
  const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

  const newProductId = result.insertId;
  const newProduct = { id: newProductId, name };
  return newProduct;
};

const insertDate = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (CURDATE())');

  return insertId;
};

const remove = async (id) => {
  const [deleted] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return deleted;
};

module.exports = {
  allProducts,
  productsById,
  addNewProduct,
  insertDate,
  remove,
};