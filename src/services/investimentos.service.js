const Sequelize = require('sequelize');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const updaters = require('./helpers.service/quantityUpdaters');
const validators = require('./helpers.service/quantityValidators');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const serviceBuyAssets = async ({ contaId, acaoId, qtdeAcao }) => {
  const { qtdeAvailableBroker, valorAtivo } = await validators.checkBrokerHasAsset(acaoId);
  validators.checkQuantityAssetsAvailable(qtdeAcao, qtdeAvailableBroker);
  const { amountRequired, bankBalance } = await validators.checkBankBalanceUserAvailable(qtdeAcao, valorAtivo, contaId);
  
  const transaction = await sequelize.transaction();
  try {
    await updaters.updateBuyAssetsAccount(contaId, acaoId, qtdeAcao, transaction);
    await updaters.upadteBuyAssetsBroker(acaoId, qtdeAcao, qtdeAvailableBroker, transaction);
    await updaters.updateBankBalanceBuy(amountRequired, bankBalance, contaId, transaction);
    await updaters.upadateHistoryOrders('compra', contaId, acaoId, qtdeAcao, transaction);

    await transaction.commit();
    return { contaId, acaoId, qtdeAcao, status: 'executada' }
  } catch (error) {
    await transaction.rollback();
    throwErroWithStatus(error);
  }
}

const serviceSaleAssets = async ({ contaId, acaoId, qtdeAcao }) => {
  const qtdeAvailableUser = await validators.checkUserHasAsset(contaId, acaoId);
  validators.checkQuantityAssetsAvailable(qtdeAcao, qtdeAvailableUser);

  const transaction = await sequelize.transaction();
  try {
    await updaters.upadteSaleAssetsBroker(acaoId, qtdeAcao, transaction);
    await updaters.updateSaleAssetsAccount(acaoId, qtdeAcao, qtdeAvailableUser, contaId, transaction);
    await updaters.upadateHistoryOrders('venda', contaId, acaoId, qtdeAcao, transaction);
    
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
  sequelize
}