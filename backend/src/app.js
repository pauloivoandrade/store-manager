const express = require('express');
const { productsRoutes, salesRoutes } = require('./routes');
// const connection = require('./models/connection');

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
app.use('/sales', salesRoutes);
// app.get('/sales', async (_req, res) => {
//   const [sales] = await connection.execute(
//     `SELECT sale_id AS saleId, a.date, product_id AS productId, quantity
//     FROM StoreManager.sales AS a
//     INNER JOIN StoreManager.sales_products AS b on a.id = sale_id;`,
//   );
//   res.status(200).json(sales);
// });

// app.get('/sales/:id', async (_req, res) => {
//   const { id } = _req.params;
//   const [sales] = await connection.execute(`SELECT
//   date, product_id AS productId, quantity
//   FROM StoreManager.sales AS a
//   INNER JOIN StoreManager.sales_products AS b on a.id = sale_id WHERE id = ?`, [id]);
//   if (sales.length === 0) {
//     return res.status(404).json({ message: 'Sale not found' });
//   }

//   res.status(200).json(sales);
// });

// app.post('/products', async (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: '"name" is required' });
//   }
//   if (name.length < 5) {
//     return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
//   }

//   const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

//   const newProductId = result.insertId;
//   const newProduct = { id: newProductId, name };

//   res.status(201).json(newProduct);
// });
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
