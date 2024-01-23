const validateProductNameField = (name) => {
  const MIN_LENGTH = 5;
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }
  if (name.length < MIN_LENGTH) {
    return { status: 422, message: '"name" length must be at least 5 characters long' };
  }
  return { status: 201 };
};
  
module.exports = {
  validateProductNameField,
};