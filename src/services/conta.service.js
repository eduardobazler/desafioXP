const { StatusCodes } = require('http-status-codes');
const { Conta, Acao } = require('../models');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const checkAcount = async (contaId) => {
  const account = await Conta.findOne({ where: { id: contaId } });
  if (!account) {
    throwErroWithStatus({
      status: StatusCodes.BAD_REQUEST,
      message: 'Dados inválidos.'
    });
  }
  return account;
}

const updateAmountMoneyAccount = async (contaId, currentValue) => {
  await Conta.update({ bankBalance: currentValue }, 
    { where: { id: contaId } });
}

const accountDeposit = async ({ contaId, valor }) => {
  const {bankBalance: previusBankBalance} = await checkAcount(contaId);
  const currentBankBalance = previusBankBalance + valor;
  await updateAmountMoneyAccount(contaId ,currentBankBalance);
  return { contaId, valor, status: 'deposioto executado' }
}


const accountWithdrawal = async ({contaId, valor}) => {
  const { bankBalance: previusBankBalance } = await checkAcount(contaId);
  if(valor > previusBankBalance) {
    return throwErroWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Valor indisponível.',
    });
  }
  const currentBankBalance = previusBankBalance - valor;
  await updateAmountMoneyAccount(contaId, currentBankBalance);
  return { contaId, valor, status: 'saque executado' }
}


const getBankBalance = async (contaId) => {
  const { bankBalance } = await checkAcount(contaId);
  return { contaId, saldo: bankBalance };
}

const getAssets = async (contaId) => {
  const { acoes } = await Conta.findOne({ 
  where: { id: contaId}, 
  attributes: ['id'],
  include: { model: Acao, as: 'acoes',  
    through: { attributes: ['quantity'] } 
    } 
  });
  
  return { contaId, acoes };
}

module.exports = {
  checkAcount,
  updateAmountMoneyAccount,
  accountDeposit,
  accountWithdrawal,
  getBankBalance,
  getAssets,
}