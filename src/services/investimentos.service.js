const Sequelize = require('sequelize');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const { 
  updateBuyAssetsAccount,
  upadteBuyAssetsBroker,
  updateBankBalanceBuy,
  upadateHistoryOrders,
} = require('./helpres.service/quantityUpdaters');

const {
  checkQuantityAssetsAvailable,
  checkBankBalanceUserAvailable
} = require('./helpres.service/quantityValidators');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const serviceBuyAssets = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const transaction = await sequelize.transaction();
  const { qtdeAvailable, valorAtivo } = await checkQuantityAssetsAvailable(codAtivo, qtdeAtivo);
  const { amountRequired, bankBalance } = await checkBankBalanceUserAvailable(qtdeAtivo, valorAtivo, codCliente);
  
  try {
    await updateBuyAssetsAccount(codCliente, codAtivo, qtdeAtivo, transaction);
    await upadteBuyAssetsBroker(codAtivo, qtdeAtivo, qtdeAvailable, transaction);
    await updateBankBalanceBuy({ amountRequired, bankBalance }, codCliente, transaction);
    await upadateHistoryOrders('venda', codCliente, codAtivo, qtdeAtivo, transaction);

    await transaction.commit();
    return { codCliente, codAtivo, qtdeAtivo, status: 'executada' }
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }
}

module.exports = {
  serviceBuyAssets,
}