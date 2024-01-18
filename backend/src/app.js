const express = require('express');
const connection = require('./models/connection');
// const { productsRoutes } = require('./routes/products.routes');

const app = express();

app.use(express.json());

app.get('/products', async (_req, res) => {
  const [products] = await connection.execute('SELECT * FROM products');
  res.status(200).json(products);
});

app.get('/products/:id', async (_req, res) => {
  const { id } = _req.params;
  const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (!products) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(products);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
