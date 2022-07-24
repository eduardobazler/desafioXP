const { expect } = require('chai');
const sinon = require('sinon');
const { sequelize } = require('../../../services/investimentos.service')
const ativosService = require('../../../services/investimentos.service');
const updaters = require('../../../services/helpers.service/quantityUpdaters');
const validators = require('../../../services/helpers.service/quantityValidators');

describe('Ativos Serive', () => {
  describe('serviceBuyAssets', () => {

    describe('A função chama as outras funções que fazem as checagens e os updates e fica responsável pelo commit no banco de dados', () => {

      const mockTransaction = {
        commit: async () => ({ commit: true }),
        rollback: async () => ({ rollback: true }),
      };

      before(() => {
        sinon.stub(validators, 'checkBrokerHasAsset').resolves({ qtdeAvailableBroker: 10, valorAtivo: 10 });
        sinon.stub(validators, 'checkQuantityAssetsAvailable').returns('');
        sinon.stub(validators, 'checkBankBalanceUserAvailable').resolves({ amountRequired: 10, bankBalance: 10 });
        sinon.stub(sequelize, 'transaction').resolves(mockTransaction);
        sinon.stub(updaters, 'updateBuyAssetsAccount').resolves();
        sinon.stub(updaters, 'upadteBuyAssetsBroker').resolves();
        sinon.stub(updaters, 'updateBankBalanceBuy').resolves();
        sinon.stub(updaters, 'upadateHistoryOrders').resolves();
      });
  
      after(() => {
        validators.checkBrokerHasAsset.restore();
        validators.checkQuantityAssetsAvailable.restore();
        validators.checkBankBalanceUserAvailable.restore();
        sequelize.transaction.restore();
        updaters.updateBuyAssetsAccount.restore();
        updaters.upadteBuyAssetsBroker.restore();
        updaters.updateBankBalanceBuy.restore();
        updaters.upadateHistoryOrders.restore();
      })

      it('Faz o commit dos dados no banco e retorna um objeto com as informações recebidas', async () => {
        sinon.stub(mockTransaction, 'commit').resolves('comitado')
        const responseService = await ativosService.serviceBuyAssets({ contaId: 1, acaoId: 2, qtdeAcao: 15 });
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('contaId', 'acaoId', 'qtdeAcao', 'status');
        expect(mockTransaction.commit.calledWith()).to.be.true;       
        expect(mockTransaction.commit.calledWith()).to.be.not.false;
        mockTransaction.commit.restore();
      });
    });

    describe('A função chama as outras funções que fazem as checagens e os updates e fica responsável pelo commit no banco de dados', () => {

      const mockTransaction = {
        commit: async () => ({ commit: true }),
        rollback: async () => ({ rollback: true }),
      };

      before(() => {
        sinon.stub(validators, 'checkBrokerHasAsset').resolves({ qtdeAvailableBroker: 10, valorAtivo: 10 });
        sinon.stub(validators, 'checkQuantityAssetsAvailable').returns('');
        sinon.stub(validators, 'checkBankBalanceUserAvailable').resolves({ amountRequired: 10, bankBalance: 10 });
        sinon.stub(sequelize, 'transaction').resolves(mockTransaction);
        sinon.stub(updaters, 'updateBuyAssetsAccount').resolves();
        sinon.stub(updaters, 'upadteBuyAssetsBroker').resolves();
        sinon.stub(updaters, 'updateBankBalanceBuy').resolves();

        sinon.stub(updaters, 'upadateHistoryOrders').rejects();
      });
  
      after(() => {
        validators.checkBrokerHasAsset.restore();
        validators.checkQuantityAssetsAvailable.restore();
        validators.checkBankBalanceUserAvailable.restore();
        sequelize.transaction.restore();
        updaters.updateBuyAssetsAccount.restore();
        updaters.upadteBuyAssetsBroker.restore();
        updaters.updateBankBalanceBuy.restore();
        updaters.upadateHistoryOrders.restore();
      })

      it('Faz o rollback e explode um erro', async () => {
        sinon.stub(mockTransaction, 'rollback').resolves('comitado')
        sinon.stub(mockTransaction, 'commit').resolves('comitado')

        try {
          const responseService = await ativosService.serviceBuyAssets({ contaId: 1, acaoId: 2, qtdeAcao: 15 });
        } catch (error) {
          expect(mockTransaction.rollback.calledWith()).to.be.true;
          expect(mockTransaction.commit.calledWith()).to.be.false;
        }

        mockTransaction.rollback.restore();
        mockTransaction.commit.restore();

      });
    });
  });

  describe('serviceSaleAssets', () => {

    describe('A função chama as outras funções que fazem as checagens e os updates e fica responsável pelo commit no banco de dados', () => {

      const mockTransaction = {
        commit: async () => ({ commit: true }),
        rollback: async () => ({ rollback: true }),
      };

      before(() => {
        sinon.stub(validators, 'checkUserHasAsset').resolves(100);
        sinon.stub(validators, 'checkQuantityAssetsAvailable').returns('');
        sinon.stub(sequelize, 'transaction').resolves(mockTransaction);
        sinon.stub(updaters, 'upadteSaleAssetsBroker').resolves();
        sinon.stub(updaters, 'updateSaleAssetsAccount').resolves();
        sinon.stub(updaters, 'upadateHistoryOrders').resolves();
      });
  
      after(() => {
        validators.checkUserHasAsset.restore();
        validators.checkQuantityAssetsAvailable.restore();
        sequelize.transaction.restore();
        updaters.upadteSaleAssetsBroker.restore();
        updaters.updateSaleAssetsAccount.restore();
        updaters.upadateHistoryOrders.restore();
      })

      it('Faz o commit dos dados no banco e retorna um objeto com as informações recebidas', async () => {
        sinon.stub(mockTransaction, 'commit').resolves('comitado')
        const responseService = await ativosService.serviceSaleAssets({ contaId: 1, acaoId: 2, qtdeAcao: 15 });
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('contaId', 'acaoId', 'qtdeAcao', 'status');
        expect(mockTransaction.commit.calledWith()).to.be.true;       
        expect(mockTransaction.commit.calledWith()).to.be.not.false;
        mockTransaction.commit.restore();
      });
    });

    describe('A função chama as outras funções que fazem as checagens e os updates e fica responsável pelo commit no banco de dados', () => {

      const mockTransaction = {
        commit: async () => ({ commit: true }),
        rollback: async () => ({ rollback: true }),
      };

      before(() => {
        sinon.stub(validators, 'checkUserHasAsset').resolves(100);
        sinon.stub(validators, 'checkQuantityAssetsAvailable').returns('');
        sinon.stub(sequelize, 'transaction').resolves(mockTransaction);
        sinon.stub(updaters, 'upadteSaleAssetsBroker').resolves();
        sinon.stub(updaters, 'updateSaleAssetsAccount').resolves();

        sinon.stub(updaters, 'upadateHistoryOrders').rejects();
      });
  
      after(() => {
        validators.checkUserHasAsset.restore();
        validators.checkQuantityAssetsAvailable.restore();
        sequelize.transaction.restore();
        updaters.upadteSaleAssetsBroker.restore();
        updaters.updateSaleAssetsAccount.restore();
        updaters.upadateHistoryOrders.restore();
      })

      it('Faz o rollback e explode um erro', async () => {
        sinon.stub(mockTransaction, 'rollback').resolves('comitado')
        sinon.stub(mockTransaction, 'commit').resolves('comitado')

        try {
          const responseService = await ativosService.serviceSaleAssets({ contaId: 1, acaoId: 2, qtdeAcao: 15 });
        } catch (error) {
          expect(mockTransaction.rollback.calledWith()).to.be.true;
          expect(mockTransaction.commit.calledWith()).to.be.false;
        }

        mockTransaction.rollback.restore();
        mockTransaction.commit.restore();

      });
    });
  });
  
  
})