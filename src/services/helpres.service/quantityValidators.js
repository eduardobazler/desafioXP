const { Corretora, Acao, Conta } = require('../../models')
const errorWithStatus = require('../../utils/throwErrorWithStatus');
const { StatusCodes } = require('http-status-codes');

const checkQuantityAssetsAvailable = async (codAtivo, qtdeAtivo) => {
  const { quantity, acao: { value } } = await Corretora.findOne({ where: { acaoId: codAtivo },
  include: { model: Acao, as: 'acao' }});
  if (qtdeAtivo > quantity) {
    return errorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Quantidade da ação indisponível'
     });
  }
  return { 
    qtdeAvailable: quantity, 
    valorAtivo: value 
  };
};

const checkBankBalanceUserAvailable = async (qtdeAtivo, valorAtivo, contaId) => {
  const amountRequired = (qtdeAtivo * valorAtivo);
  const { bankBalance } = await Conta.findOne({ where: { id: contaId } });
  if (amountRequired > bankBalance) {
    return errorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Saldo bancário não disponível para essa transação.'
    });
  }
  return { amountRequired, bankBalance };
};

module.exports = {
  checkQuantityAssetsAvailable,
  checkBankBalanceUserAvailable,
}