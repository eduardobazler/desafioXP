const { Corretora, Acao, Conta, ContaAcoes } = require('../../models')
const throwErrorWithStatus = require('../../utils/throwErrorWithStatus');
const { StatusCodes } = require('http-status-codes');


const checkBrokerHasAsset = async (codAtivo) => {
  const asset = await Corretora.findOne({ where: { acaoId: codAtivo },
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

const checkQuantityAssetsAvailable = (qtdeAtivo ,qtdeAvailable) => {
  if (qtdeAtivo > qtdeAvailable) {
    return throwErrorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Quantidade da ação indisponível'
     });
  }
};

const checkBankBalanceUserAvailable = async (qtdeAtivo, valorAtivo, contaId) => {
  const amountRequired = (qtdeAtivo * valorAtivo);
  const { bankBalance } = await Conta.findOne({ where: { id: contaId } });
  if (amountRequired > bankBalance) {
    return throwErrorWithStatus({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Saldo bancário não disponível para essa transação.'
    });
  }
  return { amountRequired, bankBalance };
};

const checkUserHasAsset = async (codCliente, codAtivo) => {
  const asset = await ContaAcoes.findOne({ where: { acaoId: codAtivo, contaId: codCliente } });
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