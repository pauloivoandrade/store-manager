const express = require('express');
const connection = require('./models/connection');
const { productsRoutes } = require('./routes/products.routes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.get('/sales', async (_req, res) => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  res.status(200).json(sales);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
