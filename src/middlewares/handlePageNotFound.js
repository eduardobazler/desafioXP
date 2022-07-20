const { StatusCodes } = require('http-status-codes');

const handPageNotFound = (_req, res) => {
  const status = StatusCodes.NOT_FOUND;
  res.status(status).json( {message: 'page not found'} );
};

module.exports = handPageNotFound;