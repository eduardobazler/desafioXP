const { StatusCodes } = require('http-status-codes');
const { Conta } = require('../models');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const checkAcount = async (codCliente) => {
  const account = await Conta.findOne({ where: { id: codCliente } });
  if (!account) {
    throwErroWithStatus({
      status: StatusCodes.BAD_REQUEST,
      message: 'Dados inválidos.'
    });
  }
  return account.bankBalance;
}

const accountDeposit = async ({ codCliente, valor }) => {
  const previusBankBalance = await checkAcount(codCliente);
  const currentBankBalance = previusBankBalance + valor;
  const deposit = await Conta.update({
    bankBalance: currentBankBalance,
  }, { where: { id: codCliente } });
  console.log(deposit);
  return { codCliente, valor, status: 'executado' }
}

module.exports = {
  accountDeposit,
}