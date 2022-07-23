const { StatusCodes } = require('http-status-codes');
const { authenticateToken } = require('../utils/JWTtoken');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const messageToken = 'Expired or invalid token';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return throwErroWithStatus({ message: messageToken, status: StatusCodes.UNAUTHORIZED });
  }

  const payload = authenticateToken(token);

  if (payload.error) {
    return throwErroWithStatus({ message: messageToken, status: StatusCodes.UNAUTHORIZED });
  }

  res.locals.payload = payload;
  next();
}

module.exports = authMiddleware;