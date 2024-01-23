const salesAndProductService = require('../services/salesAndProducts.Services');
const errorMap = require('../middlewares/errorMap');

const listAllSales = async (_req, res) => {
  const { message } = await salesAndProductService.findAll();
  res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesAndProductService.findById(id);
  if (type) return res.status(errorMap.setError(type)).json({ message });
  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const sale = req.body;
  // console.log(sale);
  const { type, message } = await salesAndProductService.createSale(sale);
  if (type) return res.status(errorMap.setError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  createSale,
  listAllSales,
  listSalesById,
};