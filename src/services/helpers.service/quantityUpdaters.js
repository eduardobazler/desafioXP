const { ContaAcoes, Corretora, Historico, Conta } = require('../../models')

const updateBuyAssetsAccount = async (contaId, acaoId, qtdeAcao, transaction) => {
  const dataValues = await ContaAcoes.findOne({
    where: { contaId, acaoId }
  });
  // caso não exista a relação, cria a relação
  if(!dataValues) {
    const createdRelationAsset = ContaAcoes.create({
      contaId, acaoId, quantity: qtdeAcao
    }, { transaction });
    return createdRelationAsset;
  }

  // caso exista a relação, atualiza a quantidade
  const newQuantity = qtdeAcao + dataValues.quantity;
  const updatedRalationAsset = await ContaAcoes.update({ quantity: newQuantity }, {
    where: { contaId, acaoId },
    transaction
  });
  return updatedRalationAsset;
}

const upadteBuyAssetsBroker = async (acaoId, qtdeAcao, qtdeAvailable, transaction) => {
  const newQtdeAvailable = qtdeAvailable - qtdeAcao;
  await Corretora.update({ quantity: newQtdeAvailable }, {
    where: { acaoId },
    transaction
  });
}

const updateBankBalanceBuy = async (amountRequired, bankBalance, contaId, transaction) => {
  const newBankBalance = bankBalance - amountRequired;
  await Conta.update({ bankBalance: newBankBalance }, {
    where: { id: contaId },
    transaction
  })
}

const upadateHistoryOrders = async (type, contaId, acaoId, qtdeAcao, transaction) => {
  await Historico.create({ 
    contaId,
    acaoId,
    quantity: qtdeAcao,
    typeOrder: type,
   }, { transaction });
};

const upadteSaleAssetsBroker = async (acaoId, qtdeAcao, transaction) => {
  const { quantity } = await Corretora.findOne({ where: { acaoId: acaoId } });
  const newQtdeAvailable = quantity + qtdeAcao
  await Corretora.update({ quantity: newQtdeAvailable }, {
    where: { acaoId },
    transaction
  });
}

const updateSaleAssetsAccount = async (acaoId, qtdeAcao, qtdeAvailable, contaId, transaction) => {
  const newQtdeAvailable = qtdeAvailable - qtdeAcao;
  await ContaAcoes.update({ quantity: newQtdeAvailable }, {
    where: { acaoId, contaId },
    transaction
  });
}

module.exports = {
  updateBuyAssetsAccount,
  upadteBuyAssetsBroker,
  updateBankBalanceBuy,
  upadateHistoryOrders,
  upadteSaleAssetsBroker,
  updateSaleAssetsAccount,
}