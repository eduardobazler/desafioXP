const { User, Conta } = require('../models');
const { StatusCodes } = require('http-status-codes');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');
const generateHash = require('../utils/generateHash');

const checkUsers = async (email) => {
  console.log(email);
  const users = await User.findAll({
    where: { email },
  });
  if (users.length !== 0) {
    throwErroWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'email já existente'
    });
  }
}


const createUser = async ({ userName, email, password }) => {
  await checkUsers(email);
  const cryptPassword = generateHash(password);
  const newUser = await User.create({
    email,
    userName,
    password: cryptPassword,
  });

  const newConta = await Conta.create({
    userId: newUser.id
  });

  return { contaId: newConta.id, email, userName};
}

module.exports = {
  checkUsers,
  createUser
}