const Sequelize = require('sequelize');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const { 
  updateBuyAssetsAccount,
  upadteBuyAssetsBroker,
  updateBankBalanceBuy,
  upadateHistoryOrders,
  upadteSaleAssetsBroker,
  updateSaleAssetsAccount,
} = require('./helpers.service/quantityUpdaters');

const {
  checkBrokerHasAsset,
  checkQuantityAssetsAvailable,
  checkBankBalanceUserAvailable,
  checkUserHasAsset,
} = require('./helpers.service/quantityValidators');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const serviceBuyAssets = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const { qtdeAvailableBroker, valorAtivo } = await checkBrokerHasAsset(codAtivo);
  checkQuantityAssetsAvailable(qtdeAtivo, qtdeAvailableBroker);
  const { amountRequired, bankBalance } = await checkBankBalanceUserAvailable(qtdeAtivo, valorAtivo, codCliente);
  
  const transaction = await sequelize.transaction();
  try {
    await updateBuyAssetsAccount(codCliente, codAtivo, qtdeAtivo, transaction);
    await upadteBuyAssetsBroker(codAtivo, qtdeAtivo, qtdeAvailableBroker, transaction);
    await updateBankBalanceBuy(amountRequired, bankBalance, codCliente, transaction);
    await upadateHistoryOrders('compra', codCliente, codAtivo, qtdeAtivo, transaction);

    await transaction.commit();
    return { codCliente, codAtivo, qtdeAtivo, status: 'executada' }
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }
}

const serviceSaleAssets = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const qtdeAvailableUser = await checkUserHasAsset(codCliente, codAtivo);
  checkQuantityAssetsAvailable(qtdeAtivo, qtdeAvailableUser);

  const transaction = await sequelize.transaction();
  try {
    await upadteSaleAssetsBroker(codAtivo, qtdeAtivo, transaction);
    await updateSaleAssetsAccount(codAtivo, qtdeAtivo, qtdeAvailableUser, codCliente, transaction);
    await upadateHistoryOrders('venda', codCliente, codAtivo, qtdeAtivo, transaction);
    
    await transaction.commit();
    return { codCliente, codAtivo, qtdeAtivo, status: 'executada' };
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }

}

module.exports = {
  serviceBuyAssets,
  serviceSaleAssets,
}