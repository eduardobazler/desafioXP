const bcrypt = require('bcrypt');

const generateHash = (dado) => {
  const salt = bcrypt.genSaltSync(5);
  const dadoCrypt = bcrypt.hashSync(dado, salt);
  return dadoCrypt;
};

module.exports = {
  generateHash
};
