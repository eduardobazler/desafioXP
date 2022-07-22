const { StatusCodes } = require('http-status-codes');
const authService = require('../services/auth.service');

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.authUser({ email, password });
  res.status(StatusCodes.OK).json({ token });
}

module.exports = {
  authUser,
}