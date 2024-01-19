const express = require('express');
const { productsRoutes } = require('./routes');
const connection = require('./models/connection');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

// app.get('/products', async (_req, res) => {
//   const [products] = await connection.execute('SELECT * FROM products');
//   res.status(200).json(products);
// });

// app.get('/products/:id', async (_req, res) => {
//   const { id } = _req.params;
//   const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
//   if (!products) return res.status(404).json({ message: 'Product not found' });
//   res.status(200).json(products);
// });

app.get('/sales', async (_req, res) => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, a.date, product_id AS productId, quantity
    FROM StoreManager.sales AS a
    INNER JOIN StoreManager.sales_products AS b on a.id = sale_id;`,
  );
  res.status(200).json(sales);
});

app.get('/sales/:id', async (_req, res) => {
  const { id } = _req.params;
  const [sales] = await connection.execute(`SELECT
  date, product_id AS productId, quantity
  FROM StoreManager.sales AS a
  INNER JOIN StoreManager.sales_products AS b on a.id = sale_id WHERE id = ?`, [id]);
  if (sales.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sales);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
