const { StatusCodes } = require('http-status-codes');

const handleError = (error, _req, res, _next) => {
  const message = error.message || 'Internal Error';
  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ message });
};

module.exports = handleError;