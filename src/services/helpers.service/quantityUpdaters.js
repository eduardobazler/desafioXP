const { ContaAcoes, Corretora, Historico, Conta } = require('../../models')

const updateBuyAssetsAccount = async (codCliente, codAtivo, qtdeAtivo, transaction) => {
  const dataValues = await ContaAcoes.findOne({
    where: { contaId: codCliente, acaoId: codAtivo }
  });
  // caso não exista a relação, cria a relação
  if(!dataValues) {
    const createdRelationAsset = ContaAcoes.create({
      contaId: codCliente, acaoId: codAtivo, quantity: qtdeAtivo
    }, { transaction });
    return createdRelationAsset;
  }

  // caso exista a relação, atualiza a quantidade
  const newQuantity = qtdeAtivo + dataValues.quantity;
  const updatedRalationAsset = await ContaAcoes.update({ quantity: newQuantity }, {
    where: { contaId: codCliente, acaoId: codAtivo },
    transaction
  });
  return updatedRalationAsset;
}

const upadteBuyAssetsBroker = async (codAtivo, qtdeAtivo, qtdeAvailable, transaction) => {
  const newQtdeAvailable = qtdeAvailable - qtdeAtivo;
  await Corretora.update({ quantity: newQtdeAvailable }, {
    where: { acaoId: codAtivo },
    transaction
  });
}

const updateBankBalanceBuy = async (amountRequired, bankBalance, codCliente, transaction) => {
  const newBankBalance = bankBalance - amountRequired;
  await Conta.update({ bankBalance: newBankBalance }, {
    where: { id: codCliente },
    transaction
  })
}

const upadateHistoryOrders = async (type, codCliente, codAtivo, qtdeAtivo, transaction) => {
  await Historico.create({ 
    contaId: codCliente,
    acaoId: codAtivo,
    quantity: qtdeAtivo,
    typeOrder: type,
   }, { transaction });
};

const upadteSaleAssetsBroker = async (codAtivo, qtdeAtivo, transaction) => {
  const { quantity } = await Corretora.findOne({ where: { acaoId: codAtivo } });
  const newQtdeAvailable = quantity + qtdeAtivo
  await Corretora.update({ quantity: newQtdeAvailable }, {
    where: { acaoId: codAtivo },
    transaction
  });
}

const updateSaleAssetsAccount = async (codAtivo, qtdeAtivo, qtdeAvailable, codCliente, transaction) => {
  const newQtdeAvailable = qtdeAvailable - qtdeAtivo;
  await ContaAcoes.update({ quantity: newQtdeAvailable }, {
    where: { acaoId: codAtivo, contaId: codCliente },
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