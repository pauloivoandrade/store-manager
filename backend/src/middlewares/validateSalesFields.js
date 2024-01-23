const validateId = (id) => {
  if (id.length === 0) {
    const error = {
      code: 'requiredField',
      message: '"product_id" is required',
    };
    throw error;
  }
};

const validateQuantity = (quantity) => {
  if (quantity === undefined) {
    const error = {
      code: 'requiredField',
      message: '"quantity" is required',
    };
    throw error;
  }

  if (typeof (quantity) === 'string' || quantity < 1) {
    const error = {
      code: 'unprocessableQuantity',
      message: '"quantity" must be a number larger than or equal to 1',
    };
    throw error;
  }
  return true;
};

const validateSales = (sales) => {
  try {
    console.log(sales);
    sales.forEach((sale) => {
      validateId(sale.product_id);
      validateQuantity(sale.quantity);
    });
  } catch (error) {
    return { type: error.type, message: error.message };
  }
};

module.exports = {
  validateSales,
};