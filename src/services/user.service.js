const { User, Conta } = require('../models');
const { StatusCodes } = require('http-status-codes');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');
const hash = require('../utils/generateHash');

const checkUsers = async (email) => {
  const users = await User.findAll({
    where: { email },
  });
  if (users.length !== 0) {
    return throwErroWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'email já existente'
    });
  }
  return true;
}


const createUser = async ({ userName, email, password }) => {
  await checkUsers(email);
  const cryptPassword = hash.generateHash(password);
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