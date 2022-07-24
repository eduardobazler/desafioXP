const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const JWT = require('../utils/JWTtoken');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const comparePassword = (reqPass, dbPass) => {
  const isMath = bcrypt.compareSync(reqPass, dbPass);
  if (!isMath) {
    return throwErroWithStatus({
      status: StatusCodes.BAD_REQUEST, message: 'Invalid fields'
    });
  }
  return isMath;
}

const authUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    attributes: [ 'id', 'email', 'role', 'userName', 'password' ],
  });

  if (!user) {
    return throwErroWithStatus({ status: StatusCodes.BAD_REQUEST, message: 'Invalid fields' });
  }

  const { dataValues } = user;

  comparePassword(password, dataValues.password);
  
  token = JWT.generateToken({
    id: dataValues.id,
    role: dataValues.role,
    email: dataValues.email,
    userName: dataValues.userName
  });

  return token;
};


module.exports = {
  authUser,
  comparePassword
}