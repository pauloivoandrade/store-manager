const { salesModel } = require('../models');

const isSales = async () => {
  const sales = await salesModel.allSales();
  return { status: 200, data: sales };
};

const isSalesId = async (id) => {
  const sales = await salesModel.salesById(id);
  if (!sales) return { status: 404, data: { message: 'Sale not found' } };
  return { status: 200, data: sales };
};
module.exports = {
  isSales,
  isSalesId,
};