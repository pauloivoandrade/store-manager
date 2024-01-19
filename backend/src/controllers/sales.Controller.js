const { salesService } = require('../services');

const allSales = async (_req, res) => {
  const sales = await salesService.isSales();
    
  return res.status(sales.status).json(sales.data);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.isSalesId(Number(id));

  return res.status(sales.status).json(sales.data);
};

module.exports = {
  allSales,
  salesById,
};