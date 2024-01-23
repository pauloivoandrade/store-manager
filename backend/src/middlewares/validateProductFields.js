const validateProduct = (req, res, next) => {
  const sales = req.body;
  const validator = sales.every((sale) => Object.keys(sale).includes('productId'));
  console.log(validator);
  if (validator) {
    return next();
  }
  
  return res.status(400).json({ message: '"productId" is required' });
};

module.exports = {
  validateProduct,
};