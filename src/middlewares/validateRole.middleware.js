const { StatusCodes } = require("http-status-codes");
const throwErroWithStatus = require("../utils/throwErrorWithStatus");

const validateRole = (_req, res, next) => {
  const { role } = res.locals.payload;
  if (role !== 'admin') {
    return throwErroWithStatus({
      status: StatusCodes.NOT_FOUND,
      message: 'page not found'
    });
  };

  next();
}

module.exports = validateRole;