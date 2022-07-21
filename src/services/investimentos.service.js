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

const serviceBuyAssets = async ({ contaId, acaoId, qtdeAcao }) => {
  const { qtdeAvailableBroker, valorAtivo } = await checkBrokerHasAsset(acaoId);
  checkQuantityAssetsAvailable(qtdeAcao, qtdeAvailableBroker);
  const { amountRequired, bankBalance } = await checkBankBalanceUserAvailable(qtdeAcao, valorAtivo, contaId);
  
  const transaction = await sequelize.transaction();
  try {
    await updateBuyAssetsAccount(contaId, acaoId, qtdeAcao, transaction);
    await upadteBuyAssetsBroker(acaoId, qtdeAcao, qtdeAvailableBroker, transaction);
    await updateBankBalanceBuy(amountRequired, bankBalance, contaId, transaction);
    await upadateHistoryOrders('compra', contaId, acaoId, qtdeAcao, transaction);

    await transaction.commit();
    return { contaId, acaoId, qtdeAcao, status: 'executada' }
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }
}

const serviceSaleAssets = async ({ contaId, acaoId, qtdeAcao }) => {
  const qtdeAvailableUser = await checkUserHasAsset(contaId, acaoId);
  checkQuantityAssetsAvailable(qtdeAcao, qtdeAvailableUser);

  const transaction = await sequelize.transaction();
  try {
    await upadteSaleAssetsBroker(acaoId, qtdeAcao, transaction);
    await updateSaleAssetsAccount(acaoId, qtdeAcao, qtdeAvailableUser, contaId, transaction);
    await upadateHistoryOrders('venda', contaId, acaoId, qtdeAcao, transaction);
    
    await transaction.commit();
    return { contaId, acaoId, qtdeAcao, status: 'executada' };
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }

}

module.exports = {
  serviceBuyAssets,
  serviceSaleAssets,
}