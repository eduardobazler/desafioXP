const { Corretora, Acao, Conta, ContaAcoes } = require('../../models')
const throwErrorWithStatus = require('../../utils/throwErrorWithStatus');
const { StatusCodes } = require('http-status-codes');


const checkBrokerHasAsset = async (acaoId) => {
  const asset = await Corretora.findOne({ where: { acaoId },
    include: { model: Acao, as: 'acao' }});

    if (!asset) {
      return throwErrorWithStatus({ 
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Informações incorretas.'
       });
    }

    const { quantity, acao: { value } } = asset;
    return {
      qtdeAvailableBroker: quantity, 
      valorAtivo: value
    }
}

const checkQuantityAssetsAvailable = (qtdeAcao, qtdeAvailable) => {
  if (qtdeAcao > qtdeAvailable) {
    return throwErrorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Quantidade da ação indisponível'
     });
  }
};

const checkBankBalanceUserAvailable = async (qtdeAcao, valorAtivo, contaId) => {
  const amountRequired = (qtdeAcao * valorAtivo);
  const { bankBalance } = await Conta.findOne({ where: { id: contaId } });
  if (amountRequired > bankBalance) {
    return throwErrorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Saldo bancário não disponível para essa transação.'
    });
  }
  return { amountRequired, bankBalance };
};

const checkUserHasAsset = async (contaId, acaoId) => {
  const asset = await ContaAcoes.findOne({ where: { acaoId, contaId } });
  if (!asset) {
    return throwErrorWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Informações incorretas.'
    });
  }
  return asset.quantity;
};

module.exports = {
  checkBrokerHasAsset,
  checkQuantityAssetsAvailable,
  checkBankBalanceUserAvailable,
  checkUserHasAsset
}