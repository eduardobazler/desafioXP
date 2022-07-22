const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = await userService.createUser({ userName, email, password });
  res.status(StatusCodes.OK).json(newUser);
}

module.exports = {
  createUser,
}