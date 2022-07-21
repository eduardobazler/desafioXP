const { StatusCodes } = require('http-status-codes');
const { Conta, ContaAcoes, Acao } = require('../models');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const checkAcount = async (codCliente) => {
  const account = await Conta.findOne({ where: { id: codCliente } });
  if (!account) {
    throwErroWithStatus({
      status: StatusCodes.BAD_REQUEST,
      message: 'Dados inválidos.'
    });
  }
  return account;
}

const updateAmountMoneyAccount = async (codCliente, currentValue) => {
  await Conta.update({ bankBalance: currentValue }, 
    { where: { id: codCliente } });
}

const accountDeposit = async ({ codCliente, valor }) => {
  const {bankBalance: previusBankBalance} = await checkAcount(codCliente);
  const currentBankBalance = previusBankBalance + valor;
  await updateAmountMoneyAccount(codCliente ,currentBankBalance);
  return { codCliente, valor, status: 'deposioto executado' }
}


const accountWithdrawal = async ({codCliente, valor}) => {
  const { bankBalance: previusBankBalance } = await checkAcount(codCliente);
  if(valor > previusBankBalance) {
    return throwErroWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Valor indisponível.',
    });
  }
  const currentBankBalance = previusBankBalance - valor;
  await updateAmountMoneyAccount(codCliente, currentBankBalance);
  return { codCliente, valor, status: 'saque executado' }
}


const getBankBalance = async (codCliente) => {
  const { bankBalance } = await checkAcount(codCliente);
  return { codCliente, saldo: bankBalance };
}

const getAssets = async (codCliente) => {
  const { acoes } = await Conta.findOne({ 
  where: { id: codCliente}, 
  attributes: ['id'],
  include: { model: Acao, as: 'acoes',  
    through: { attributes: ['quantity'] } 
    } 
  });
  
  return { codCliente: codCliente, acoes };
}

module.exports = {
  accountDeposit,
  accountWithdrawal,
  getBankBalance,
  getAssets,
}